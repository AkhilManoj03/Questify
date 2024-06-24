-- MySQL dump 10.13  Distrib 8.4.0, for Linux (aarch64)
--
-- Host: localhost    Database: questify
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `company`
--

CREATE DATABASE questify;
use questify;

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `about` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Apple','Think Different'),(2,'Capital One','What\'s In Your Wallet?'),(3,'Google','Do the right thing'),(4,'Meta','Move Fast'),(5,'CoStar','Idk'),(6,'Bank Of America',NULL),(7,'W Company',NULL),(11,'Insert Test','about'),(13,'Markel','Markel Style'),(14,'Tesla',NULL),(16,'Microsoft',NULL);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `email_address` varchar(255) NOT NULL,
  `company_id` int DEFAULT NULL,
  `position_name` varchar(60) NOT NULL,
  PRIMARY KEY (`email_address`),
  KEY `company_id` (`company_id`),
  KEY `position_name` (`position_name`,`company_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`email_address`) REFERENCES `users` (`email_address`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`),
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`position_name`, `company_id`) REFERENCES `positions` (`name`, `company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('jobs@apple.com',1,'CEO'),('testuser@costar.com',5,'Junior Software Engineer'),('hello@user.com',7,'THE GOAT');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions` (
  `name` varchar(60) NOT NULL,
  `company_id` int NOT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`name`,`company_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES ('Admin Assistant Interview',16,NULL,NULL),('Analysis Engineer Interview',14,NULL,NULL),('Analyst Interview',13,NULL,NULL),('Assistant Underwriter Interview',13,NULL,NULL),('Associate Developer Interview',13,NULL,NULL),('Associate Director',6,NULL,NULL),('Associate Research Consultant',5,NULL,NULL),('Business Analyst',2,1000000.00,NULL),('Business Analyst',5,NULL,NULL),('Business Analyst Intern',2,NULL,NULL),('Business Operations Manager',1,NULL,NULL),('CEO',1,1000000.00,'Cheif Executive Officer'),('CEO',7,NULL,NULL),('Controls Engineer Interview',14,NULL,NULL),('Editor',5,NULL,NULL),('Finance Director',4,NULL,NULL),('Finance Manager Interview',16,NULL,NULL),('Governance Technician Interview',13,NULL,NULL),('Graduate Student Interview',16,NULL,NULL),('Intern',1,NULL,NULL),('Intern Interview',14,NULL,NULL),('Internship Interview',16,NULL,NULL),('IT Analyst',1,NULL,NULL),('Junior Software Engineer',5,NULL,NULL),('Law Clerk Interview',13,NULL,NULL),('Lease Coordinator',5,NULL,NULL),('Manager',4,2500000.00,'Manager of sales division'),('Manager, Product Manager',2,NULL,NULL),('Mechanical Engineer Interview',14,NULL,NULL),('Mehcanical Engineering Coop Interview',14,NULL,NULL),('Principal Product Manager Interview',16,NULL,NULL),('Product Manager',2,NULL,NULL),('Product Manager Interview',14,NULL,NULL),('Red Team Operator Interview',14,NULL,NULL),('SBA Underwriter',2,NULL,NULL),('Senior Data Analyst',2,NULL,NULL),('Senior Data Scientist Interview',16,NULL,NULL),('Senior Project Manager Interview',13,NULL,NULL),('Senior Recruiter',5,NULL,NULL),('Senior Software Engineer',2,2500000.00,'Level 3 Software Engineer'),('Senior Software Engineer',5,NULL,NULL),('Senior Software Engineer Interview',16,NULL,NULL),('Social Media Marketing Specialist',5,NULL,NULL),('Software Compatibility Engineer',1,NULL,NULL),('Software Development Engineer (SDE)',1,NULL,NULL),('Software Engineer',1,NULL,NULL),('Software Engineer Intern Interview',16,NULL,NULL),('Software Engineer Interview',16,NULL,NULL),('Software Engineer(Internship) Interview',16,NULL,NULL),('Software Engineering Intern',3,700000.00,'gain hands-on experience and mentorship in software development practices within a professional environment.'),('Software Engineering Intern',5,NULL,NULL),('Specialist',1,NULL,NULL),('Sr. Business Systems Analyst Interview',13,NULL,NULL),('Sr. QA Engineer',5,NULL,NULL),('Sr. Quality Engineer Interview',14,NULL,NULL),('Sr. Seo Specialist',5,NULL,NULL),('Tech Support',1,NULL,NULL),('THE GOAT',7,NULL,NULL),('Underwriter Interview',13,NULL,NULL),('Underwriting Support Assistant Interview',13,NULL,NULL),('Underwriting Trainee Program Interview',13,NULL,NULL),('UX Designer',2,NULL,NULL);
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process`
--

DROP TABLE IF EXISTS `process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `process` (
  `id` int NOT NULL AUTO_INCREMENT,
  `process_text` varchar(1000) NOT NULL,
  `position_name` varchar(60) NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `position_name` (`position_name`,`company_id`),
  CONSTRAINT `process_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`),
  CONSTRAINT `process_ibfk_2` FOREIGN KEY (`position_name`, `company_id`) REFERENCES `positions` (`name`, `company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process`
--

LOCK TABLES `process` WRITE;
/*!40000 ALTER TABLE `process` DISABLE KEYS */;
INSERT INTO `process` VALUES (1,'3 rounds, 1 behavioral, 2 technical','CEO',1),(2,'3 rounds, 1 behavioral, 2 technicals','Senior Software Engineer',2),(3,'2 rounds, 1 behavioral, 1 technical','Manager',4),(4,'2 rounds, 1 behavioral, 1 technical','Software Engineering Intern',5),(9,'First Round was a screening call with the HR. Second round was a code signal coding assessment. After passing the assessment, they have scheduled my POWER DAY. It was a set of 4 interviews. \n1 - System Design\n2 - Coding\n3 - Case Study\n4 - Behavioural','Senior Software Engineer',2),(18,'I absolutely adored my recruiter, who was very attentive and kept me well informed during the process. The initial case rounds were manageable and very much fit the descriptions for what to expect. Unfortunately, the last round I was asked to describe something technically at the same level as a \"technical architect,\" and when I was only able to describe the system design at a high level, the interviewer very visibly shut down, having written me off as a candidate.read more','Product Manager',2),(19,'DO NOT WASTE YOUR TIME! I spent 4 months going through the HR screenings, hiring manger screening, case study, and powerday which I spent 40+ hours preparing for. No one on the powerday was focused or cared. In TWO of them, the people walked away to take care of personal matters. In another, the woman didn\'t even understand the question herself. The whole process was about math problems which is not relevant to my experience as a PM. After months of interviews and 40+ hours of prep work I received an automated rejection email. I asked for feedback twice and got ghosted.read more','Product Manager',2),(20,'First Round was a screening call with the HR. Second round was a code signal coding assessment. After passing the assessment, they have scheduled my POWER DAY. It was a set of 4 interviews. \n1 - System Design\n2 - Coding\n3 - Case Study\n4 - Behavioural','Senior Software Engineer',2),(21,'took an online assessment first and then hr screening, and then take home assessment, the last is 4 round panels. The whole process was exhausting and tiring and time-consuming. Somehow I don\'t like it.','Senior Data Analyst',2),(22,'The interview process is so long. Even if you want to switch to an internal role you have to the same long process. Also, the pay at Capital One is not good.','UX Designer',2),(23,'Submitted application online. Weeks later, got a phone screen with a recruiter where they asked me about my background in Python and SQL and my interest in business analysis. Then case interview.','Business Analyst',2),(24,'Mini case interview (easy)\n1 on 1 with manager (easy)\nPower Day (didn\'t get to it)\n\nCapital One seems like a good company to work for. I would brush up on general PM skills and how to manage teams','Manager, Product Manager',2),(25,'First I was asked to take online assessment.  After that I was told that I passed it,  and the next one is power day interviews which has 4 sessions of interviews in one day.','Senior Software Engineer',2),(26,'First round online case, Second round powerday with 3 interviews-one product, two cases not too difficult but one interviewer was arrogant and was not helpful and resulted in no offer','Business Analyst Intern',2),(27,'- Online test - 11 math problems you need to do in 30 minutes or so\n- 3 Cases - just math problems: first you do one, then you do two - round 1 to round 2\nVery arrogant people. Think they are an MBB but are those who did not get into MBB.','SBA Underwriter',2),(28,'I absolutely adored my recruiter, who was very attentive and kept me well informed during the process. The initial case rounds were manageable and very much fit the descriptions for what to expect. Unfortunately, the last round I was asked to describe something technically at the same level as a \"technical architect,\" and when I was only able to describe the system design at a high level, the interviewer very visibly shut down, having written me off as a candidate.read more','Product Manager',2),(57,'Quick chat with a recruiter, followed by 2 face to face interviews with the hiring team. The interview was made up of questions about Markel, including the Markel style and behavioural competency questions.','Assistant Underwriter Interview',13),(58,'I applied on their website. The person who called gave me almost no information. Was very short but said they wanted to set up an interview. OK did 2 interviews then nothing. Time went by. I assumed There was no interest. about a month later I get a call asking if I\'m still interested. Said yes. They set up 1 more call with  someone else. Then HR called and offered me the job that day.','Sr. Business Systems Analyst Interview',13),(59,'I spoke to a recruiter about 2 weeks after submitting an application. The recruiter did a phone screening asking basic questions about myself. About a week later I had a video interview with two hiring managers. Everyone was extremely friendly and professional.','Underwriting Support Assistant Interview',13),(60,'Simple but a bit long. Be prepared to answer all of the common interview questions. I got no curveballs or crazy questions. It was a very standard interview process overall.','Analyst Interview',13),(61,'It was unfortunately a very poor experience. First interview the person was close to 10min late however this can happen so wasnt too fazed. The second interview was setup for the following week upon which they never showed. They only contacted me at 4pm with an excuse as to why. After my second interview they advised they had two more the following week with other candidates and I would get an answer following this. This once again didnt happen. They postponed those interviews without telling me- I had to chase the recruiter multiple times due to radio silence. It took the company 3 weeks to let me know of the outcome. I left this experience under the impression that they completely forgot me and my interviews due to how long it was between myself and the other applicants being interviewed. Just an unprofessional experience from the get go.','Governance Technician Interview',13),(62,'Screener with HR - First interview (with two stages - talked to one person for around 40 minutes and then two others for another 40 minutes) - Second interview. Both interviews were with more than one person.','Law Clerk Interview',13),(63,'Two interview process with a range of individuals within the region. Extremely professional and pleasant experience, where all the individuals that I had an interview were a pleasure to meet with. They ask some competency based questions but also they want to get to know you as the individual so a good balance.','Underwriter Interview',13),(64,'A couple of interviews where they really want to get to know the person. Culture based which is great. Enjoyed meeting all the different people at the company. You will also get placed into a specific group so do some research on what you might want to do so you can recommend it while the interviews take place. It will make your time easier and make a path for yourself much easier.','Underwriting Trainee Program Interview',13),(65,'Had a 15 minute with recruiter and 30 minutes with hiring manager. All seemed to go well and she told me she\'s going to set up a third interview for me with a couple more folks. Followed up twice over two weeks. They ghosted me. Hate that! Just tell me you\'re moving forward with other candidates so I can take you off of my list!','Senior Project Manager Interview',13),(66,'The first round was conducted via phone with a recruiter and hiring manager. The second round was over a video call with the hiring manager and a small technical overview.','Associate Developer Interview',13),(67,'The interview with Tesla as an intern was an incredibly insightful and positive experience. The interviewers were knowledgeable and passionate about their work, and the questions allowed me to showcase my skills and enthusiasm for the role. I appreciated the opportunity to learn more about Tesla\'s innovative projects and collaborative work environment. Overall, it was a valuable experience, and I am excited about the prospect of contributing to such a dynamic and forward-thinking company.','Intern Interview',14),(68,'firstly with the hiring manager for half an hour, what is your shortcoming? make an example for PFMEA. what are Cpk and Cpk, then was the panel interview including a presentation and interviews for four team members. questions were how to set up inspection points. and some quality questions on a file.','Sr. Quality Engineer Interview',14),(69,'Hard process for anyone just starting out. Would recommend applying elsewhere and avoid the lay offs. Tesla dynamic is rough with Elon present and can be unpredictable when job offers are given','Mechanical Engineer Interview',14),(70,'5 rounds. Everything is online.\nRecruiter phone call.\nControl test: evaluate your technical skills, 3-4 hrs.\nPanel interview with presentation: pick a technical project that you are proud of to present. Then each person will take turn asking you questions including some technical questions and your experience.\nGlobal Manager: a chat to confirm your skill sets.\nEvidence of Excellence letter: a director will read this. 5 evidences from your experience with impacts that you\'ve done.','Controls Engineer Interview',14),(71,'2 rounds, first hiring manager, second a panel round, felt more like a SWE interview round. Not very useful to be honest, confusing panel and very little enthusiasm, very little share prior to the panel about what its actually gonna be.','Product Manager Interview',14),(72,'They expect you to know everything under the sun. You\'ve got to be good with what you\'re doing or else you won\'t make it. 4-5 round interviews are hard to deal with but the team is fantastic','Red Team Operator Interview',14),(73,'4 rounds of interviews on Zoom.  Ask for what projects I have done, and ask for me to show how I solve the challenges. I like the way how HR communicated with me.','Mehcanical Engineering Coop Interview',14),(74,'Five round in total.  First round: hr screening by email, second round : take home exam (1h in total), third round: hr manager, fourth round: engineer in the group, fifth round: panel round','Analysis Engineer Interview',14),(75,'Online meeting with a technical recruiter, talked about relevant work experience and the hiring process. The next step is\nthree online technical interviews, at the same day. Leetcode style interview with 2 questions, system design interview and object oriented programming design interview.','Senior Software Engineer Interview',16),(76,'Applied on the official web portal. Not getting any feedback after the submission for more than two months. Considered it didn\'t pass the CV review. No interview and further email received.','Graduate Student Interview',16),(77,'Microsoft\'s interview process involves application submission, resume screening, phone screens, technical and behavioral interviews, possible on-site interviews, final interviews, and offer negotiation, focusing on technical skills, problem-solving, and cultural fit.','Internship Interview',16),(78,'Easy and smooth. 3 rounds of interviews. First with HR, then with hiring manager and last stage with interview panel of three interviewers. Questions were straight forward and communication with recruiter was great throughout the interview process','Finance Manager Interview',16),(79,'There were about 5 AI MCQs, they were mid-level questions, and 2 problem solving questions which were medium level questions, the time enough to think about the problems. It was great experience.','Software Engineer(Internship) Interview',16),(80,'supposeed to be an interview with hiring manager in Dublin but actually somebody from India office turned up He showed little interes tabout the position  and even got up in the middle of interview and left the room for few seconds!!\nEasy questions: probability and Bayes theorem question\nNN questions','Senior Data Scientist Interview',16),(81,'It was good a interview , didn\'t get it though, shame though I like microwave they are a good company to work for I think, word limit so sorry need to get to 39 words','Software Engineer Interview',16),(82,'7 rounds with 7 different people, the final 4 were 1 hour each back to back. Exhausting but pretty straightforward. worth it tho didnt get offer but good process. Maybe next time','Principal Product Manager Interview',16),(83,'Interviews for this position nowadays seem tailored to the resume. I had an AI interview, as my resume had a lot of AI experience on it. It was two 90 minute interviews (half technical, half behavioral).','Software Engineer Intern Interview',16),(84,'Interview was medium level of difficult and I had to do a lot of preparation. The panel were all very friendly and welcoming and it seemed like a nice company to work for.','Admin Assistant Interview',16);
/*!40000 ALTER TABLE `process` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `question_text` varchar(1000) DEFAULT NULL,
  `tag` varchar(10) DEFAULT NULL,
  `position_name` varchar(60) NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `company_id` (`company_id`),
  KEY `position_name` (`position_name`,`company_id`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`),
  CONSTRAINT `question_ibfk_2` FOREIGN KEY (`position_name`, `company_id`) REFERENCES `positions` (`name`, `company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'Tell me about a time when you had to manage up to get results','behavioral','CEO',1),(2,'What is the difference between an instance and a class','technical','Senior Software Engineer',2),(3,'What are you looking for in an internship?','behavioral','Software Engineering Intern',3),(4,'what is the difference between a heap and a stack?',NULL,'Software Engineering Intern',3),(8,'What do you think of when you think of capital one?',NULL,'Product Manager',2),(9,'Design a credit card system',NULL,'Senior Software Engineer',2),(10,'what is your preference for location',NULL,'Senior Data Analyst',2),(11,'What is your UX process?',NULL,'UX Designer',2),(12,'What are you looking for in this role?',NULL,'Business Analyst',2),(13,'Describe how you handle blockers and impediments?',NULL,'Manager, Product Manager',2),(14,'In case study, I was asked about some business decisions based on the cost analysis.',NULL,'Senior Software Engineer',2),(15,'10 uses for a trash can',NULL,'Business Analyst Intern',2),(16,'You solved breakeven equations. There is no specific question.',NULL,'SBA Underwriter',2),(17,'Describe a product you worked on (follow up: how does your product work, describing at the level of a technical architect)',NULL,'Product Manager',2),(18,'Describe a product you worked on (follow up: how does your product work, describing at the level of a technical architect)',NULL,'Product Manager',2),(19,'Do you work better on a team or independently?',NULL,'Social Media Marketing Specialist',5),(20,'What are some new things you\'ve learned recently?',NULL,'Senior Software Engineer',5),(21,'How quick can you turn around content?',NULL,'Editor',5),(22,'Are you familiar with Homes.com?',NULL,'Sr. Seo Specialist',5),(23,'How would you approach a difficult conversation with a stakeholder?',NULL,'Business Analyst',5),(24,'Signed NDA so cannot tell questions but pretty straight forward if you have SQL knowledge and QA knowledge',NULL,'Sr. QA Engineer',5),(25,'How would you describe your leadership style?',NULL,'Software Engineering Intern',5),(26,'What was your req load in previous roles?',NULL,'Senior Recruiter',5),(27,'Tell me about yourself and why you are interested in working at co star',NULL,'Associate Research Consultant',5),(28,'Please provide an example of how you problem solve?',NULL,'Lease Coordinator',5),(29,'How would you handle a low performing employee?',NULL,'Software Engineer',1),(30,'tell me about yourself and your experience',NULL,'Business Operations Manager',1),(32,'Gave a coding question to solve .',NULL,'Intern',1),(33,'what is your greatest weakness?',NULL,'Software Engineer',1),(34,'gave me overview of the team\nchat about my background',NULL,'Specialist',1),(35,'Tell me a time you went above and beyond for a customer or client',NULL,'Software Compatibility Engineer',1),(36,'How you work under stress',NULL,'Specialist',1),(37,'Tell us about a time you worked well in a teamAnswer Question',NULL,'Assistant Underwriter Interview',13),(38,'tell me about your spreadsheetsAnswer Question',NULL,'Sr. Business Systems Analyst Interview',13),(39,'Tell me about a time you faced a problem and how you overcame it.Answer QuestionWhat do you like to do in your free time?Answer QuestionHow would your friends describe you?Answer Question',NULL,'Underwriting Support Assistant Interview',13),(40,'Tell me about yourself and your background.Answer Question',NULL,'Analyst Interview',13),(41,'They asked around excel experience which held quite a high weight in the decisionAnswer Question',NULL,'Governance Technician Interview',13),(42,'What is your favorite class in law school? Why are you interested in the position? Questions about my experiences at my previous jobs.Answer Question',NULL,'Law Clerk Interview',13),(43,'Give examples in your current role where you have shown an ability to do...Answer Question',NULL,'Underwriter Interview',13),(44,'How would you go about analyzing risk?Answer Question',NULL,'Underwriting Trainee Program Interview',13),(45,'Tell me about your experience with Project ManagementAnswer Question',NULL,'Senior Project Manager Interview',13),(46,'Company history, how to parse information from forms.Answer Question',NULL,'Associate Developer Interview',13),(47,'Can you describe a project where you had to overcome a significant technical challenge? What was your role, and how did you contribute to the solution?\n\nHow do you stay updated on the latest developments in the electric vehicle and renewable energy industries? Can you provide an example of a recent technological advancement that caught your attention?\n\nTesla is known for its focus on innovation. Can you share an idea or project where you demonstrated creativity and out-of-the-box thinking?\n\nIn a fast-paced and dynamic environment like Tesla, how do you prioritize and manage your tasks to meet tight deadlines?\n\nTesla places a strong emphasis on sustainability. How do you incorporate sustainable practices or considerations into your work or projects?\n\nCan you describe a situation where you had to work collaboratively with a diverse team to achieve a common goal? What was your role, and how did you contribute to the team\'s success?Answer Question',NULL,'Intern Interview',14),(48,'introduce yourself and why TeslaAnswer Question',NULL,'Sr. Quality Engineer Interview',14),(49,'Describe a time you solved a technical problem Answer Question',NULL,'Mechanical Engineer Interview',14),(50,'What\'s difference between interlocks and permissives?\nWhat\'s your controls experience?\nWhat\'s project in the past you\'re most proud of?Answer Question',NULL,'Controls Engineer Interview',14),(51,'several engineering concepts and SQL questionsAnswer Question',NULL,'Product Manager Interview',14),(52,'Describe a time that you had to use your red team abilities irl.Answer Question',NULL,'Red Team Operator Interview',14),(53,'What Projects have you done?Answer Question',NULL,'Mehcanical Engineering Coop Interview',14),(54,'What\'s the turbulent? Does navier-stokes equation is parabolic equation?Answer Question',NULL,'Analysis Engineer Interview',14),(55,'Coin change: Find all combinations of coins https://leetcode.com/problems/coin-change-ii/',NULL,'Senior Software Engineer Interview',16),(56,'Didn\'t get the interview yet',NULL,'Graduate Student Interview',16),(57,'How would you optimize a SQL query for performance?',NULL,'Internship Interview',16),(58,'Challenges and many situational questions',NULL,'Finance Manager Interview',16),(59,'99.9% on training set but 99.7% on validation set\noverfitting or underfitting or none?',NULL,'Software Engineer(Internship) Interview',16),(60,'In a time interval of 15-minutes, the probability that you may see a shooting star or a bunch of them is 0.2. What is the percentage chance of you seeing at least one star shooting from the sky if you are under it for about an hour?\n\nSuppose you have a medical test for a rare disease that is 99% accurate. If the disease occurs in 1% of the population, what is the probability that someone who tests positive actually has the disease?',NULL,'Senior Data Scientist Interview',16),(61,'Hey do you like work?',NULL,'Software Engineer Interview',16),(62,'how do you interact with engineering teams',NULL,'Principal Product Manager Interview',16),(63,'Number of Islands (typical DSA questions)',NULL,'Software Engineer Intern Interview',16),(64,'How do you deal with challenges in the workplace?',NULL,'Admin Assistant Interview',16);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `email_address` varchar(255) NOT NULL,
  `class_year` int DEFAULT NULL,
  `major` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`email_address`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`email_address`) REFERENCES `users` (`email_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('example@student.com',2024,'Mechanical Engineer'),('example@teset.cm',2025,'CS'),('manoja2@vcu.edu',2024,'Computer Science'),('patelkp7@vcu.edu',2023,'Computer Science'),('shashank@gmail.com',2025,'Computer Science'),('test@test.test',2025,'Computer Science');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `email_address` varchar(255) NOT NULL,
  `university` varchar(20) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `pword` varchar(65) NOT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`email_address`),
  CONSTRAINT `users_chk_1` CHECK ((`type` in (_latin1'student',_latin1'employee',_latin1'admin')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin@questify.com','VCU','Admin','Ad min','$2b$12$7AyuVzOfO4pBA8Jg.nR1xurAZidSJNcNV1mwSJDAgGmkktULIO.WG','1234231857','admin'),('example@student.com','Example University','John','Doe','$2b$12$tJJEAXKrIqmgAH7iE8pMwuDll5z8o8PxhM2bsG2JNpM8X0oAINY66','1234567890','student'),('example@teset.cm','VCU','Shashank','Sinha','$2b$12$XXRoxrb5WTKwrX2QAcHrSunJFIpoG1eNRpywIWAw3c1sgc6x83rbq','8382938490','student'),('hello@user.com','VCU','hello','user','$2b$12$2cjsPvi7Y0i6uMTs7nm/Nu1DxZugSpTRyBiTRqSdHwS0FC29Ut8RW','1111111111','employee'),('jobs@apple.com','Reed','Steve','Jobs','$2b$12$WAvScviM78L1YKZmPETr8.USMiI.qHPdQv6cNV22GD4dN3ab1KYr6','7572712877','employee'),('manoja2@vcu.edu','GMU','update','user','$2b$12$WAvScviM78L1YKZmPETr8.USMiI.qHPdQv6cNV22GD4dN3ab1KYr6','9999999999','student'),('news@user.com','VCU','new','user','$2b$12$3wFFYSMiQZnJWD7GB6p.mOElgyEnchw6Cukv7Xns8yFGY6Lth6RJe','123456789','student'),('patelkp7@vcu.edu','VCU','krish','patel','$2b$12$Fcz4GJlENIDYpuR3/i9IrOPkQ84E.T5awYQSkMIUeEgdSGgq5yczW','7573868642','student'),('shashank.wmr@gmail.com','VCU','Shashank','Sinha','$2b$12$UiB7/YOfc2uFqTzBtblRzeZP0gVzUzflWYpQGn.joNp7qsmYtcgiy','7572712877','student'),('shashank@gmail.com','VCU','Shashank','Sinha','$2b$12$8i7dZT7h5/R2rW.erxxPweNdEdAUyVCtOmB5wH5n3f61Nfh45W2L6','7572712877','student'),('sinhas6@vcu.edu','VCU','Shashank','Sinha','$2b$12$WAvScviM78L1YKZmPETr8.USMiI.qHPdQv6cNV22GD4dN3ab1KYr6','7572712877','student'),('test@test.test','test','test','test','$2b$12$9iXCpv5iEjwtbQh8Djuh6.zvvC/o6kNxJTDlczKX3cSnDBp.Gc7NS','1111111111','student'),('testuser@costar.com','ECPI','User','Test','$2b$12$7Cep1q1flJeJpCmgEyT2/uioobGYeHWinW/X/i46GALxyPwGgp35K','4444444444','employee'),('user2@example.com','GMU','Jane','Smith','$2b$12$WAvScviM78L1YKZmPETr8.USMiI.qHPdQv6cNV22GD4dN3ab1KYr6','9876543210','employee');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_companies`
--

DROP TABLE IF EXISTS `users_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_companies` (
  `user_email` varchar(255) NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`user_email`,`company_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `users_companies_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email_address`),
  CONSTRAINT `users_companies_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_companies`
--

LOCK TABLES `users_companies` WRITE;
/*!40000 ALTER TABLE `users_companies` DISABLE KEYS */;
INSERT INTO `users_companies` VALUES ('jobs@apple.com',1),('sinhas6@vcu.edu',2),('manoja2@vcu.edu',4);
/*!40000 ALTER TABLE `users_companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_questions`
--

DROP TABLE IF EXISTS `users_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_questions` (
  `user_email` varchar(255) NOT NULL,
  `question_id` int NOT NULL,
  PRIMARY KEY (`user_email`,`question_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `users_questions_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email_address`),
  CONSTRAINT `users_questions_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_questions`
--

LOCK TABLES `users_questions` WRITE;
/*!40000 ALTER TABLE `users_questions` DISABLE KEYS */;
INSERT INTO `users_questions` VALUES ('manoja2@vcu.edu',1),('manoja2@vcu.edu',3);
/*!40000 ALTER TABLE `users_questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-23  3:57:13
