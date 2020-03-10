-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 03, 2020 at 11:51 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `handshake`
--
CREATE DATABASE IF NOT EXISTS `handshake` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `handshake`;

-- --------------------------------------------------------

--
-- Table structure for table `applied_jobs`
--

CREATE TABLE `applied_jobs` (
  `student_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `date_applied` date NOT NULL,
  `app_status` enum('Pending','Reviewed','Declined') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `company_register`
--

CREATE TABLE `company_register` (
  `company_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `id` int(11) NOT NULL,
  `description` mediumtext DEFAULT NULL,
  `contact_info` varchar(45) DEFAULT NULL,
  `profile_pic` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company_register`
--

INSERT INTO `company_register` (`company_name`, `email`, `password`, `location`, `id`, `description`, `contact_info`, `profile_pic`) VALUES
('Google', 'v.manchanda3@google.com', '8cb2237d0679ca88db6464eac60da96345513964', 'San Jose', 1, 'We are the best to work for!', NULL, 'img-1582173682443.jpeg'),
('Ciena', 'shivangi.nagpal@ciena.com', '8cb2237d0679ca88db6464eac60da96345513964', 'Gurgaon', 2, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_post`
--

CREATE TABLE `event_post` (
  `event_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date_of_event` date NOT NULL,
  `event_description` varchar(255) NOT NULL,
  `time` time DEFAULT NULL,
  `eligibility` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_post`
--

INSERT INTO `event_post` (`event_id`, `company_id`, `event_name`, `location`, `date_of_event`, `event_description`, `time`, `eligibility`) VALUES
(5, 1, 'Meet and Greet', 'Ball Room, Student Union', '2020-03-15', 'Meet and greet with budding engineers', '14:00:00', 'Graduate courses: CMPE, CS only'),
(6, 1, 'Meet and Greet', 'Ball Room, Student Union', '2020-03-15', 'Meet and greet with budding engineers', '14:00:00', 'UnderGrad courses: CMPE, CS only'),
(7, 1, 'Coding Prep', 'BBC 423', '2020-03-20', 'Learn to code in JS', '14:00:00', 'Undergrad students');

-- --------------------------------------------------------

--
-- Table structure for table `job_post`
--

CREATE TABLE `job_post` (
  `job_id` int(11) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `posting_date` date NOT NULL,
  `app_deadline` date NOT NULL,
  `location` varchar(45) NOT NULL,
  `salary` varchar(15) NOT NULL,
  `job_description` text NOT NULL,
  `job_category` enum('Full Time','Part Time','Intern','On Campus') NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_education`
--

CREATE TABLE `student_education` (
  `student_id` int(11) NOT NULL,
  `college_name` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `degree` varchar(45) NOT NULL,
  `major` varchar(45) NOT NULL,
  `cgpa` varchar(45) DEFAULT NULL,
  `year_passing` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_education`
--

INSERT INTO `student_education` (`student_id`, `college_name`, `location`, `degree`, `major`, `cgpa`, `year_passing`) VALUES
(1, 'DAVIET', 'India', 'Btech', 'EE', '8.4', 2011),
(1, 'Thapar university', 'India', 'ME', 'EIC', '9.9', 2013);

-- --------------------------------------------------------

--
-- Table structure for table `student_experience`
--

CREATE TABLE `student_experience` (
  `student_id` int(11) NOT NULL,
  `company_name` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `start_date` varchar(45) NOT NULL,
  `end_date` varchar(45) DEFAULT NULL,
  `work_desc` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_experience`
--

INSERT INTO `student_experience` (`student_id`, `company_name`, `title`, `location`, `start_date`, `end_date`, `work_desc`) VALUES
(1, 'Ciena', 'Software Engineer', 'India', '2016-20-04', '2017-01-11', 'cli');

-- --------------------------------------------------------

--
-- Table structure for table `student_register`
--

CREATE TABLE `student_register` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `school` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `dob` date DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `career_obj` text DEFAULT NULL,
  `profile_pic` varchar(100) DEFAULT NULL,
  `phone_num` varchar(15) DEFAULT NULL,
  `skill_set` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_register`
--

INSERT INTO `student_register` (`id`, `email`, `first_name`, `last_name`, `school`, `password`, `dob`, `city`, `state`, `country`, `career_obj`, `profile_pic`, `phone_num`, `skill_set`) VALUES
(1, 'shivangi.nagpal@sjsu.edu', 'Shivangi', 'Nagpal', 'SJSU', '8cb2237d0679ca88db6464eac60da96345513964', '1989-12-02', 'San Jose', 'California', 'United States', 'hjhkjl', NULL, '6692269561', 'C, C++'),
(2, 'surya.katari@sjsu.edu', 'Surya', 'Katari', 'SJSU', '8cb2237d0679ca88db6464eac60da96345513964', '1997-04-02', 'Santa Clara', 'CA', 'US', '', NULL, '779991123', ''),
(3, 'varmanch@usc.edu', 'Varun', 'Manchanda', 'USC', '8cb2237d0679ca88db6464eac60da96345513964', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'pallavi.arya@sjsu.edu', 'Pallavi', 'Arya', 'SJSU', '8cb2237d0679ca88db6464eac60da96345513964', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'shivangi_nagpal@sjsu.edu', 'Shivangi', 'Nagpal', 'Sjsu', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applied_jobs`
--
ALTER TABLE `applied_jobs`
  ADD PRIMARY KEY (`student_id`,`job_id`),
  ADD KEY `fk_job_id` (`job_id`);

--
-- Indexes for table `company_register`
--
ALTER TABLE `company_register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `uni_comp_name` (`company_name`);

--
-- Indexes for table `event_post`
--
ALTER TABLE `event_post`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `job_post`
--
ALTER TABLE `job_post`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `comp_id` (`company_id`),
  ADD KEY `comp_name` (`company_name`);

--
-- Indexes for table `student_education`
--
ALTER TABLE `student_education`
  ADD PRIMARY KEY (`student_id`,`degree`,`major`);

--
-- Indexes for table `student_experience`
--
ALTER TABLE `student_experience`
  ADD PRIMARY KEY (`student_id`,`company_name`,`start_date`);

--
-- Indexes for table `student_register`
--
ALTER TABLE `student_register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company_register`
--
ALTER TABLE `company_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `event_post`
--
ALTER TABLE `event_post`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `job_post`
--
ALTER TABLE `job_post`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `student_register`
--
ALTER TABLE `student_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applied_jobs`
--
ALTER TABLE `applied_jobs`
  ADD CONSTRAINT `fk_job_id` FOREIGN KEY (`job_id`) REFERENCES `job_post` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_student_id` FOREIGN KEY (`student_id`) REFERENCES `student_register` (`id`);

--
-- Constraints for table `event_post`
--
ALTER TABLE `event_post`
  ADD CONSTRAINT `event_post_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_post`
--
ALTER TABLE `job_post`
  ADD CONSTRAINT `comp_id` FOREIGN KEY (`company_id`) REFERENCES `company_register` (`id`),
  ADD CONSTRAINT `comp_name` FOREIGN KEY (`company_name`) REFERENCES `company_register` (`company_name`);

--
-- Constraints for table `student_education`
--
ALTER TABLE `student_education`
  ADD CONSTRAINT `se_student_id` FOREIGN KEY (`student_id`) REFERENCES `student_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_experience`
--
ALTER TABLE `student_experience`
  ADD CONSTRAINT `sxp_student_id` FOREIGN KEY (`student_id`) REFERENCES `student_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
