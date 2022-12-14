// Dependencies
const mysql2 = require('mysql2');
const cTable = require("console.table");
const inquirer = require("inquirer");

// Connect to database
const connection = mysql2.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password",
    database: "employee_info_list_db"
},
console.log(`Connected to the database.`));

connection.connect(function(err){
    if(err) throw err;
    employeeStart();
});

//Prompts ask in the terminal
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

// used a switch case to call on the function needed when choice was selected/entered    
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
        case"Update employee Role":
        updateCurrentEmployee();
        break;
        case"Exit":
        quit();
    }
  });
}
//adds new department to the database
addDepartment = () => {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "dName"
    }).then(function(answer){
        connection.query("INSERT INTO department (name) VALUES (?)", answer.dName, function(err,res){
            if (err) throw err;
            console.log("added to database")
            employeeStart()
        });
    });
}
//adds new role to the database
addRole = () => {
    let array = [];
    connection.query("SELECT name from department", function(err, res){
        //Loop adds one or more elements to the end of an array and returns the new length of the array.
        for(const i of res) {
            array.push(i.name);
        }
    });

//Prompts ask in the terminal
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
            console.log("Added " + answer.roleType + " added to database")
            employeeStart()
        });
    });
}

//adds new employee to the database
addEmployee = () => {
    let array = [];
    connection.query("SELECT * from role", function(err, res){
        //Loop adds one or more elements to the end of an array and returns the new length of the array.
        for(const i of res) {
            array.push({
                name: i.title,
                value: i.id
            });
        }
    });

    let array2 = [];
    connection.query("SELECT manager_name from employee_name", function(err, res){
        for(const i of res) {
            array2.push(i.manager_name);
        }
    });
//Prompts ask in the terminal
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
            console.log("Added " + answer.firstName + answer.lastName + " added to database")
            employeeStart()
        });
    });
}

async function updateCurrentEmployee() {
    let array = [];
    // Query database
    let [rows] = await connection.promise().query("SELECT * from employee_name");
    
    for(const i of rows) {
        array.push({
            name: i.first_name + " " + i.last_name,
            value: i.id
        });
    }
    
    let array2 = [];
    // Query database
    let [rows2] = await connection.promise().query("SELECT * from role");
    
    for(const i of rows2) {
        array2.push({
            name: i.title,
            value: i.id
        });
    }
//Prompts ask in the terminal
    inquirer.prompt([
    {
        type: "list",
        choices: array,
        message: "Which employee would you like to update?",
        name: "updateEmployee"
    },
    {
        type: "list",
        choices: array2,
        message: "What role would you like to update?",
        name: "updateRole"
    }
    ]).then(function(answer){
        // Query database
        connection.query("UPDATE employee_name SET role_id = ? WHERE employee_name.id = ?", [answer.updateRole, answer.updateEmployee], function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart()
        });
    });
}

viewDepartment = () => {
    // Query database
let query = "SELECT * from department"
    connection.query(query, function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart();
        });
}

viewRoles = () => {
    // Query database
let query = "SELECT * from role"
    connection.query(query, function(err,res){
            if (err) throw err;
            console.table(res)
            employeeStart();
        });
}

viewEmployees = () => {
    // Query database
let query = "SELECT * from employee_name JOIN role ON employee_name.role_id = role.id"     
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