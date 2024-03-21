SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS `fmecg`;
CREATE DATABASE `fmecg`;
USE `fmecg`;

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
    `id` varchar(255) NOT NULL,
    `account_id` varchar(255) NOT NULL,
    `access_token` varchar(255) NOT NULL,
    `refresh_token` varchar(255) NOT NULL,
    `created_at` bigint,
    `updated_at` bigint
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `patient_doctor_assignment`;
CREATE TABLE `patient_doctor_assignment` (
   `id` varchar(255) NOT NULL,
   `patient_id` varchar(255) NOT NULL,
   `doctor_id` varchar(255) NOT NULL,
   `start_date` bigint NOT NULL,
   `created_at` bigint,
   `updated_at` bigint
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `heart_rec`;
CREATE TABLE `heart_rec` (
   `id` varchar(255) NOT NULL,
   `rec_id` varchar(255) NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `blood_pressure_rec`;
CREATE TABLE `blood_pressure_rec` (
   `id` varchar(255) NOT NULL,
   `rec_id` varchar(255) NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
   `id` varchar(255) NOT NULL,
   `title` varchar(255) NOT NULL,
   `content` text NOT NULL,
   `category_id` varchar(255) NOT NULL,
   `author` varchar(255) NOT NULL,
   `url` varchar(255) NOT NULL,
   `image` varchar(255) NOT NULL,
   `created_at` bigint,
   `updated_at` bigint
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `news_categories`;
CREATE TABLE `news_categories` (
   `id` varchar(255) NOT NULL,
   `category_name` varchar(255) NOT NULL,
   `category_description` varchar(255) NOT NULL, 
   `created_at` bigint,
   `updated_at` bigint
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
    `id` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` varchar(255) NOT NULL,
    `account_id` varchar(255) NOT NULL,
    `username` varchar(255) NOT NULL,
    `birth` bigint NOT NULL,
    `phone_number` varchar(255),
    `image` varchar(500),
    `role` int NOT NULL,
    `created_at` bigint,
    `updated_at` bigint
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices`(
    `id` varchar(255) NOT NULL,
    `user_id` varchar(255) NOT NULL,
    `device_name` varchar(255) NOT NULL,
    `information` varchar(255),
    `device_type` int NOT NULL,
    `start_date` bigint NOT NULL,
    `end_date` bigint NOT NULL,
    `created_at` bigint,
    `updated_at` bigint
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `records`;
CREATE TABLE `records` (
   `id` varchar(255) NOT NULL,
   `user_id` varchar(255) NOT NULL,
   `device_id` varchar(255) NOT NULL,
   `device_type` int NOT NULL,
   `start_time` bigint NOT NULL,
   `end_time` bigint NOT NULL,
   `data_rec_url` varchar(45) NOT NULL,
   `created_at` bigint,
   `updated_at` bigint
)ENGINE = InnoDB DEFAULT CHARSET=utf8; 

ALTER TABLE `accounts`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `tokens`
    ADD PRIMARY KEY (`id`);
    
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `patient_doctor_assignment`
    ADD PRIMARY KEY (`id`);
    
ALTER TABLE `records`
    ADD PRIMARY KEY (`id`);
    
ALTER TABLE `heart_rec`
    ADD PRIMARY KEY (`id`);
    
ALTER TABLE `blood_pressure_rec`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `news_categories`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `news`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `devices`
    ADD PRIMARY KEY (`id`);
    
-- ALTER TABLE `devices` ADD UNIQUE INDEX `device_type_unique_index` (`device_type`);

ALTER TABLE `users`
    ADD FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`);

ALTER TABLE `tokens`
    ADD FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`);

ALTER TABLE `records`
    ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `records`
    ADD FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`);

-- ALTER TABLE `records`
--     ADD FOREIGN KEY (`device_type`) REFERENCES `devices`(`device_type`);

ALTER TABLE `heart_rec`
    ADD FOREIGN KEY (`rec_id`) REFERENCES `records`(`id`);

ALTER TABLE `blood_pressure_rec`
    ADD FOREIGN KEY (`rec_id`) REFERENCES `records`(`id`);

ALTER TABLE `news`
    ADD FOREIGN KEY (`category_id`) REFERENCES `news_categories`(`id`);

ALTER TABLE `patient_doctor_assignment`
    ADD FOREIGN KEY (`patient_id`) REFERENCES `users`(`id`);

ALTER TABLE `patient_doctor_assignment`
    ADD FOREIGN KEY (`doctor_id`) REFERENCES `users`(`id`);

ALTER TABLE `devices` 
    ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

