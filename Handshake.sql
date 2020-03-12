-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: handshake-lab1.cnqe9jbjlpxc.us-east-2.rds.amazonaws.com    Database: handshake
-- ------------------------------------------------------
-- Server version	5.7.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applied_jobs`
--

DROP TABLE IF EXISTS `applied_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applied_jobs` (
  `student_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `date_applied` date NOT NULL,
  `app_status` varchar(15) DEFAULT NULL,
  `resume_file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_id`,`job_id`),
  KEY `fk_job_id` (`job_id`),
  CONSTRAINT `fk_job_id` FOREIGN KEY (`job_id`) REFERENCES `job_post` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_student_id` FOREIGN KEY (`student_id`) REFERENCES `student_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applied_jobs`
--

LOCK TABLES `applied_jobs` WRITE;
/*!40000 ALTER TABLE `applied_jobs` DISABLE KEYS */;
INSERT INTO `applied_jobs` VALUES (1,6,'2020-03-04','Approved',NULL),(1,16,'0000-00-00','Pending','Resume_ShivangiNagpal-1583957607991.pdf'),(1,17,'0000-00-00','Pending','Resume_ShivangiNagpal-1583957584124.pdf');
/*!40000 ALTER TABLE `applied_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_register`
--

DROP TABLE IF EXISTS `company_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_register` (
  `company_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` mediumtext,
  `contact_info` varchar(45) DEFAULT NULL,
  `profile_pic` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `uni_comp_name` (`company_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_register`
--

LOCK TABLES `company_register` WRITE;
/*!40000 ALTER TABLE `company_register` DISABLE KEYS */;
INSERT INTO `company_register` VALUES ('Google','v.manchanda3@google.com','8cb2237d0679ca88db6464eac60da96345513964','San Jose',1,'We are the best to work for!','213-880-8405','file-1583880235054.jpeg'),('Ciena','shivangi.nagpal@ciena.com','8cb2237d0679ca88db6464eac60da96345513964','Gurgaon',2,NULL,NULL,NULL),('Apple','sulay.shah@apple.com','8cb2237d0679ca88db6464eac60da96345513964','Santa Clara',6,NULL,NULL,NULL);
/*!40000 ALTER TABLE `company_register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_post`
--

DROP TABLE IF EXISTS `event_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_post` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date_of_event` date NOT NULL,
  `event_description` varchar(255) NOT NULL,
  `time` time DEFAULT NULL,
  `eligibility` varchar(255) NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `event_post_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_post`
--

