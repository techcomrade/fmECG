SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `account` (
    `id` int NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `create_time` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `token` (
    `id` int NOT NULL,
    `token` varchar(255) NOT NULL,
    `create_time` DATE NOT NULL,
    `delete_flag` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;