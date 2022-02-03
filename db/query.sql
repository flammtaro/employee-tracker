SELECT 
    employees.id,
    employees.first_name,
    employees.last_name,
    employees.role
FROM
    employees
INNER JOIN roles ON roles.id = employees.role_id;