-- Run if driver_locations table does not exist:
--   mysql -u root -p TrackTruck < backend/database/migrations/002_driver_locations.sql

USE TrackTruck;

CREATE TABLE IF NOT EXISTS driver_locations (
  user_id INT UNSIGNED NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_driver_locations_user FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
