-- Run once if your database was created before password reset support:
--   mysql -u root -p TrackTruck < backend/database/migrations/001_add_password_reset_columns.sql

USE TrackTruck;

ALTER TABLE users
  ADD COLUMN password_reset_token_hash VARCHAR(64) DEFAULT NULL AFTER password,
  ADD COLUMN password_reset_expires DATETIME DEFAULT NULL AFTER password_reset_token_hash;
