const { default: inquirer } = require("inquirer");
const db = require("../config/connection");

// shows all data in department table
function getAllDepartments() {
    return db.promise().query(`SELECT * FROM department`);
};

// shows all data in employee_role table
function getAllRoles() {
    return db.promise().query(`SELECT * FROM employee_role`)
};

// shows all data in the employee table
function getAllEmployees() {
    return db.promise().query(`SELECT * FROM employee`)
};

// creates new row in department table
async function addDepartment(newDepartment) {
    await inquirer
        .prompt(
            {
                name: "deptName",
                type: "input",
                message: "What is the name of the new department?"
            }
        )
        .then(async (userInput) => {
            db.query(`INSERT INTO department ${department_name} VALUES ${userInput.newDepartment}`);
        })
        .catch(console.log);
};

// finish multi-step thing for empRole

// creates new row and fills columns in employee_role table
async function addRole(newEmployeeRole) {
    await inquirer
        .prompt(
            {
                name: "empRoleName",
                type: "input",
                message: "What is the name of the new employee role?"
            },
            {
                name: "empRoleSalary",
                type: "number",
                message: "What is the salary of the new role? (enter a number)"
            },
            {
                name: "empRoleDept",
                type: "list",
                message: "To which department does this role belong?",
                choices: 
            }
        )
        .then(async (userInput) => {
            db.query(`INSERT INTO employee_role ${title} VALUES ${userInput.newEmployeeRole}`);
        })
        .catch(console.log);
};

// finish multi-step thing for employee

// creates new row and fills columns in employee table
async function addEmployee(newEmployee) {
    await inquirer
        .prompt(
            {
                name: "newEmpFirstName",
                type: "input",
                message: "What is the first name of the new employee?"
            },
            {
                name: "newEmpLastName",
                type: "input",
                message: "What is the last name of the new employee?"
            },
            {
                name: "newEmpRole",
                type: "list",
                message: "What is the role of the new employee?"
                choices: 
            }

        )
        .then(async (userInput) => {
            db.query(`INSERT INTO employee ${department_name} VALUES ${userInput.newEmployee}`);
        })
        .catch(console.log);
};

function updateEmployeeRole() {

};

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};