SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS `fmecg`;
CREATE DATABASE `fmecg`;
USE `fmecg`;

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
    `id` varchar(255) NOT NULL,
    `account_id` varchar(255),
    `access_token` varchar(255) NOT NULL,
    `refresh_token` varchar(255) NOT NULL,
    `created_at` bigint,
    `updated_at` bigint
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `patient_doctor_assignment`;
CREATE TABLE `patient_doctor_assignment` (
   `id` varchar(255) NOT NULL,
   `patient_id` varchar(255) UNIQUE,
   `doctor_id` varchar(255),
   `start_date` bigint NOT NULL,
   `end_date` bigint,
   `created_at` bigint,
   `updated_at` bigint,
   `dummy_data` boolean default 0
)ENGINE = InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
   `id` varchar(255) NOT NULL,
   `title` varchar(255) NOT NULL,
   `content` text NOT NULL,
   `category_id` varchar(255),
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
    `email` varchar(255) UNIQUE NOT NULL,
    `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` varchar(255) NOT NULL,
    `account_id` varchar(255),
    `username` varchar(255) NOT NULL,
    `gender` int,
    `birth` bigint NOT NULL,
    `phone_number` varchar(255),
    `image` varchar(500),
    `status` int NOT NULL,
    `information` varchar(2000),
    `role` int NOT NULL,
    `created_at` bigint,
    `updated_at` bigint
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices`(
    `id` varchar(255) NOT NULL,
    `user_id` varchar(255),
    `doctor_id` varchar(255),
    `device_name` varchar(255) NOT NULL,
    `information` varchar(255),
    `device_type` int NOT NULL,
    `start_date` bigint NOT NULL,
    `end_date` bigint NOT NULL,
    `status` int NOT NULL,
    `created_at` bigint,
    `updated_at` bigint,
    `dummy_data` boolean default 0
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `device_frequency`;
CREATE TABLE `device_frequency`(
    `id` varchar(255) NOT NULL,
    `device_id` varchar(255),
    `frequency_name` varchar(255) NOT NULL,
    `information` varchar(255),
    `value` double NOT NULL, 
    `created_at` bigint,
    `updated_at` bigint,
    `dummy_data` boolean default 0
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `records`;
CREATE TABLE `records` (
   `id` varchar(255) NOT NULL,
   `user_id` varchar(255),
   `device_id` varchar(255),
   `record_type` int NOT NULL,
   `start_time` bigint NOT NULL,
   `end_time` bigint NOT NULL,
   `data_rec_url` varchar(255),
   `created_at` bigint,
   `updated_at` bigint,
   `dummy_data` boolean default 0
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

ALTER TABLE `news_categories`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `news`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `devices`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `device_frequency`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
    ADD CONSTRAINT fk_users_account FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE;

ALTER TABLE `tokens`
    ADD CONSTRAINT fk_tokens_account FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE SET NULL;

ALTER TABLE `records`
    ADD CONSTRAINT fk_records_user FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE SET NULL;

ALTER TABLE `records`
    ADD CONSTRAINT fk_records_device FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE CASCADE ON UPDATE SET NULL;

ALTER TABLE `news`
    ADD CONSTRAINT fk_news_category FOREIGN KEY (`category_id`) REFERENCES `news_categories`(`id`) ON DELETE CASCADE ON UPDATE SET NULL;

ALTER TABLE `patient_doctor_assignment`
    ADD CONSTRAINT fk_patient_doctor_assignment_patient FOREIGN KEY (`patient_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE SET NULL;

