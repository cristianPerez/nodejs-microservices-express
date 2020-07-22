/* For acces programatically to the server */
ALTER USER `root`@`localhost` IDENTIFIED WITH mysql_native_password BY `password`
flush privileges;
/* For acces programatically to the server */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` varchar(32) UNIQUE,
  `name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `user` VALUES ('123','Cristian Perez', 'cperez354', '2020-07-21 08:20:00','2020-07-21 08:20:00')

DROP TABLE IF EXISTS `auth`;

CREATE TABLE `auth` (
  `id` varchar(32) UNIQUE,
  `username` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `user_follow`;

CREATE TABLE `user_follow` (
  `user_from` varchar(32) DEFAULT NULL,
  `user_to` varchar(32) DEFAULT NULL
) CHARSET=utf8 COLLATE=utf8_unicode_ci;

/* Creating a unoque index in two columns */
CREATE UNIQUE INDEX idx_follow
ON user_follow(user_from,user_to);

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` varchar(32) UNIQUE,
  `text` varchar(200) DEFAULT NULL,
  `user_id` varchar(32) DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `user` VALUES ('999','New post', '123', '2020-07-21 08:20:00','2020-07-21 08:20:00');
