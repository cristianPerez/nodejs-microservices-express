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