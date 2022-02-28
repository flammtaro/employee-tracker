-- Creates the seeds for departments
INSERT INTO departments (department_name)
VALUES 
        ("Marketing"),
        ("Engineering"),
        ("Legal"),
        ("Production"),
        ("Art"),
        ("Design");
-- Creates the seed for roles
INSERT INTO roles (title, salary, department_id)
VALUES
        ("Market Research", 70000, 1),
        ("Head of Marketing", 150000, 1),
        ("Software Engineer", 100000, 2),
        ("Senior Software Engineer", 180000, 2),
        ("Attorney", 100000, 3),
        ("Head of Legal", 200000, 3),
        ("Producer", 72000, 4),
        ("Senior Producer", 130000, 4),
        ("Artist", 70000, 5),
        ("Senior Artist", 110000, 5),
        ("Designer", 70000, 6),
        ("Senior Designer", 110000, 6);
-- Creates the seed for employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
        ("Richard", "Madden", 1, 1),
        ("Stephanie", "Roberts", 2, 1),
        ("Joan", "Stevens", 3, 2),
        ("Maxwell", "Jacobs", 4, 2),
        ("Gillian", "Jacobs", 5, 3),
        ("Tommy", "Fullerton", 6, 3),
        ("Boris", "Romanov", 7, 4),
        ("Amy", "Lewis", 8, 4),
        ("Louie", "Willems", 9, 5),
        ("David", "Johnson", 10, 5),
        ("Joe", "King", 11, 6),
        ("Tyler", "Hall", 12, 6);