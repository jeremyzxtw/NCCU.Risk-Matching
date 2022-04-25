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
-- Table structure for table `joiner_info`
--

DROP TABLE IF EXISTS `joiner_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `joiner_info` (
  `joiner_address` varchar(255) DEFAULT NULL,
  `join_planname` varchar(45) DEFAULT NULL,
  `com_buydate` varchar(45) DEFAULT NULL,
  `com_price` varchar(45) DEFAULT NULL,
  `com_name` varchar(45) DEFAULT NULL,
  `com_sernum` varchar(45) NOT NULL,
  `join_hash` varchar(255) DEFAULT NULL,
  `com_insurability` varchar(45) DEFAULT NULL,
  `repair_result` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`com_sernum`),
  UNIQUE KEY `com_sernum_UNIQUE` (`com_sernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joiner_info`
--

LOCK TABLES `joiner_info` WRITE;
/*!40000 ALTER TABLE `joiner_info` DISABLE KEYS */;
INSERT INTO `joiner_info` VALUES ('0xCf3892087b9A007930C199EA0cAdc62418161fB5','test','2020-08-04','100','asda','2312312312','0xdfa82d8d9017c317f0d4154f8b248b2bcc668e5b2003c0963df501815eb167e9','Yes','Yes'),('0xCf3892087b9A007930C199EA0cAdc62418161fB5','test','2020-08-21','10000','23123','dfsdf454','0xd601c671b8be24c1382eecc226041a92639f7a48b7a5050dfaafcd9df9d3d1b3','Yes','1'),('0xCf3892087b9A007930C199EA0cAdc62418161fB5','test','2020-08-05','100','car','qaz123124','0x6ccbe6f19c52161397fbe0aeddc1f51767c510addb4e5f494f3d4c878e7d03e1','Yes',NULL),('0xCf3892087b9A007930C199EA0cAdc62418161fB5','test','2020-08-26','1000','車','zxc12345','0xec0bd3f6f398f5c9849e774a4de943fc881abeb0ab8c99f8472fa4b624998c80','Yes','1'),('0x12d87a35cde96a477074dfe07288756e9751129a','test123','2020-09-07','500','fruit','zxc123456','xfgdfgdfg65678676','No','Yes'),('0xCf3892087b9A007930C199EA0cAdc62418161fB5','test','2020-09-02','1000','123','zxc1234564','0x8577ac00c19fe733ea991d02a43d951305a5a8717675f61fa93d80272e1f0367',NULL,NULL),('0xCf3892087b9A007930C199EA0cAdc62418161fB5','test','2020-08-14','99','food','zxcqwe123','0x59ee1883ace5181da6d45e93c105157ae2694553b94c127f7e762335b43be2ba','Yes',NULL);
/*!40000 ALTER TABLE `joiner_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-26  1:42:31
