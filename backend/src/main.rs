mod connect_db;
mod models;
mod schema;
mod utils;

use std::env;

use axum::{
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

    #[cfg(feature = "prod")]
    {
        address = env::var("PROD_ADDRESS").unwrap();
        port = env::var("PROD_PORT").unwrap();
    }
    #[cfg(not(feature = "prod"))]
    {
        address = env::var("DEV_ADDRESS").unwrap();
        port = env::var("DEV_PORT").unwrap();
    }

    let connection = &mut connect_db::establish_connection();

    let app = Router::new()
        .route("/", get(hello_world));

    let listener = tokio::net::TcpListener::bind(format!("{}:{}", address, port)).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}