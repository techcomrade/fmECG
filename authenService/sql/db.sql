SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `authen` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `accessToken` varchar(500) NOT NULL,
  `refreshToken` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` (`id`, `Email`,`password`) VALUES
(1, 'tranquyen151203@gmail.com', '$2b$10$Dq1oa33qmrJmho5WRgfQ0ujuW4NiuiwJ6mRb/PFSEys4NIwwmvVx6');
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;