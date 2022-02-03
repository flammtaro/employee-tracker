const inquirer = require(`inquirer`);
const express = require('express');
const fs = require(`fs`);
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(

    {
        host: "localhost",
        user: "root",
        password: "Bainbridge10",
        database: "employee_db",
    }
);

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
        }
    })
}

viewDepartments = () =>{

    db.query("SELECT * FROM departments",(err,data)=>{
        err ? console(err) : console.table(data)
         start();
    })
}
viewRoles = () =>{

    db.query("SELECT * FROM roles",(err,data)=>{
        err ? console(err) : console.table(data)
         start();
    })
}
viewAllEmployees = () =>{

    db.query("SELECT * FROM employees",(err,data)=>{
        err ? console(err) : console.table(data)
         start();
    })
}

start();