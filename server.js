const mysql2 = require('mysql2');
const cTable = require("console.table");
const inquirer = require("inquirer");
const express = require('express');

const connection = mysql2.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "password",
    database: "employee_info_list_db"
});

connection.connect(function(err){
    if(err) throw err;
    employeeStart();
});


employeeStart = () => {
    inquirer
    .prompt({
     type: "list",
     choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update employee Role",
        "End"
     ],
     message: "Please choose from one of the following: ",
     name: "suggestion"
    })

.then(function(outcome){
    switch(outcome.suggestion){
        case"Add Department":
        addDepartment();
        break;


    }
})
}

addDepartment = () => {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "dName"
    }).then(function(answer){
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.dName], function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart()
        });
    });
}

addRole = () => {
    inquirer.prompt([
    {
        type: "input",
        message: "What is the role that will be assigned?",
        name: "roleType"
    },
    {
        type: "input",
        message: "What is the yearly Salary?",
        name: "yearlySalary"
    },
    {
        type: "input",
        message: "What department does the role belong to?",
        name: "dID"
    }
    ]).then(function(answer){
        connection.query("INSERT INTO role (title,salary,department_id) VALUES (?,?,?)", [answer.roleType, answer.yearlySalary, answer.dID,], function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart()
        });
    });
}

addEmployee = () => {
    inquirer.prompt([
    {
        type: "input",
        message: "What is the employees first name?",
        name: "firstName"
    },
    {
        type: "input",
        message: "What is the employees last name?",
        name: "lastName"
    },
    {
        type: "input",
        message: "What is the new employee's role?",
        name: "newRole"
    },
    {
        type: "input",
        message: "Who is the employee's manager?",
        name: "deptManager"
    }
    ]).then(function(answer){
        connection.query("INSERT INTO employee_name (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.firstName, answer.lastName, answer.newRole, answer.deptManager,], function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart()
        });
    });
}

updateCurrentEmployee = () => {
    inquirer.prompt([
    {
        type: "input",
        message: "Which employee would you like to update?",
        name: "updateEmployee"
    },
    {
        type: "input",
        message: "What role would you like to update?",
        name: "updateRole"
    }
    ]).then(function(answer){
        connection.query("UPDATE employee SET role_id=?" [answer.updateEmployee, answer.updateRole], function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart()
        });
    });
}

viewDepartment = () => {

    connection.query("UPDATE employee SET role_id=?" [answer.updateEmployee, answer.updateRole], function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart();
        });
}

viewRoles = () => {
    
    connection.query("UPDATE employee SET role_id=?" [answer.updateEmployee, answer.updateRole], function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart();
        });
}

viewEmployees = () => {
    
    connection.query("UPDATE employee SET role_id=?" [answer.updateEmployee, answer.updateRole], function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart();
        });
}

quit = () => {
    connection.end
    process.exit();
}