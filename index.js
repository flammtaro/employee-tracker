const inquirer = require(`inquirer`);
const express = require('express');
const fs = require(`fs`);
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Establishing a connection to my database
const db = mysql.createConnection(

    {
        host: "localhost",
        user: "root",
        password: "Bainbridge10",
        database: "employee_db",
    }
);

//Inquirer function to begin asking the terminal questions
const start = ()=>
{
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "Add A Role",
                "Add An Employee",
                "Update An Employee Role",
            ],
        },
    ]).then((answers)=>{
        switch(answers.options){
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add A Department":
                addDepartment();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            
        }
    })
}

//Function to pull the departments query into the index file
const viewDepartments = () =>{

    db.query("SELECT * FROM departments",    
        (err, data) => {
        console.table(data);
        start();
      })
}
//Function to pull the roles query into the index file
const viewRoles = () =>{

    db.query("SELECT title, roles.id, department_id, salary FROM departments JOIN roles ON roles.department_id = departments.id;",
    (err, data) => {
        console.table(data);
        start();
      })
}
//Function to pull the employees query into the index file
const viewAllEmployees = () =>{
//SELECT employees.id, first_name, last_name, title AS Job, department_name AS Department, salary AS Salary FROM roles JOIN roles.id = employees.role_id JOIN departments ON departments.id = roles.department_id;
    db.query("SELECT * FROM employees",    
    (err, data) => {
        console.table(data);
        start();
      })
}

//Function to add a new department 
const addDepartment = () =>{
    return inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of your new department?",
        },
    ]).then((answers)=>{
        db.query(
            `INSERT INTO departments (department_name) VALUES ("${answers.departmentName}");`
        );
        start();
    });

}
//Function to add a new role
const addRole = () =>{
    return inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What role would you like to add?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for the role?",
        },
        {
            type: "list",
            name: "department",
            message: "What department does the role belong to?",
            choices: [
                "Art",
                "Design",
                "Engineering",
                "Legal",
                "Marketing",
                "Production",
            ]
        },
    ]).then((answers)=>{
        let departmentId;
        db.query("SELECT * FROM departments;",(err,data)=>{
            data.forEach((element) => {
                if(element.department_name == answers.department)
                {
                    departmentId = element.id;
                }
            });
            db.query(
                `INSERT INTO roles (role_name, salary, department_id) VALUES ("${answers.name})`, `${answers.salary}`, `${departmentId}`
            );
        });
        start();
    });
}
//Function to add a new employee
const addEmployee = () =>{

    
}
//Function to update an employee
const updateEmployee = () =>{

}

//Runs the questions function
start();