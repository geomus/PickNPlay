-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 01-07-2020 a las 03:06:12
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pickandplay.db`
--
CREATE DATABASE IF NOT EXISTS `pickandplay.db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pickandplay.db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articles`
--

CREATE TABLE `articles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` int(2) NOT NULL DEFAULT '0',
  `stock` int(10) NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `outstanding` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `image` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `serialNumber` int(6) UNSIGNED DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `articles`
--

INSERT INTO `articles` (`id`, `name`, `price`, `discount`, `stock`, `category_id`, `outstanding`, `image`, `description`, `serialNumber`, `createdAt`, `updatedAt`) VALUES
(14, 'Teclado Nord', '200000.00', 0, 5, 5, 1, '[\"image-1593390856698.JPG\",\"image-1593390856702.JPG\"]', 'Lorem ipsum dolor sit amet consectetur adipiscing elit taciti, condimentum morbi sagittis penatibus ridiculus nisl libero porta nunc, senectus platea ', NULL, '2020-07-01 02:41:26', '2020-07-01 02:41:26'),
(19, 'Fender Jazz Bass', '45000.00', 25, 3, 3, 1, '[   \"fjb1.jpg\",\r\n   \"fjb2.jpg\",\r\n   \"fjb3.jpg\"]', 'Fender Jazz Bass USA color a eleccion. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 5555, '2020-07-01 02:56:34', '2020-07-01 02:56:34'),
(20, 'Music Mann Stingray', '33000.00', 0, 2, 3, 0, '[\"mms1.jpg\", \"mms2.jpg\"]', 'Music Mann Stingray USA color a eleccion. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 24441, '2020-07-01 02:58:39', '2020-07-01 02:58:39'),
(21, 'Gibson Thunderbird Bass', '103000.00', 10, 1, 3, 0, '[\"gtb1.jpg\", \"gtb2.jpg\"]', 'Gibson Thunderbird Bass USA color a eleccion. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 4777, '2020-07-01 03:03:38', '2020-07-01 03:03:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`, `rating`) VALUES
(1, 'Fenders', 10),
(2, 'Gibson', 10),
(3, 'Ibañez', 8),
(4, 'Ephipone', 9),
(5, 'Washburn', 8),
(6, 'Eastwood Guitars', 6),
(7, 'Alhambra', 6),
(8, 'G&L', 7),
(9, 'Warwick', 8),
(10, 'Jackson', 9),
(11, 'Yamaha', 10),
(12, 'Kiesel', 5),
(13, 'Paiste', 8),
(14, 'Tama', 9),
(15, 'ESP', 8),
(16, 'Remo', 9),
(17, 'Zildjian', 10),
(18, 'Sabian', 8),
(19, 'Korg', 8),
(20, 'Marshall', 8),
(21, 'Mapex', 9),
(22, 'Sonor', 9),
(23, 'Casio', 10),
(24, 'Morley', 8),
(25, 'Evans', 7),
(26, 'DW', 9),
(27, 'Gretsch', 9),
(28, 'Akai', 8),
(29, 'Takamine', 9),
(30, 'Tanglewood', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `subcategoryId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `subcategoryId`) VALUES
(1, 'Accesorios', 0),
(2, 'Baterias', 0),
(3, 'Bajos', 0),
(4, 'Guitarras', 0),
(5, 'Teclados', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategories`
--

CREATE TABLE `subcategories` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(60) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `avatar` varchar(50) NOT NULL,
  `rating` float UNSIGNED DEFAULT NULL,
  `isAdmin` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `pass`, `firstName`, `lastName`, `avatar`, `rating`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(2, 'nahu.daneri@gmail.com', '$2b$10$YeO0ndHKPHiL5EeL6FylOe2Jw55bHPvXBCnPJBsrbLnG7sxeHavOq', 'Nahuel', 'Prueba', 'avatar-1593277180489.jpg', NULL, 1, '2020-06-27 15:38:14', '2020-06-27 16:59:40');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`) USING BTREE;

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
