DROP DATABASE IF EXISTS employee_info_list_db;

CREATE DATABASE employee_info_list_db;

USE employee_info_list_db;

CREATE TABLE department (
    id INT NOT NULL AUTO-INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO-INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE employee_name (
    id INT NOT NULL AUTO-INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
)