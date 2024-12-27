use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};
use chrono::NaiveDateTime;
use crate::schema::users;
use crate::utils;

#[derive(Queryable, Selectable, AsChangeset)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: i32,
    pub email: String,
    pub username: String,
    pub password_hash: String,
    pub salt: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}   

impl User {
    pub async fn find_by_email(conn: &mut AsyncPgConnection, email: &str) -> Option<User> {
        users::table
            .filter(users::email.eq(email))
            .first(conn)
            .await
            .ok()
    }

    pub async fn find_by_username(conn: &mut AsyncPgConnection, username: &str) -> Option<User> {
        users::table
            .filter(users::username.eq(username))
            .first(conn)
            .await
            .ok()
    }
}

#[derive(Insertable)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewUser {
    pub email: String,
    pub username: String,
    pub password_hash: String,
    pub salt: String,
}

impl NewUser {
    pub fn new(email: &str, username: &str, password: &str) -> Self {
        let salt = utils::generate_salt();
        let password_hash = utils::hash_password(password, &salt);
        Self {
            email: email.to_string(),
            username: username.to_string(),
            password_hash,
            salt,
        }
    }
}
