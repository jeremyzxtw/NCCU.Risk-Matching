-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: tutorial
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `plan_info`
--

DROP TABLE IF EXISTS `plan_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_info` (
  `plan_name` varchar(255) NOT NULL,
  `plan_create_hash` varchar(255) DEFAULT NULL,
  `plan_start` varchar(45) DEFAULT NULL,
  `plan_end` varchar(45) DEFAULT NULL,
  `plan_initiater_address` varchar(255) DEFAULT NULL,
  `plan_price` int DEFAULT NULL,
  `plan_type` varchar(45) DEFAULT NULL,
  `plan_howbreak` varchar(45) DEFAULT NULL,
  `plan_joiner_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`plan_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_info`
--

LOCK TABLES `plan_info` WRITE;
/*!40000 ALTER TABLE `plan_info` DISABLE KEYS */;
INSERT INTO `plan_info` VALUES ('qweq','0x5311f68386936790ca51f347adcce506d843a866fdb7dd82d31aa3142464ade1','2020-08-02','2020-08-26','0x76331d3f11113B4f140Af976142c852F50A1D71b',500000,'electronic','human',NULL),('test','0x75c2854f2cc0dd289375770f2c0acdf8ceda27ee48b483b557e5c2c1aaeafa84','2020-08-06','2020-09-01','0x76331d3f11113B4f140Af976142c852F50A1D71b',100,'electronic','human',NULL),('test1','0x975e4ff69b916a2d7eb51f03e6916080234eec3b30daf07facbd2e1840940d8a','','','0x76331d3f11113B4f140Af976142c852F50A1D71b',100,'electronic','human',NULL),('test11','0x430581bd45dba782bf1fb48edfa6ff6cbcefa2be3df671029b56213a56b0333d','2020-08-13','2020-08-24','0x76331d3f11113B4f140Af976142c852F50A1D71b',10000000,'electronic','natural',NULL);
/*!40000 ALTER TABLE `plan_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-26  1:42:32
