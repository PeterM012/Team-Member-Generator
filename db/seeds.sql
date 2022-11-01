INSERT INTO department (name)
VALUES ("Receptionist"), ("Office Manager"), ("Data-Entry"), ("Marketing"), ("Human Resource");

INSERT INTO role (title,salary,department_id)
VALUES ("Front Office Receptionist", 30000, 3), ("Lead Technician", 80000, 2), ("Accountant", 60000, 4 ), ("Coordinator", 45000, 1), ("Recruiter", 50000, 5);

INSERT INTO employee_name (first_name, last_name, role_id, manager_id)
VALUES ("Barry", "Allen", 1, 2), ("Clark", "Kent", 2, 3), ("Bruce", "Wayne", 3, 2), ("Lex", "Luthor", 4, 1), ("Wade", "Wilson", 5, 3);