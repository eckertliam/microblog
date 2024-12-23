use rand::Rng;
use sha2::{Sha256, Digest};

const SALT_LENGTH: usize = 16;

pub fn generate_salt() -> String {
    let mut rng = rand::thread_rng();
    let salt: String = (0..SALT_LENGTH)
        .map(|_| rng.sample(rand::distributions::Alphanumeric) as char)
        .collect();
    salt
}

pub fn hash_password(password: &str, salt: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(password);
    hasher.update(salt);
    let result = hasher.finalize();
    format!("{:x}", result)
}

pub fn verify_password(password: &str, salt: &str, hashed_password: &str) -> bool {
    hash_password(password, salt) == hashed_password
}
