-- Insert multiple department items --
INSERT INTO department (name)
VALUES ("Receptionist"), ("Office Manager"), ("Data-Entry"), ("Marketing"), ("Human Resource");
-- Insert multiple role items --
INSERT INTO role (title,departments,salary)
VALUES ("Front Office Receptionist", "Receptionist", 30000), ("Lead Technician", "Office Manager", 80000), ("Accountant", "Data-Entry", 60000), ("Coordinator", "Marketing", 45000), ("Recruiter", "Human Resource", 50000);
-- Insert multiple employee_name items --
INSERT INTO employee_name (first_name, last_name, role_id, manager_name)
VALUES ("Barry", "Allen", 1, "Henry Allen"), ("Clark", "Kent", 2, "Martha Kent"), ("Bruce", "Wayne", 3, "Martha Wayne"), ("Lex", "Luthor", 4, "Lionel Luthor"), ("Wade", "Wilson", 5, "Charles Henry Wilson");