SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS `ecg`;
CREATE DATABASE `ecg`;
USE `ecg`;

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
    `id` varchar(255) PRIMARY KEY,
    `account_id` varchar(255),
    `access_token` varchar(255) NOT NULL,
    `refresh_token` varchar(255) NOT NULL,
    `created_at` bigint,
    `updated_at` bigint
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `accounts` (
    `id` varchar(255) PRIMARY KEY,
    `email` varchar(255) UNIQUE NOT NULL,
    `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`(
    `id` int PRIMARY KEY,
    `role_name` varchar(255) NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_status`;
CREATE TABLE `user_status`(
    `id` int PRIMARY KEY,
    `status_description` varchar(255) NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` varchar(255) PRIMARY KEY,
    `account_id` varchar(255),
    `username` varchar(255) NOT NULL,
    `gender` int,
    `birth` bigint NOT NULL,
    `phone_number` varchar(255),
    `image` varchar(500),
    `status_id` int NOT NULL,
    `information` varchar(2000),
    `role_id` int NOT NULL,
    `dummy_data` boolean default 0,
    `created_at` bigint,
    `updated_at` bigint,
    FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`),
    FOREIGN KEY (`status_id`) REFERENCES `user_status`(`id`),
    FOREIGN KEY (`role_id`) REFERENCES `user_role`(`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `devices_type`;
CREATE TABLE `devices_type`(
    `id` int PRIMARY KEY,
    `name` varchar(255) NOT NULL
);

DROP TABLE IF EXISTS `devices_status`;
CREATE TABLE `devices_status`(
    `id` int PRIMARY KEY,
    `name` varchar(255) NOT NULL
);

DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices`(
    `id` varchar(255) PRIMARY KEY,
    `doctor_id` varchar(255),
    `device_name` varchar(255) NOT NULL,
    `information` varchar(255),
    `type_id` int NOT NULL,
    `start_date` bigint NOT NULL,
    `status_id` int NOT NULL,
    `created_at` bigint,
    `updated_at` bigint,
    `dummy_data` boolean default 0,
    FOREIGN KEY (`type_id`) REFERENCES `devices_type`(`id`),
    FOREIGN KEY (`status_id`) REFERENCES `devices_status`(`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `device_details`;
CREATE TABLE `device_details`(
    `id` varchar(255) PRIMARY KEY,
    `device_id` varchar(255),
    `detail_name` varchar(255) NOT NULL,
    `information` varchar(255),
    `value` double NOT NULL, 
    `created_at` bigint,
    `updated_at` bigint,
    `dummy_data` boolean default 0,
    FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `records`;
CREATE TABLE `records` (
   `id` varchar(255) PRIMARY KEY,
   `user_id` varchar(255),
   `device_id` varchar(255),
   `start_time` bigint NOT NULL,
   `end_time` bigint NOT NULL,
   `data_rec_url` varchar(255),
   `created_at` bigint,
   `updated_at` bigint,
   `dummy_data` boolean default 0,
    FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8; 


DROP TABLE IF EXISTS `schedule_status`;
CREATE TABLE `schedule_status`(
    `id` int PRIMARY KEY,
    `status_name` varchar(255) NOT NULL
);

DROP TABLE IF EXISTS `schedule_type`;
CREATE TABLE `schedule_type`(
    `id` int PRIMARY KEY,
    `type_name` varchar(255) NOT NULL
);

DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule` (
    `id` varchar(255) PRIMARY KEY,
    `user_id` varchar(255) NOT NULL,
    `type_id` int NOT NULL,
    `start_time` bigint NOT NULL,
    `end_time` bigint NOT NULL,
    `status_id` int default 0,
    `created_at` bigint,
   `updated_at` bigint,
   `dummy_data` boolean default 0,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`type_id`) REFERENCES `schedule_type`(`id`),
    FOREIGN KEY (`status_id`) REFERENCES `schedule_status`(`id`)
    )ENGINE = InnoDB DEFAULT CHARSET=utf8; 


DROP TABLE IF EXISTS `consultation_schedule`;
CREATE TABLE `consultation_schedule` (
    `id` varchar(255) PRIMARY KEY,
    `schedule_id` varchar(255) NOT NULL,
    `doctor_id` varchar(255) NOT NULL,
    FOREIGN KEY (`doctor_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8; 

DROP TABLE IF EXISTS `device_schedule`;
CREATE TABLE `device_schedule` (
    `id` varchar(255) PRIMARY KEY,
    `schedule_id` varchar(255) NOT NULL,
    `device_id` varchar(255) NOT NULL,
     FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`),
    FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8; 

DROP TABLE IF EXISTS `diagnosis`;
CREATE TABLE `diagnosis`(
    `id` varchar(255) PRIMARY KEY,
    `user_id` varchar(255) NOT NULL,
    `doctor_id` varchar(255),
    `schedule_id` varchar(255),
    `information` varchar(2000),
    FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8; 

DROP TABLE IF EXISTS `recurring_schedule`;
CREATE TABLE `recurring_schedule`(
    `id` varchar(255) PRIMARY KEY,
    `schedule_id` varchar(255) NOT NULL,
    `recurrence_pattern` ENUM('daily', 'weekly', 'monthly') NOT NULL,
    `recurrence_interval` INT DEFAULT 1,
    `day_of_week` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    `start_time` bigint NOT NULL,
    `end_time` bigint,
    FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8; 

