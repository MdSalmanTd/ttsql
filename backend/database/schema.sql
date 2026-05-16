-- TrackTruck — MySQL schema for the backend (mysql2 pool, DB_NAME default: TrackTruck)
-- Run in MySQL CLI, phpMyAdmin (XAMPP), or:
--   mysql -u root -p < backend/database/schema.sql

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS TrackTruck
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE TrackTruck;

-- Order matters: FK dependencies
DROP TABLE IF EXISTS driver_locations;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  password_reset_token_hash VARCHAR(64) DEFAULT NULL,
  password_reset_expires DATETIME DEFAULT NULL,
  contact VARCHAR(20) NOT NULL,
  role ENUM('driver', 'owner', 'admin') NOT NULL DEFAULT 'driver',
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE trips (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  driver_id INT UNSIGNED NOT NULL,
  vehicle ENUM('Truck1', 'Truck2') NOT NULL,
  `date` DATETIME NOT NULL,
  fromLocation VARCHAR(255) DEFAULT NULL,
  toLocation VARCHAR(255) DEFAULT NULL,
  deposit DECIMAL(12, 2) NOT NULL DEFAULT 0,
  cost DECIMAL(12, 2) NOT NULL DEFAULT 0,
  comments TEXT,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_trips_driver (driver_id),
  CONSTRAINT fk_trips_driver FOREIGN KEY (driver_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE driver_locations (
  user_id INT UNSIGNED NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_driver_locations_user FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Optional seed data (remove or edit as needed)
-- Admin login: admin@example.com / password123
-- bcrypt cost 10 (matches app hashing)
-- -----------------------------------------------------------------------------

INSERT INTO users (fullname, email, password, contact, role) VALUES
(
  'System Admin',
  'admin@example.com',
  '$2b$10$j4.gmaPO.4rKBc1e4xrbregqzap3ZSD9XVS3R5r/1b1S5b46fhU1W',
  '01912345678',
  'admin'
);

INSERT INTO users (fullname, email, password, contact, role) VALUES
(
  'Demo Driver',
  'driver@example.com',
  '$2b$10$j4.gmaPO.4rKBc1e4xrbregqzap3ZSD9XVS3R5r/1b1S5b46fhU1W',
  '01887654321',
  'driver'
);

INSERT INTO trips (driver_id, vehicle, `date`, fromLocation, toLocation, deposit, cost, comments)
SELECT
  u.id,
  'Truck1',
  '2026-05-01 09:00:00',
  'Dhaka Depot',
  'Chittagong Port',
  5000,
  15000,
  'Sample trip for testing'
FROM users u
WHERE u.email = 'driver@example.com'
LIMIT 1;
