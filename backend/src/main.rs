mod db;
mod models;
mod schema;
mod utils;
mod routes;

use std::env;
use routes::register_user;
use tower_http::cors::CorsLayer;
use axum::{
    http::{self, HeaderValue, Method},
    routing::{get, post},
    Router,
};

async fn hello_world() -> &'static str {
    "Hello, world!"
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let address: String;
    let port: String;
    let frontend_url: HeaderValue;

    #[cfg(feature = "prod")]
    {
        address = env::var("PROD_ADDRESS").unwrap();
        port = env::var("PROD_PORT").unwrap();
        frontend_url = env::var("PROD_FRONTEND_URL")
            .unwrap()
            .parse::<HeaderValue>()
            .unwrap();
    }
    #[cfg(not(feature = "prod"))]
    {
        address = env::var("DEV_ADDRESS").unwrap();
        port = env::var("DEV_PORT").unwrap();
        frontend_url = env::var("DEV_FRONTEND_URL")
            .unwrap()
            .parse::<HeaderValue>()
            .unwrap();
    }

    let pool = db::create_pool().await;

    let cors_layer = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(frontend_url)
        .allow_headers([
            http::header::CONTENT_TYPE,
        ]);

    let app = Router::new()
        .route("/", get(hello_world))
        .route("/register", post(register_user))
        .layer(cors_layer)
        .with_state(pool);

    let listener = tokio::net::TcpListener::bind(format!("{}:{}", address, port)).await.unwrap();
    println!("Server is running on {}", format!("{}:{}", address, port));
    axum::serve(listener, app).await.unwrap();
}