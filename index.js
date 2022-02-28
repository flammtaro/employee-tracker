const inquirer = require(`inquirer`);
const express = require('express');
const fs = require(`fs`);
const mysql = require('mysql2');
const { response } = require('express');

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

//Function to empty out previous array then fill departments array on initialization
// const init = () => {
//     departments = [];
//     roles = [];
//     employees = [];
//     db.query("SELECT department_name FROM departments", (err, data) => {
//       data.forEach((element) => {
//         departments.push(element.department_name);
//       });
//     });
//     db.query("SELECT role_name FROM roles", (err, data) => {
//       data.forEach((element) => {
//         roles.push(element.title);
//       });
//     });
//     db.query("SELECT last_name FROM employees", (err, data) => {
//       data.forEach((element) => {
//         employees.push(element.last_name);
//       });
//     });
//   };

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
            case "Update An Employee Role":
                updateEmployee();
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
    db.query('SELECT * FROM employees',   
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
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What role would you like to add?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for the role?",
        },
        {
            type: "input",
            name: "department",
            message: "What department does the role belong to?",
        },
    ]).then((answers)=>{
        let deptId;
        db.query("SELECT * FROM departments;", (err, data) => {
        data.forEach((element) => {
          if (element.department_name == answers.department) {
            deptId = element.id;
          }
        });
        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES ("${answers.name}", ${answers.salary}, ${deptId})`
        );
        console.log("Role Added!");
        start();
      });
    })
}
//Function to add a new employee
const addEmployee = () =>{
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is their first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is their last name?",
        },
        {
            type: "list",
            name: "role",
            message: "What is their role?",
            choices: [
                "Market Research",
                "Head of Marketing",
                "Software Engineer",
                "Senior Software Engineer",
                "Attorney",
                "Head of Legal",
                "Producer",
                "Senior Producer",
                "Artist",
                "Senior Artist",
                "Designer",
                "Senior Designer"
            ]
        },
        // {
        //     type: "list",
        //     message: "Who will they report to?",
        //     name: "manager",
        //   },
    ]).then((response) => {
        let role_id;
        // let manager_id;
        db.query("SELECT * FROM roles;", (err, data) => {
          data.forEach((element) => {
            if (element.title == response.role) {
              role_id = element.id;
            }
          });
    
          db.query(
            `INSERT INTO employees (first_name, last_name, role_id) VALUES ('${response.first_name}', '${response.last_name}', ${role_id})`
          );
        });
        console.log("Employee Added!");
        start();
      });
    };
//Function to update an employee
function updateEmployee() {
    db.query("SELECT * FROM roles", function (err,data){
        if (err) throw err;
        const roleArray = data.map(function (role) {
        return { name: role.title, value: role.id };
        })
    db.query("SELECT * FROM employees", function (err,data){
        if (err) throw err;
        const employeeArray = data.map(function (employee) {
        return {
            name:employee.first_name+" "+employee.last_name,
            value: employee.id,};
        })
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to update?",
            name: "employeeUpdate",
            choices: employeeArray,
        },
        {
            type: "list",
            message: "What new role would you like to give them?",
            name: "roleUpdate",
            choices: roleArray,
        },
    ]).then(function (update){
        const roleUpdate = update.roleUpdate;
        const employeeUpdate = update.employeeUpdate;
        db.query("UPDATE employees SET role_id=? WHERE id=?", [roleUpdate,employeeUpdate], function (err,result) {
            if (err) throw err;
            console.table(result);
            start(); 
        })
    });
    });
    });
};

//Runs the questions function and wipes departments array to repopulate it
start();