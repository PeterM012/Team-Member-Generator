# Team-Member-Generator

## Video Link
https://drive.google.com/file/d/1gQC_OLGYm_IM7doH9ZIRyUI3XkHSEBOh/view

## Technologies Used
- JS - Used to create functions needed to communicate with SQL
- SQL - to create databases and tables

## To Do
Command-line application that accepts user input application
Presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee role
Choose to view all departments presented with a formatted table showing department names and department ids choose to view all roles
Presented with the job title, role id, the department that role belongs to, and the salary for that role choose to view all employees
Presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to choose to add a department
Prompted to enter the name of the department and that department is added to the database choose to add a role
Prompted to enter the name, salary, and department for the role and that role is added to the database choose to add an employee
Prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database choose to update an employee role
Prompted to select an employee to update and their new role and this information is updated in the database 

## Summary 
This project was to create a team generating application using SQL. To begin this task I had to spend some time reading different articles such as how to install MySQL workbench and how create tables and seeds. After reviewing the material for SQL i was going to need to node.js to create prompts for user input. I then needed to require the database information and input new user. During my research I discovered how to use the .query method to call on the seeds db. I felt the most challenging task to overcome for this task was understanding how to have mySQL and JS communicate with one another. Something that I took away from this was how you can se the async and await functions. I feel at the end of this I have achieved a better understanding of my SQL and databases. Below is my code for the function that excutes the the notes being entered and saved and deleted.

## Code Snippet
JS
```js
async function updateCurrentEmployee() {
    let array = [];
    let [rows] = await connection.promise().query("SELECT * from employee_name");
    
    for(const i of rows) {
        array.push({
            name: i.first_name + " " + i.last_name,
            value: i.id
        });
    }
    
    let array2 = [];
    let [rows2] = await connection.promise().query("SELECT * from role");
    
    for(const i of rows2) {
        array2.push({
            name: i.title,
            value: i.id
        });
    }


```
