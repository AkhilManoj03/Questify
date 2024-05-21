CREATE TABLE users(
    email_address	VARCHAR(30),
    university		VARCHAR(20),
    first_name		VARCHAR(20),
    last_name		VARCHAR(20),
    pword			VARCHAR(65) NOT NULL,
    phone_number	VARCHAR(10),
    type 			VARCHAR(10) CHECK (type LIKE 'student' OR type LIKE 'employee' OR type LIKE 'admin'),
    PRIMARY KEY (email_address)
);

CREATE TABLE student(
	email_address 	VARCHAR(20),
   	class_year			INT,
    major			VARCHAR(20),
    PRIMARY KEY(email_address),
    FOREIGN KEY(email_address) REFERENCES users(email_address)
);

CREATE TABLE company(
	company_id		INT AUTO_INCREMENT,
    name			VARCHAR(20) NOT NULL,
    about			VARCHAR(60),
	PRIMARY KEY(company_id)
);

CREATE TABLE positions(
	name			VARCHAR(60),
  	company_id		INT AUTO_INCREMENT,
    salary			DECIMAL(10, 2),
    description		VARCHAR(250),
    PRIMARY KEY(name, company_id),
    FOREIGN KEY(company_id) REFERENCES company(company_id)
);

CREATE TABLE employee(
	email_address 	VARCHAR(20),
   	company_id		INT,
    position_name	VARCHAR(60) NOT NULL,
    PRIMARY KEY(email_address),
    FOREIGN KEY(email_address) REFERENCES users(email_address),
    FOREIGN KEY(company_id) REFERENCES positions(company_id),
    FOREIGN KEY(position_name) REFERENCES positions(name)
);

CREATE TABLE process(
	id			INT AUTO_INCREMENT,
    process_text	VARCHAR(60) NOT NULL,
    user_email	VARCHAR(20),
    position_name VARCHAR(60),
    company_id	INT,
    PRIMARY KEY(id),
    FOREIGN KEY(user_email) REFERENCES users(email_address),
    FOREIGN KEY(position_name) REFERENCES positions(name),
    FOREIGN KEY(company_id) REFERENCES positions(company_id)
);

CREATE TABLE question(
	question_id			INT AUTO_INCREMENT,
    question_text		VARCHAR(250),
    tag					VARCHAR(10),
    position_name		VARCHAR(60) NOT NULL,
    company_id			INT NOT NULL,
    PRIMARY KEY(question_id),
    FOREIGN KEY(position_name) REFERENCES positions(name),
    FOREIGN KEY(company_id) REFERENCES positions(company_id)
);

CREATE TABLE users_questions(
	user_email	VARCHAR(20),
    question_id	INT,
    PRIMARY KEY(user_email, question_id),
    FOREIGN KEY (user_email) REFERENCES users(email_address),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
);

CREATE TABLE users_companies(
	user_email	VARCHAR(20),
    company_id	INT,
    FOREIGN KEY (user_email) REFERENCES users(email_address),
    FOREIGN KEY (company_id) REFERENCES company(company_id)
);