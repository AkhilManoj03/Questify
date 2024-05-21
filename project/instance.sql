INSERT INTO users (email_address, university, first_name, last_name, pword, phone_number, type)
VALUES ('user1@example.com', 'UVA', 'John', 'Doe', '$2b$12$WAvScviM78L1YKZmPETr8.USMiI.qHPdQv6cNV22GD4dN3ab1KYr6', '1234567890', 'student'),
       ('user2@example.com', 'GMU', 'Jane', 'Smith', '$2b$12$WAvScviM78L1YKZmPETr8.USMiI.qHPdQv6cNV22GD4dN3ab1KYr6', '9876543210', 'employee'),
       ('manoja2@vcu.edu', 'VCU', 'Akhil', 'Manoj', '$2b$12$WAvScviM78L1YKZmPETr8.USMiI.qHPdQv6cNV22GD4dN3ab1KYr6', '8043098888', 'student'),
       ('sinhas6@vcu.edu', 'VCU', 'Shashank', 'Sinha', '$2b$12$WAvScviM78L1YKZmPETr8.USMiI.qHPdQv6cNV22GD4dN3ab1KYr6', '7572712877', 'student'),
       ('jobs@apple.com', 'Reed', 'Steve', 'Jobs', '$2b$12$WAvScviM78L1YKZmPETr8.USMiI.qHPdQv6cNV22GD4dN3ab1KYr6', '7572712877', 'employee'),
       ('admin@questify.com', 'Admin', 'Admin', 'Acct', '$2b$12$iC1gHZ2Rl5SVqr9/WU4KjOGqqsmhev1pEAjVnjxLAbYfV5dCNEbHa', '7572712877', 'admin');

INSERT INTO student (email_address, class_year, major)
VALUES ('user1@example.com', 2024, 'Biology'),
       ('manoja2@vcu.edu', 2025, 'Computer Science'),
       ('sinhas6@vcu.edu', 2025, 'Computer Science');
       
INSERT INTO company (company_id, name, about)
VALUES (1, 'Apple', 'Think Different'),
       (2, 'Capital One', "What's In Your Wallet?"),
       (3, 'Google', "Do the right thing"),
       (4, 'Meta', "Move Fast");

INSERT INTO positions (name, company_id, salary, description)
VALUES ('CEO', 1, 1000000.00, 'Cheif Executive Officer'),
       ('Senior Software Engineer', 2, 2500000.00, 'Level 3 Software Engineer'),
       ('Software Engineering Intern', 3, 700000.00, 'gain hands-on experience and mentorship in software development practices within a professional environment.'),
       ('Manager', 4, 2500000.00, 'Manager of sales division');
       
INSERT INTO employee (email_address, company_id, position_name)
VALUES ('user2@example.com', 2, 'Senior Software Engineer'),
	   ('jobs@apple.com', 1, 'CEO');  

INSERT INTO process (process_text, user_email, position_name, company_id)
VALUES ('5 rounds, 1 phone screen, 3 technicals, 1 final pannel', 'jobs@apple.com', 'CEO' , 1),
       ('3 rounds, 1 behavioral, 2 technicals', 'user2@example.com', 'Senior Software Engineer', 2),
       ('2 rounds, 1 behavioral, 1 technical', 'manoja2@vcu.edu', 'Manager', 4);

INSERT INTO question (question_id, question_text, tag, position_name, company_id)
VALUES (1, 'Tell me about a time when you had to manage up to get results', 'behavioral', 'CEO', 1),
       (2, 'What is the difference between an instance and a class', 'technical', 'Senior Software Engineer', 2),
       (3, 'What are you looking for in an internship?', 'behavioral', 'Software Engineering Intern', 3);

INSERT INTO users_questions (user_email, question_id)
VALUES ('manoja2@vcu.edu', 1),
	('manoja2@vcu.edu', 3),
       ('sinhas6@vcu.edu', 3),
       ('user2@example.com', 2);

INSERT INTO users_companies (user_email, company_id)
VALUES ('manoja2@vcu.edu', 4),
       ('sinhas6@vcu.edu', 2),
       ('user2@example.com', 3),
       ('jobs@apple.com', 1);