ALTER TABLE `patient_doctor_assignment`
    ADD CONSTRAINT fk_patient_doctor_assignment_doctor FOREIGN KEY (`doctor_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE SET NULL;

ALTER TABLE `devices` 
    ADD CONSTRAINT fk_devices_user FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE SET NULL;

ALTER TABLE `devices` 
    ADD CONSTRAINT fk_devices_user_doctor FOREIGN KEY (`doctor_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE SET NULL;
    
ALTER TABLE `device_frequency`
    ADD CONSTRAINT fk_frequency_device FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE CASCADE ON UPDATE SET NULL;

INSERT INTO `accounts`(`id`, `email`, `password`) 
VALUES('86d1470c-de72-457c-a8e1-a616e55f463f', 'duong123@gmail.com', '$2b$10$vrYT1waVBk3VNXdHB1dQbOdwtKIyUoQ04wMpfcSWTPnK5S0oAg4ci');

INSERT INTO `accounts`(`id`, `email`, `password`) 
VALUES('1bd51bda-3179-4f27-bcfd-000e5c4a2aa7', 'quyen123@gmail.com', '$2b$10$IMi9aW1ZrYES62fFyzW5OeMhPk.7ohLy4mmE58WRKVfrNLxVmfClS');

INSERT INTO `accounts`(`id`, `email`, `password`) 
VALUES('83573421-9943-4a25-9fe1-00f0477aaba4', 'dung123@gmail.com', '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG');

INSERT INTO `accounts`(`id`, `email`, `password`) 
VALUES('22183931-6fc3-4518-af34-e86c8605b08a', 'uuidd@gmail.com', '$2b$10$a7binaajgY8b3s82rppXHecKuSbcFi1ULGf0v4B/aIaMplhLbbNwC');

INSERT INTO `accounts`(`id`, `email`, `password`) 
VALUES('83573421-9943-4a25-9fe1-00f0477aaba9', 'dung@gmail.com', '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG');

INSERT INTO `accounts`(`id`, `email`, `password`) 
VALUES('83573421-9943-4a25-9fe1-00f0477aaba8', 'dung1@gmail.com', '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG');

INSERT INTO `accounts`(`id`, `email`, `password`) 
VALUES('83573421-9943-4a25-9fe1-00f0477aaba6', 'dung2@gmail.com', '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG');

INSERT INTO `accounts`(`id`, `email`, `password`) 
VALUES('83573421-9943-4a25-9fe1-00f0477aaba5', 'dung3@gmail.com', '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG');

INSERT INTO `accounts`(`id`, `email`, `password`) 
VALUES('83573421-9943-4a25-9fe1-00f0477aaba2', 'dung4@gmail.com', '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG');

INSERT INTO `accounts`(`id`, `email`, `password`) 
VALUES('83573421-9943-4a25-9fe1-00f0477aaba1', 'dung5@gmail.com', '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG');

INSERT INTO `users`(`id`, `account_id`, `username`,`gender`, `birth`, `phone_number`, `image`,`status`,`information`, `role`, `created_at`, `updated_at`) 
VALUES('f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', '86d1470c-de72-457c-a8e1-a616e55f463f', 'duong', 0, '17052003', '0912234888', '01201020120abc',0 ,'đo huyết áp và nhịp tim', 1, '1711115945125', '1711115945125');

INSERT INTO `users`(`id`, `account_id`, `username`,`gender`, `birth`, `phone_number`, `image`,`status`,`information`, `role`, `created_at`, `updated_at`) 
VALUES('4df9ace1-0229-4756-b850-51a83cb0bb6e', '1bd51bda-3179-4f27-bcfd-000e5c4a2aa7', 'qtv', 1, '1232367', '09122348767', '0101010101abc',0,'đo huyết áp và nhịp tim', 0, '1711118359957', '1711118359957');

INSERT INTO `users`(`id`, `account_id`, `username`,`gender`, `birth`, `phone_number`, `image`,`status`,`information`, `role`, `created_at`, `updated_at`) 
VALUES('37ae5629-54ec-46e0-be65-9af6bd500b3b', '83573421-9943-4a25-9fe1-00f0477aaba4', 'he', 0, '1232366', '09122348669', '010101010100abc',0,'đo huyết áp vàdfdf nhịp tim', 2, '1711121415247', '1711121415247');

INSERT INTO `users`(`id`, `account_id`, `username`,`gender`, `birth`, `phone_number`, `image`,`status`,`information`, `role`, `created_at`, `updated_at`) 
VALUES('178d7109-7568-472c-9350-2db42aa152f6', '22183931-6fc3-4518-af34-e86c8605b08a', 'dhsh', 1, '123236811', '091223486384', '01010101010110abc',0,'đo huyết áp và nhịp tim', 1, '1711206172234', '1711206172234');

INSERT INTO `users`(`id`, `account_id`, `username`,`gender`, `birth`, `phone_number`, `image`,`status`,`information`, `role`, `created_at`, `updated_at`) 
VALUES('37ae5629-54ec-46e0-be65-9af6bd580b2b', '83573421-9943-4a25-9fe1-00f0477aaba9', 'abc', 0, '1232366', '09122348669', '010101010100abc',0,'đo huyết áp và nhịp tim', 2, '1711121415247', '1711121415247');

INSERT INTO `users`(`id`, `account_id`, `username`,`gender`, `birth`, `phone_number`, `image`,`status`,`information`, `role`, `created_at`, `updated_at`) 
VALUES('37ae5629-54ec-46e0-be65-9af6bd580b3b', '83573421-9943-4a25-9fe1-00f0477aaba8', 'dâo', 1, '1232366', '09122348669', '010101010100abc',0,'đo huyết áp và nhịp tim', 2, '1711121415247', '1711121415247');

INSERT INTO `users`(`id`, `account_id`, `username`,`gender`, `birth`, `phone_number`, `image`,`status`,`information`, `role`, `created_at`, `updated_at`) 
VALUES('37ae5629-54ec-46e0-be65-9af6bd580b4b', '83573421-9943-4a25-9fe1-00f0477aaba2', 'huong', 1, '1232366', '09122348669', '010101010100abc',0,'đo huyết áp và nhịp tim', 2, '1711121415247', '1711121415247');

INSERT INTO `users`(`id`, `account_id`, `username`,`gender`, `birth`, `phone_number`, `image`,`status`,`information`, `role`, `created_at`, `updated_at`) 
VALUES('37ae5629-54ec-46e0-be65-9af6bd510b2b', '83573421-9943-4a25-9fe1-00f0477aaba6', 'tien', 0, '1232366', '09122348669', '010101010100abc',0,'đo huyết áp và nhịp tim', 2, '1711121415247', '1711121415247');

INSERT INTO `users`(`id`, `account_id`, `username`,`gender`, `birth`, `phone_number`, `image`,`status`,`information`, `role`, `created_at`, `updated_at`) 
VALUES('37ae5629-54ec-46e0-be65-9af6bd680b2b', '83573421-9943-4a25-9fe1-00f0477aaba5', 'nam', 0, '1232366', '09122348669', '010101010100abc',0,'đo huyết áp và nhịp tim', 2, '1711121415247', '1711121415247');

INSERT INTO `users`(`id`, `account_id`, `username`,`gender`, `birth`, `phone_number`, `image`,`status`,`information`, `role`, `created_at`, `updated_at`) 
VALUES('37ae5629-54ec-46e0-be45-9af6bd580b2b', '83573421-9943-4a25-9fe1-00f0477aaba1', 'hoang', 0, '1232366', '09122348669', '010101010100abc',0,'đo huyết áp và nhịp tim', 2, '1711121415247', '1711121415247');

INSERT INTO `tokens`(`id`, `account_id`, `access_token`, `refresh_token`, `created_at`, `updated_at`)
VALUES('090abf0e-f775-465c-b25a-8fa38fef8025', '86d1470c-de72-457c-a8e1-a616e55f463f', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMTAyNjUyMiwiZXhwIjoxNzExMDI5NTIyfQ.kH1yuJgfpq5NFzb80LrEf-gV8ksNjYtylSokQHzAIoA', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMTAyNjUyMiwiZXhwIjoxNzk3NDI2NTIyfQ.-AGRKU9-mDSLwLiVoF2CR5aZEQy49rTpfzbCAcEL-S4', '1711161793890', '1711161793890');

INSERT INTO `tokens`(`id`, `account_id`, `access_token`, `refresh_token`, `created_at`, `updated_at`)
VALUES('9c128953-e6b9-4d21-bb39-fdb0a04ed7bd', '1bd51bda-3179-4f27-bcfd-000e5c4a2aa7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMDg0Njg2MywiZXhwIjoxNzEwODQ5ODYzfQ.Lx5RyS3fTksxlcUP5WNOMnGh047_8xyiEDKR7EY22g4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMDg0Njg2MywiZXhwIjoxNzk3MjQ2ODYzfQ.PA8nsFFZ6cWszIPkdHZa1WQN8oVcwNk-VXqp3qt2XiI', '1711161988658', '1711161988658');

INSERT INTO `tokens`(`id`, `account_id`, `access_token`, `refresh_token`, `created_at`, `updated_at`)
VALUES('f55faa1f-112c-458c-9e20-82de73961148', '83573421-9943-4a25-9fe1-00f0477aaba4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMDg0NjcyMywiZXhwIjoxNzEwODQ5NzIzfQ.oqHADHSmVk9NlVW2MzSbrvQkd0Uz3pwuZT9Om4_dpuw', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMDg0NjcyMywiZXhwIjoxNzk3MjQ2NzIzfQ.Euiq6SfKr2X6H_wAKwg6EKSjyIz-Uyx3Ip07NPhYnfE', '1711161997681', '1711161997681');

INSERT INTO `tokens`(`id`, `account_id`, `access_token`, `refresh_token`, `created_at`, `updated_at`)
VALUES('944754d9-bb54-43b4-b9bc-4b5a9f3ed575', '22183931-6fc3-4518-af34-e86c8605b08a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhM2RhY2M5LTU2MjgtNDFiMS04MGFlLWE5NTZjMTA1Mjg3NSIsImlhdCI6MTcxMTIwNzY0NywiZXhwIjoxNzExMjEwNjQ3fQ.BsYBYh_z2XYQ4uIwLLRLsca325BcYSIzgw9SZGaZQb0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhM2RhY2M5LTU2MjgtNDFiMS04MGFlLWE5NTZjMTA1Mjg3NSIsImlhdCI6MTcxMTIwNzY0NywiZXhwIjoxNzk3NjA3NjQ3fQ.dFx1Lm4B_L9_SojZuS7kAFaBma2N4pgGJZuoSWMWBec', '1711207647969', '1711207647969');

INSERT INTO `news_categories`(`id`, `category_name`, `category_description`, `created_at`, `updated_at`)
VALUES('b5dc2e2a-dcb1-4903-9054-02e242f5cd55', 'Marvellous', 'some_crazy_thing', '1711118359957', '1711118359957');

INSERT INTO `news_categories`(`id`, `category_name`, `category_description`, `created_at`, `updated_at`)
VALUES('1272d710-00ab-4e40-b740-60eb6df36354', 'DC', 'some_mad_thing', '1711118359957', '1711118359957');

INSERT INTO `news`(`id`,`title`, `content`, `category_id`, `author`, `url`, `image`, `created_at`, `updated_at`)
VALUES('65sd8373-78gc-b38s-77sg-2hj7hd890b2s', 'Dr Strange', 'Hello world', 'b5dc2e2a-dcb1-4903-9054-02e242f5cd55', 'quyen', 'https://www.youtube.com/watch?v=mvATWl8ZJwU', '012012120abd', '1711121415247', '1711121415247');

INSERT INTO `news`(`id`,`title`, `content`, `category_id`, `author`, `url`, `image`, `created_at`, `updated_at`)
VALUES('0dc699f3-15a1-42f6-8199-35b122d3e48f', 'Dr Fate', 'Hi world', '1272d710-00ab-4e40-b740-60eb6df36354', 'duong', 'https://www.youtube.com/watch?v=1zAHkRGJ0s8', '102120abde', '1711122410782', '1711122410782');

INSERT INTO `devices`(`id`, `user_id`,`doctor_id`, `device_name`, `information`, `device_type`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`)
VALUES('2a3cec92-682a-4d4e-be35-aff01cc5011a', '4df9ace1-0229-4756-b850-51a83cb0bb6e','f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', 'Microlife Watch BP Home', 'do ap suat mau', 1, '1711189128343', '1711239128586', 1, '1711189128343', '1711189318343');

INSERT INTO `devices`(`id`, `user_id`,`doctor_id`, `device_name`, `information`, `device_type`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`)
VALUES('4404f003-1192-4aae-86e0-69dc273f181c', '4df9ace1-0229-4756-b850-51a83cb0bb6e','f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', 'ECG', 'do dien tim', 2, '1711239328586', '1711319128906', 0, '1711239328586', '1711269112606');

INSERT INTO `devices`(`id`, `user_id`,`doctor_id`, `device_name`, `information`, `device_type`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`)
VALUES('f224fd99-53fd-44c5-bcd4-5b6e3c960e78', '37ae5629-54ec-46e0-be65-9af6bd580b2b','f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', 'ECG', 'do dien tim', 2, '1711324367820', '1711434712320', 1, '1711324367820', '1711364367231');

INSERT INTO `device_frequency` (`id`, `device_id`, `frequency_name`, `information`, `value`, `created_at`, `updated_at`) 
VALUES ('f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', '4404f003-1192-4aae-86e0-69dc273f181c', 'spo2(ms)', 'tín hiệu điện tim', 100, '1711115945125', '1711115945125');

INSERT INTO `device_frequency` (`id`, `device_id`, `frequency_name`, `information`, `value`, `created_at`, `updated_at`) 
VALUES ('b5dc2e2a-dcb1-4903-9054-02e242f5cd55', '4404f003-1192-4aae-86e0-69dc273f181c', 'so2(ms)', 'tín hiệu điện tim', 200, '1711115945125', '1711115945125');

INSERT INTO `device_frequency` (`id`, `device_id`, `frequency_name`, `information`, `value`, `created_at`, `updated_at`) 
VALUES ('f86068c7-08ed-4dfc-b96d-e0e1c0ae19df', '2a3cec92-682a-4d4e-be35-aff01cc5011a', 'o2(ms)', 'tín hiệu điện tim', 300, '1711115945125', '1711115945125');

INSERT INTO `device_frequency` (`id`, `device_id`, `frequency_name`, `information`, `value`, `created_at`, `updated_at`) 
VALUES ('f86068c7-08ed-4dfc-b96d-e0e1c0ae29df', 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78', 's2(ms)', 'tín hiệu điện tim', 100, '1711115945125', '1711115945125');

INSERT INTO `device_frequency` (`id`, `device_id`, `frequency_name`, `information`, `value`, `created_at`, `updated_at`) 
VALUES ('f86068c7-08ed-4dfc-b96d-e0e1c0ae08df', 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78', 'p2(ms)', 'tín hiệu điện tim', 100, '1711115945125', '1711115945125');

INSERT INTO `records`(`id`, `user_id`, `device_id`, `record_type`, `start_time`, `end_time`, `data_rec_url`, `created_at`, `updated_at`)
VALUES('c9e6669b-f58f-47c7-80b8-43a4163553ff', '4df9ace1-0229-4756-b850-51a83cb0bb6e', '2a3cec92-682a-4d4e-be35-aff01cc5011a', 1, '1711189128343', '1711239128586', 'https://www.verywellhealth.com/best-blood-pressure-monitors-4158050/quyentran', '1711189128343', '1711229128712');

INSERT INTO `records`(`id`, `user_id`, `device_id`, `record_type`, `start_time`, `end_time`, `data_rec_url`, `created_at`, `updated_at`)
VALUES('c0f31b49-2449-45fa-8c93-55da998687f4', '4df9ace1-0229-4756-b850-51a83cb0bb6e', '4404f003-1192-4aae-86e0-69dc273f181c', 2, '1711239328586', '1711319128906', 'https://www.docosan.com/blog/tim-mach/dien-tim/quyentran', '1711239328586', '1711288127320');

INSERT INTO `records`(`id`, `user_id`, `device_id`, `record_type`, `start_time`, `end_time`, `data_rec_url`, `created_at`, `updated_at`)
VALUES('c2c9f725-2a71-4c5a-b3d2-6a4d774a1a42', '37ae5629-54ec-46e0-be65-9af6bd580b2b', 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78', 2, '1711324367820', '1711434712320', 'https://www.youtube.com/dung', '1711324367820', '1711374913710');

INSERT INTO `patient_doctor_assignment`(`id`, `patient_id`, `doctor_id`, `start_date`, `end_date`, `created_at`, `updated_at`)
VALUES('aec18bd6-a2eb-4521-99fd-f00d867a849f', '37ae5629-54ec-46e0-be65-9af6bd580b2b', 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', '1711189128343', '1711189128943', '1711173634732', '1711173634732');

INSERT INTO `patient_doctor_assignment`(`id`, `patient_id`, `doctor_id`, `start_date`, `end_date`, `created_at`, `updated_at`)
VALUES('d5e62f91-8314-43a7-931a-8d05607116bb', '37ae5629-54ec-46e0-be65-9af6bd500b3b', 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', '1711204367820', '1711189129343', '1711198367820', '1711200678260');


INSERT INTO `patient_doctor_assignment`(`id`, `patient_id`, `doctor_id`, `start_date`, `end_date`, `created_at`, `updated_at`)
VALUES('37ae5629-54ec-46e0-be65-9af6bd580b2b', '37ae5629-54ec-46e0-be65-9af6bd580b4b', 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', '1711204367820', '1711189129343', '1711198367820', '1711200678260');


INSERT INTO `patient_doctor_assignment`(`id`, `patient_id`, `doctor_id`, `start_date`, `end_date`, `created_at`, `updated_at`)
VALUES('37ae5629-54ec-46e0-be65-9af6bd580b4b', '37ae5629-54ec-46e0-be65-9af6bd580b4b', 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', '1711204367820', '1711189129343', '1711198367820', '1711200678260');


INSERT INTO `patient_doctor_assignment`(`id`, `patient_id`, `doctor_id`, `start_date`, `end_date`, `created_at`, `updated_at`)
VALUES('37ae5629-54ec-46e0-be65-9af6bd280b4b', '37ae5629-54ec-46e0-be65-9af6bd580b2b', 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', '1711204367820', '1711189129343', '1711198367820', '1711200678260');


INSERT INTO `patient_doctor_assignment`(`id`, `patient_id`, `doctor_id`, `start_date`, `end_date`, `created_at`, `updated_at`)
VALUES('37ae5629-54ec-46e0-be65-9af6bd510b2b', '37ae5629-54ec-46e0-be65-9af6bd510b2b', 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', '1711204367820', '1711189129343', '1711198367820', '1711200678260');


INSERT INTO `patient_doctor_assignment`(`id`, `patient_id`, `doctor_id`, `start_date`, `end_date`, `created_at`, `updated_at`)
VALUES('37ae5629-54ec-46e0-be65-9af6bd680b2b', '37ae5629-54ec-46e0-be65-9af6bd680b2b', 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', '1711204367820', '1711189129343', '1711198367820', '1711200678260');


INSERT INTO `patient_doctor_assignment`(`id`, `patient_id`, `doctor_id`, `start_date`, `end_date`, `created_at`, `updated_at`)
VALUES('37ae5629-54ec-46e0-be45-9af6bd580b2b', '37ae5629-54ec-46e0-be45-9af6bd580b2b', 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df', '1711204367820', '1711189129343', '1711198367820', '1711200678260');