DROP INDEX idx_users_email;
DROP INDEX idx_users_username;
DROP CONSTRAINT email_format_check;
DROP CONSTRAINT username_format_check;

DROP TABLE users;