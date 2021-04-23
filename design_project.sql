-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2021 at 03:37 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `design_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `progress_post_id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `upvotes` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `user_id`, `progress_post_id`, `content`, `upvotes`, `created_at`, `updated_at`) VALUES
(195, 21, 130, 'Hello', 0, '2020-12-02 06:19:28', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `friend_requests`
--

CREATE TABLE `friend_requests` (
  `friend_request_id` int(11) NOT NULL,
  `requester_id` int(11) NOT NULL,
  `requestee_id` int(11) NOT NULL,
  `status` enum('PENDING','COMPLETED') DEFAULT 'PENDING',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `journal_posts`
--

CREATE TABLE `journal_posts` (
  `journal_post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` blob DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `journal_posts`
--

INSERT INTO `journal_posts` (`journal_post_id`, `user_id`, `title`, `description`, `image`, `created_at`, `updated_at`) VALUES
(7, 1, 'Ang Huling El Bimbo', 'Magaleng talaga very goodie', NULL, '2020-12-01 06:07:27', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `progress_posts`
--

CREATE TABLE `progress_posts` (
  `progress_post_id` int(11) NOT NULL,
  `quest_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `progress_posts`
--

INSERT INTO `progress_posts` (`progress_post_id`, `quest_id`, `title`, `description`, `image`, `created_at`, `updated_at`) VALUES
(130, 22, 'I gained 3 kgs', 'Very good', NULL, '2020-12-02 06:19:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quests`
--

CREATE TABLE `quests` (
  `quest_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `wish` varchar(255) NOT NULL,
  `outcome` varchar(255) NOT NULL,
  `obstacle` varchar(255) NOT NULL,
  `plan` varchar(255) NOT NULL,
  `visibility` enum('Friends','Close Friends','Only me') NOT NULL,
  `banner_image` blob DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quests`
--

INSERT INTO `quests` (`quest_id`, `user_id`, `wish`, `outcome`, `obstacle`, `plan`, `visibility`, `banner_image`, `created_at`, `updated_at`, `completed_at`) VALUES
(22, 21, 'Gain weight', 'Physically fit', 'I don\'t eat much.', 'Mag snack ko pirme', 'Friends', NULL, '2020-12-02 06:18:26', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `relationships`
--

CREATE TABLE `relationships` (
  `relationship_id` int(11) NOT NULL,
  `friend_request_id` int(11) NOT NULL,
  `user_one_id` int(11) NOT NULL,
  `user_two_id` int(11) NOT NULL,
  `status` enum('Friends','Close Friends') DEFAULT 'Friends',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `display_name`, `birthday`, `email_address`, `password`, `status`, `token`, `created_at`, `updated_at`) VALUES
(1, 'Nicole', 'Nicole', '2019-03-20', 'nicole_mhelly@yahoo.com', 'dsfdfdf', '', '', '0000-00-00', NULL),
(21, 'joana', 'Joana12', '2000-06-01', 'thierd.zeke@gmail.com', '$2a$10$/OByvi3IznDiajyn6K.U8OMjnTrQPwTIH.dLL/iVhMLdtOYOhmmlO', 'active', '5b77198a-4a24-4ea3-9c55-abce1f841980', '2020-12-01', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `progress_post_id` (`progress_post_id`);

--
-- Indexes for table `friend_requests`
--
ALTER TABLE `friend_requests`
  ADD PRIMARY KEY (`friend_request_id`),
  ADD KEY `requester_id` (`requester_id`),
  ADD KEY `requestee_id` (`requestee_id`);

--
-- Indexes for table `journal_posts`
--
ALTER TABLE `journal_posts`
  ADD PRIMARY KEY (`journal_post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `progress_posts`
--
ALTER TABLE `progress_posts`
  ADD PRIMARY KEY (`progress_post_id`),
  ADD KEY `quest_id` (`quest_id`);

--
-- Indexes for table `quests`
--
ALTER TABLE `quests`
  ADD PRIMARY KEY (`quest_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `relationships`
--
ALTER TABLE `relationships`
  ADD PRIMARY KEY (`relationship_id`),
  ADD KEY `user_one_id` (`user_one_id`),
  ADD KEY `user_two_id` (`user_two_id`),
  ADD KEY `FK_fr_id` (`friend_request_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `friend_requests`
--
ALTER TABLE `friend_requests`
  MODIFY `friend_request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `journal_posts`
--
ALTER TABLE `journal_posts`
  MODIFY `journal_post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `progress_posts`
--
ALTER TABLE `progress_posts`
  MODIFY `progress_post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `quests`
--
ALTER TABLE `quests`
  MODIFY `quest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `relationships`
--
ALTER TABLE `relationships`
  MODIFY `relationship_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`progress_post_id`) REFERENCES `progress_posts` (`progress_post_id`) ON DELETE CASCADE;

--
-- Constraints for table `friend_requests`
--
ALTER TABLE `friend_requests`
  ADD CONSTRAINT `friendrequests_fk1` FOREIGN KEY (`requester_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `friendrequests_fk2` FOREIGN KEY (`requestee_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `journal_posts`
--
ALTER TABLE `journal_posts`
  ADD CONSTRAINT `journal_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `progress_posts`
--
ALTER TABLE `progress_posts`
  ADD CONSTRAINT `progress_posts_ibfk_1` FOREIGN KEY (`quest_id`) REFERENCES `quests` (`quest_id`) ON DELETE CASCADE;

--
-- Constraints for table `quests`
--
ALTER TABLE `quests`
  ADD CONSTRAINT `quests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `relationships`
--
ALTER TABLE `relationships`
  ADD CONSTRAINT `FK_fr_id` FOREIGN KEY (`friend_request_id`) REFERENCES `friend_requests` (`friend_request_id`),
  ADD CONSTRAINT `relationships_ibfk_1` FOREIGN KEY (`user_one_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `relationships_ibfk_2` FOREIGN KEY (`user_two_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
