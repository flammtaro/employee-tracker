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
        ("Senior Producter", 130000, 4),
        ("Artist", 70000, 5),
        ("Senior Artist", 110000, 5),
        ("Designer", 70000, 6),
        ("Senior Designer", 110000, 6);
-- Creates the seed for employees
INSERT INTO employees (first_name, last_name, role_id)
VALUES
        ("Richard", "Madden", 1),
        ("Stephanie", "Roberts", 2),
        ("Joan", "Stevens", 3),
        ("Maxwell", "Jacobs", 4),
        ("Gillian", "Jacobs", 5),
        ("Tommy", "Fullerton", 6),
        ("Boris", "Romanov", 7),
        ("Amy", "Lewis", 8),
        ("Louie", "Willems", 9),
        ("David", "Johnson", 10),
        ("Joe", "King", 11),
        ("Tyler", "Hall", 12);