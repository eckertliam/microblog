use diesel::prelude::*;
use chrono::NaiveDateTime;
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
