DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department
(
  id INT NOT NULL
  AUTO_INCREMENT,
name VARCHAR
  (30) NOT NULL,
PRIMARY KEY
  (id)
);

  CREATE TABLE role
  (
    id INT NOT NULL
    AUTO_INCREMENT,
title VARCHAR
    (30) NOT NULL,
salary DECIMAL
    (10,2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY
    (id)
);

    CREATE TABLE employee
    (
      id INT NOT NULL
      AUTO_INCREMENT,
first_name VARCHAR
      (30) NOT NULL,
last_name VARCHAR
      (30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY
      (id)
);