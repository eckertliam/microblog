use axum::{
    extract::{Json, State},
    http::StatusCode,
};
use diesel_async::RunQueryDsl;
use serde::{Deserialize, Serialize};
use crate::{db::DbPool, models::{NewUser, User}, schema::users};

#[derive(Deserialize)]
pub struct RegisterRequest {
    pub email: String,
    pub username: String,
    pub password: String,
    pub confirm_password: String,
}

#[derive(Serialize)]
pub struct RegisterResponse {
    pub message: String,
}

#[axum::debug_handler]
pub async fn register_user(
    State(pool): State<DbPool>,
    Json(register_request): Json<RegisterRequest>
) -> (StatusCode, Json<RegisterResponse>) {
    // validate the password
    if !validate_password(&register_request.password) {
        return (StatusCode::BAD_REQUEST, Json(RegisterResponse {
            message: "Invalid password".to_string(),
        }));
    }

    // check if the passwords match
    if register_request.password != register_request.confirm_password {
        return (StatusCode::BAD_REQUEST, Json(RegisterResponse {
            message: "Passwords do not match".to_string(),
        }));
    }

    let mut conn = pool.get().await.expect("Failed to get connection from pool");
    // check if user email already exists
    if User::find_by_email(&mut conn, &register_request.email).await.is_some() {
        return (StatusCode::BAD_REQUEST, Json(RegisterResponse {
            message: "Email already exists".to_string(),
        }));
    } else if User::find_by_username(&mut conn, &register_request.username).await.is_some() {
        // check if username already exists
        return (StatusCode::BAD_REQUEST, Json(RegisterResponse {
            message: "Username already exists".to_string(),
        }));
    }

    // create the new user
    let new_user = NewUser::new(&register_request.email, &register_request.username, &register_request.password);

    // insert the new user into the database
    let insert_result = diesel::insert_into(users::table)
        .values(&new_user)
        .execute(&mut conn)
        .await;

    if insert_result.is_err() {
        return (StatusCode::INTERNAL_SERVER_ERROR, Json(RegisterResponse {
            message: "Failed to register user".to_string(),
        }));
    } else {
        return (StatusCode::OK, Json(RegisterResponse {
            message: "User registered successfully".to_string(),
        }));
    }
}

static MIN_PASSWORD_LENGTH: usize = 8;
static MAX_PASSWORD_LENGTH: usize = 32;
static SPECIAL_CHARS: &str = "!@#$%&?<>";
static NUMBERS: &str = "0123456789";
static LOWERCASE_LETTERS: &str = "abcdefghijklmnopqrstuvwxyz";
static UPPERCASE_LETTERS: &str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

fn validate_password(password: &str) -> bool {
    // check if password length is within the allowed range
    if password.len() < MIN_PASSWORD_LENGTH || password.len() > MAX_PASSWORD_LENGTH {
        return false;
    }

    // check if password contains at least one special character and one number
    let mut has_special_char = false;
    let mut has_number = false;

    for ch in password.chars() {
        // check for special characters and numbers to flip flags
        if SPECIAL_CHARS.contains(ch) {
            has_special_char = true;
        } else if NUMBERS.contains(ch) {
            has_number = true;
        } else if LOWERCASE_LETTERS.contains(ch) || UPPERCASE_LETTERS.contains(ch) {
            // skip over letters
            continue;
        } else {
            // if the character is not a special character, number, or letter, return false
            return false;
        }
    }
    // check if the password contains at least one special character and one number
    has_special_char && has_number
}
