-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 09, 2018 at 06:58 PM
-- Server version: 5.5.54-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(9) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` varchar(255) NOT NULL,
  `createdBy` varchar(255) NOT NULL,
  `createdAt` date NOT NULL,
  `likes` int(9) NOT NULL,
  `likedBy` varchar(255) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `dislikedBy` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `body`, `createdBy`, `createdAt`, `likes`, `likedBy`, `dislikes`, `dislikedBy`) VALUES
(2, 'hhhhhhhhhh', 'hhhhhhhhhhhhh', 'eeeeee', '0000-00-00', 1, '', 0, ''),
(10, 'ghfghfghfg', 'hfghfghfghfg', 'eeeeee', '0000-00-00', 5, '', 0, ''),
(11, 'fsdfdsfdsf', 'dsfxcvxcvxcvxcvxcv', 'gggggg', '0000-00-00', 3, '', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `commentStatus`
--

CREATE TABLE `commentStatus` (
  `id` int(9) NOT NULL,
  `user_id` int(9) NOT NULL,
  `blog_id` int(9) NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `commentStatus`
--

INSERT INTO `commentStatus` (`id`, `user_id`, `blog_id`, `status`) VALUES
(1, 8, 2, 1),
(2, 8, 10, 1),
(3, 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`) VALUES
(6, 'aa45', 'High458@gmail.com', '435845'),
(7, 'h', 'hh', 'hh'),
(22, 'wqeq', 'wqe@gmail.com', '213123'),
(50, 'uty', 'uytu', 'uytu');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `salary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `salary`) VALUES
(1, 30),
(5, 30),
(31, 20),
(32, 40);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`) VALUES
(1, 'aa@gmail.com', 'fdsfds', '324324'),
(2, 'aa2@gmail.com', 'fdsf222ds', '32432422'),
(3, 'aa2@gmail.com', 'fdsf222ds', '32432422'),
(4, 'eeeee@gmail.com', 'eeeeee', '12345'),
(5, 'eeeee1@gmail.com', 'eeeeee1', '123451'),
(6, 'eeeee12@gmail.com', 'eeeeee12', '123451'),
(7, 'rewrwerwe@gmail.com', 'ewrwerewrew', '12345'),
(8, 'gggggg@gmail.com', 'gggggg', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commentStatus`
--
ALTER TABLE `commentStatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `commentStatus`
--
ALTER TABLE `commentStatus`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
