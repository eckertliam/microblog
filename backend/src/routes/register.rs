use axum::{
    extract::{Json, State},
    http::StatusCode,
    response::IntoResponse,
};
use serde::{Deserialize, Serialize};
use crate::db::DbPool;

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
    // TODO: Implement register logic
    (StatusCode::OK, Json(RegisterResponse {
        message: "User registered successfully".to_string(),
    }))
}
