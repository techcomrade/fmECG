SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS `fmecg`;
CREATE DATABASE `fmecg`;
USE `fmecg`;

DROP TABLE IF EXISTS `reset_tokens`;
CREATE TABLE `reset_tokens` (
    `id` varchar(255) NOT NULL,
    `authen_id` varchar(255) NOT NULL,
    `access_token` varchar(255) NOT NULL,
    `refresh_token` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `patient_doctor_assignment`;
CREATE TABLE `patient_doctor_assignment` (
   `id` varchar(255) NOT NULL,
   `patient_id` varchar(255) NOT NULL,
   `doctor_id` varchar(255) NOT NULL,
   `start_date` datetime NOT NULL,
   `created_at` datetime NOT NULL,
   `updated_at` datetime NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `heart_rec`;
CREATE TABLE `heart_rec` (
   `id` varchar(255) NOT NULL,
   `ecg_rec_id` varchar(255) NOT NULL,
   `device_id` varchar(255) NOT NULL,
   `data_directory` varchar(255) NOT NULL,
   `start_time` datetime NOT NULL,
   `stop_time` datetime NOT NULL,
   `sensor_type` varchar(255) NOT NULL,
   `data_heart_rec_url` varchar(45) NOT NULL,
   `created_at` datetime NOT NULL,
   `updated_at` datetime NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `blood_pressure_rec`;
CREATE TABLE `blood_pressure_rec` (
   `id` varchar(255) NOT NULL,
   `ecg_rec_id` varchar(255) NOT NULL,
   `device_id` varchar(255) NOT NULL,
   `data_directory` varchar(255) NOT NULL,
   `start_time` datetime NOT NULL,
   `stop_time` datetime NOT NULL,
   `sensor_type` varchar(255) NOT NULL,
   `data_blood_pressure_rec_url` varchar(45) NOT NULL,
   `created_at` datetime NOT NULL,
   `updated_at` datetime NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `ecg_records`;
CREATE TABLE `ecg_records` (
   `id` varchar(255) NOT NULL,
   `user_id` varchar(255) NOT NULL,
   `heart_rec_id` varchar(255) NOT NULL,
   `blood_pressure_rec_id` varchar(255) NOT NULL,
   `created_at` datetime NOT NULL,
   `updated_at` datetime NOT NULL
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
   `created_at` datetime NOT NULL,
   `updated_at` datetime NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `news_categories`;
CREATE TABLE `news_categories` (
   `id` varchar(255) NOT NULL,
   `category_name` varchar(255) NOT NULL,
   `category_description` varchar(255) NOT NULL, 
   `created_at` datetime NOT NULL,
   `updated_at` datetime NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `authen`;
CREATE TABLE `authen` (
    `id` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `access_token` varchar(255) NOT NULL,
    `refresh_token` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `id` varchar(255) NOT NULL,
    `authen_id` varchar(255) NOT NULL,
    `username` varchar(255) NOT NULL,
    `birth_date` datetime NOT NULL,
    `phone_number` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `role` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;
--- add primary key

ALTER TABLE `authen`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `reset_tokens`
    ADD PRIMARY KEY (`id`);
    
ALTER TABLE `user`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `patient_doctor_assignment`
    ADD PRIMARY KEY (`id`);
    
ALTER TABLE `ecg_records`
    ADD PRIMARY KEY (`id`);
    
ALTER TABLE `heart_rec`
    ADD PRIMARY KEY (`id`);
    
ALTER TABLE `blood_pressure_rec`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `news_categories`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `news`
    ADD PRIMARY KEY (`id`);

-- add foreign key constraints

ALTER TABLE `user`
    ADD FOREIGN KEY (`authen_id`) REFERENCES `authen`(`id`);

ALTER TABLE `reset_tokens`
    ADD FOREIGN KEY (`authen_id`) REFERENCES `authen`(`id`);

ALTER TABLE `ecg_records`
    ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

ALTER TABLE `heart_rec`
    ADD FOREIGN KEY (`ecg_rec_id`) REFERENCES `ecg_records`(`id`);

ALTER TABLE `blood_pressure_rec`
    ADD FOREIGN KEY (`ecg_rec_id`) REFERENCES `ecg_records`(`id`);

ALTER TABLE `news`
    ADD FOREIGN KEY (`category_id`) REFERENCES `news_categories`(`id`);

ALTER TABLE `patient_doctor_assignment`
    ADD FOREIGN KEY (`patient_id`) REFERENCES `user`(`id`);

ALTER TABLE `patient_doctor_assignment`
    ADD FOREIGN KEY (`doctor_id`) REFERENCES `user`(`id`);
-- --- auto increment

-- ALTER TABLE `authen`
--     MODIFY `id` varchar(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
--     
-- ALTER TABLE `user`
--     MODIFY `id` varchar(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

-- ALTER TABLE `patient_doctor_assignment`
--     MODIFY `id` varchar(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

-- ALTER TABLE `ecg_records`
--     MODIFY `id` varchar(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

-- ALTER TABLE `heart_rec`
--     MODIFY `id` varchar(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;g

-- ALTER TABLE `blood_pressure_rec`
--     MODIFY `id` varchar(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE account (
    id varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    create_time varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE token (
    id varchar(255) NOT NULL,
    token varchar(255) NOT NULL,
    create_time varchar(255) NOT NULL,
    delete_flag int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;