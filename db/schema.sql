-- CREATE DATABASE
-- Recreate databases --
DROP DATABASE IF EXISTS employee_info_list_db;
CREATE DATABASE employee_info_list_db;
-- Makes it so all of the following code will affect employee_info_list_db --
USE employee_info_list_db;
-- Creates the table "department" within employee_info_list_db --
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);
-- Creates the table "role" within employee_info_list_db --
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    departments VARCHAR(30) NULL,
    salary DECIMAL(10) NULL,
    PRIMARY KEY (id)
);
-- Creates the table "employee_name" within employee_info_list_db --
CREATE TABLE employee_name (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);