LOCK TABLES `event_post` WRITE;
/*!40000 ALTER TABLE `event_post` DISABLE KEYS */;
INSERT INTO `event_post` VALUES (5,1,'Meet and Greet','Ball Room, Student Union','2020-03-15','Meet and greet with budding engineers','14:00:00','Graduate courses: CMPE, CS only'),(6,1,'Meet and Greet','Ball Room, Student Union','2020-03-15','Meet and greet with budding engineers','14:00:00','UnderGrad courses: CMPE, CS only'),(7,1,'Coding Prep','BBC 423','2020-03-20','Learn to code in JS','14:00:00','Undergrad students'),(8,1,'Coding Prep','San Jose','2020-05-06','Learn to code in JS','13:00:00','Undergrad students'),(9,1,'Online Coding Challange','Home','2020-03-12','Screening Round','17:00:00','Software Engineering'),(18,6,'Python workshop','Eng - 337','0000-00-00','Learning python basics','02:00:00','Computer Engineering');
/*!40000 ALTER TABLE `event_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_registered`
--

DROP TABLE IF EXISTS `events_registered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events_registered` (
  `registration_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `register_status` varchar(45) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`registration_id`),
  KEY `fk_event_student_id` (`student_id`),
  CONSTRAINT `fk_event_student_id` FOREIGN KEY (`student_id`) REFERENCES `student_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_registered`
--

LOCK TABLES `events_registered` WRITE;
/*!40000 ALTER TABLE `events_registered` DISABLE KEYS */;
INSERT INTO `events_registered` VALUES (9,1,'Registered',8),(10,1,'Registered',5),(11,1,'Registered',6),(13,1,'Registered',9);
/*!40000 ALTER TABLE `events_registered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_post`
--

DROP TABLE IF EXISTS `job_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_post` (
  `job_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_title` varchar(255) NOT NULL,
  `posting_date` date NOT NULL,
  `app_deadline` date NOT NULL,
  `location` varchar(45) NOT NULL,
  `salary` varchar(15) NOT NULL,
  `job_description` text NOT NULL,
  `job_category` enum('Full Time','Part Time','Intern','On Campus') NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `comp_id` (`company_id`),
  KEY `comp_name` (`company_name`),
  CONSTRAINT `comp_id` FOREIGN KEY (`company_id`) REFERENCES `company_register` (`id`),
  CONSTRAINT `comp_name` FOREIGN KEY (`company_name`) REFERENCES `company_register` (`company_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_post`
--

LOCK TABLES `job_post` WRITE;
/*!40000 ALTER TABLE `job_post` DISABLE KEYS */;
INSERT INTO `job_post` VALUES (6,'Software Intern','2020-03-04','2020-03-31','San Jose','30$ per hr','backend development','Intern',1,'Google'),(7,'Software Intern','2020-03-04','2020-03-31','San Jose','30$ per hr','frontend development','Intern',1,'Google'),(8,'Software Developer','2020-03-04','2020-04-30','San Jose','100,000-150,000','Layer 2 protocol development','Full Time',2,'Google'),(12,'QA Intern','2020-03-04','2020-03-04','San Jose','30$ per hr','backend Testing','Intern',1,'Google'),(13,'QA Intern','2020-03-04','2020-03-04','San Jose','30$ per hr','backend Testing','Intern',1,'Google'),(14,'QA Intern','2020-03-04','2020-03-04','San Jose','30$ per hr','backend Testing','Intern',1,'Google'),(15,'QA Intern','2020-03-06','2020-03-31','San Jose','40$ per hr','frontend development','Intern',1,'Google'),(16,'Software Developer 3','2020-03-09','2020-05-31','Mountain View','150,000-200,000','Full Stack Deveopment','Full Time',1,'Google'),(17,'Software Intern','2020-03-11','2020-04-30','India','40$ per hr','frontend development','Intern',1,'Google');
/*!40000 ALTER TABLE `job_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_education`
--

DROP TABLE IF EXISTS `student_education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_education` (
  `student_id` int(11) NOT NULL,
  `college_name` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `degree` varchar(45) NOT NULL,
  `major` varchar(45) NOT NULL,
  `cgpa` varchar(45) DEFAULT NULL,
  `year_passing` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`student_id`,`degree`,`major`),
  CONSTRAINT `se_student_id` FOREIGN KEY (`student_id`) REFERENCES `student_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_education`
--

LOCK TABLES `student_education` WRITE;
/*!40000 ALTER TABLE `student_education` DISABLE KEYS */;
INSERT INTO `student_education` VALUES (1,'DAVIET','India','Btech','EE','8.4',2011),(1,'Thapar university','India','ME','EIC','9.9',2013);
/*!40000 ALTER TABLE `student_education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_experience`
--

DROP TABLE IF EXISTS `student_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_experience` (
  `student_id` int(11) NOT NULL,
  `company_name` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `start_date` varchar(45) NOT NULL,
  `end_date` varchar(45) DEFAULT NULL,
  `work_desc` longtext,
  PRIMARY KEY (`student_id`,`company_name`,`start_date`),
  CONSTRAINT `sxp_student_id` FOREIGN KEY (`student_id`) REFERENCES `student_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_experience`
--

LOCK TABLES `student_experience` WRITE;
/*!40000 ALTER TABLE `student_experience` DISABLE KEYS */;
INSERT INTO `student_experience` VALUES (1,'Ciena','Software Engineer','India','2016-20-04','2017-01-11','cli');
/*!40000 ALTER TABLE `student_experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_register`
--

DROP TABLE IF EXISTS `student_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_register` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `school` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `dob` date DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `career_obj` text,
  `profile_pic` varchar(100) DEFAULT NULL,
  `phone_num` varchar(15) DEFAULT NULL,
  `skill_set` varchar(255) DEFAULT NULL,
  `major` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_register`
--

LOCK TABLES `student_register` WRITE;
/*!40000 ALTER TABLE `student_register` DISABLE KEYS */;
INSERT INTO `student_register` VALUES (1,'shivangi.nagpal@sjsu.edu','Shivangi','Nagpal','SJSU','8cb2237d0679ca88db6464eac60da96345513964','1989-12-02','San Jose','California','United States','To get an internship','file-1584043595793.jpeg','6692269561','C, C++, Javascript, NodeJs','Software Engineering');
/*!40000 ALTER TABLE `student_register` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-12 16:44:46
