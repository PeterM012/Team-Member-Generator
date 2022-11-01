const mysql2 = require('mysql2');
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_info_list_db"
},
console.log(`Connected to the database.`));

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
        "Exit"
     ],
     message: "Please choose from one of the following: ",
     name: "suggestion"
    })

.then(function(outcome){
    switch(outcome.suggestion){
        case"Add Department":
        addDepartment();
        break;
        case"Add Role":
        addRole();
        break;
        case"Add Employee":
        addEmployee();
        break;
        case"View Departments":
        viewDepartment();
        break;
        case"View Roles":
        viewRoles();
        break;
        case"View Employees":
        viewEmployees ();
        break;
        case"Update Employees":
        viewEmployees ();
        break;
    }
  });
}

addDepartment = () => {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "dName"
    }).then(function(answer){
        connection.query("INSERT INTO department (name) VALUES (?)", answer.dName, function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart()
        });
    });
}

addRole = () => {
    let array = [];
    connection.query("SELECT name from department", function(err, res){
        for(const i of res) {
            array.push(i.name);
        }
    });

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
      
        type: "list",
        choices: array,
        message: "What department does this role belong to?",
        name: "dID"
    }
    ]).then(function(answer){
        connection.query("INSERT INTO role (title,departments,salary) VALUES (?,?,?)", [answer.roleType, answer.dID, answer.yearlySalary,], function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart()
        });
    });
}

addEmployee = () => {
    let array = [];
    connection.query("SELECT title from role", function(err, res){
        for(const i of res) {
            array.push(i.title);
        }
    });

    let array2 = [];
    connection.query("SELECT manager_name from employee_name", function(err, res){
        for(const i of res) {
            array2.push(i.manager_name);
        }
    });

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
        type: "list",
        choices: array,
        message: "What is the new employee's role?",
        name: "newRole"
    },
    {
        type: "list",
        choices: array2,
        message: "Who is the employee's manager name?",
        name: "deptManager"
    }
    ]).then(function(answer){
        connection.query("INSERT INTO employee_name (first_name, last_name, role_id, manager_name) VALUES (?,?,?,?)", [answer.firstName, answer.lastName, answer.newRole, answer.deptManager,], function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart()
        });
    });
}

updateCurrentEmployee = () => {
    inquirer.prompt([
    {
        type: "list",
        message: "Which employee would you like to update?",
        name: "updateEmployee"
    },
    {
        type: "list",
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
let query = "SELECT * from department"
    connection.query(query, function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart();
        });
}

viewRoles = () => {
let query = "SELECT * from role"
    connection.query(query, function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart();
        });
}

viewEmployees = () => {
let query = "SELECT * from employee_name"    
    connection.query(query, function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart();
        });
}

quit = () => {
    connection.end
    process.exit();
}