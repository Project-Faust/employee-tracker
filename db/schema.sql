DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;
USE employee_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    employee_role_id INTEGER NOT NULL,
    FOREIGN KEY (employee_role_id) REFERENCES employee_role_id(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);