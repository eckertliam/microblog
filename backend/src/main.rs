mod connect_db;
mod models;
mod schema;
mod utils;
mod routes;

use std::env;
use tower_http::cors::CorsLayer;
use axum::{
    http::{HeaderValue, Method},
    routing::get,
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

    let connection = &mut connect_db::establish_connection();

    let cors_layer = CorsLayer::new()
        .allow_origin(frontend_url)
        .allow_methods([Method::GET, Method::POST]);

    let app = Router::new()
        .route("/", get(hello_world))
        .layer(cors_layer);

    let listener = tokio::net::TcpListener::bind(format!("{}:{}", address, port)).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}