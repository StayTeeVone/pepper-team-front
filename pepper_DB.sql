-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Фев 16 2023 г., 13:05
-- Версия сервера: 10.4.24-MariaDB
-- Версия PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `pepper_DB`
--

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name` varchar(75) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(35) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id_user`, `name`, `email`, `phone`, `role`, `password`) VALUES
(1, 'Oleh Grushkevych', 'oleh2002@gmail.com', '+38 097 943 16 70', 1, '$2a$10$1jaI9uwG2bl1alCQm2pG9Ob.wKBZC.Htv.e0JQBWEpn..ewVit8MS'),
(2, 'Tolik', 'tolik@gmail.com', '0681597823', 1, '$2a$10$1jaI9uwG2bl1alCQm2pG9O1g.ii0DMYJdqsM.w.1JM0Yf9CkKkPQ2'),
(3, 'sjdfsfer', 'adam@postage.tk', '4689498', 1, '$2a$10$1jaI9uwG2bl1alCQm2pG9OxkaMUrvyB10gdOXgO0kkiyPEs49Rmhu'),
(4, 'Stanislav', '0787@sellerfolders.com', '096-789-26-49', 1, '$2a$10$G5jUrUwd2bhhHWS6W.s3G.X4ZPJXcOTSkTne3uaOj7I2ORbCKhkM6'),
(5, 'serik222', 'greatones@postage.tk', '066-751-79-23', 1, '$2a$10$G5jUrUwd2bhhHWS6W.s3G.Ifogs4RCy/FHBnhgZC5TDXRGyLm0a4y'),
(6, 'yarik', 'yarik123@gmail.com', '0927489213', 1, '$2a$10$OgMPpwNeBpawDmrzsAW3wuaYCIlNFNqSLim1JpWjFlyeNPPz4qDae');

-- --------------------------------------------------------

--
-- Структура таблицы `user_roles`
--

CREATE TABLE `user_roles` (
  `id_user_role` int(11) NOT NULL,
  `role_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `user_roles`
--

INSERT INTO `user_roles` (`id_user_role`, `role_name`) VALUES
(1, 'user'),
(2, 'admin');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `role` (`role`);

--
-- Индексы таблицы `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id_user_role`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id_user_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role`) REFERENCES `user_roles` (`id_user_role`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
