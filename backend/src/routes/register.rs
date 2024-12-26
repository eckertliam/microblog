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
