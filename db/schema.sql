DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

-- Create the table tasks.
CREATE TABLE department
(
  id int NOT NULL
  AUTO_INCREMENT,
  name varchar
  (30) NOT NULL,
  PRIMARY KEY
  (id)
);

  CREATE TABLE role
  (
    id INTEGER NOT NULL
    AUTO_INCREMENT,
    title VARCHAR
    (30) NOT NULL,
    salary DECIMAL NOT NULL,
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
