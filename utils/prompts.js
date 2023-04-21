const inquirer = require("inquirer");
const db = require("../config/connection");

// populates departments from table department
async function deptChoices() {
    const deptQuery = db.promise().query(`SELECT id FROM department`);
    return deptQuery[0];
};

// populates roles from table employee_role
async function roleChoices() {
    const roleQuery = await db.promise().query(`SELECT id FROM employee_role`);
    return roleQuery[0];
};

// populates roles from table employee
async function empChoices() {
    const empQuery = await db.promise().query(`SELECT id FROM employee`);
    return empQuery[0];
};

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
async function addDepartment() {
    await inquirer
        .prompt(
            {
                name: "deptName",
                type: "input",
                message: "What is the name of the new department?"
            }
        )
        .then(async (userInput) => {
            await db.promise().query(`INSERT INTO department department_name VALUES ?, ${userInput}`);
        })
        .then(async () => console.log("Updated!"))
        .catch(console.log);
};

// creates new row and fills columns in employee_role table
async function addRole() {
    await inquirer
        .prompt(
            {
                name: "empRoleTitle",
                type: "input",
                message: "What is the title of the new employee role?"
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
                choices: await deptChoices()
            }
        )
        .then(async (userInput) => {
            await db.promise().query(`INSERT INTO employee_role (title, salary, department_id) VALUES ?, ${userInput}`);
        })
        .then(async () => console.log("Updated!"))
        .catch(console.log);
};

// creates new row and fills columns in employee table
async function addEmployee() {
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
                message: "What is the role of the new employee?",
                choices: await roleChoices()
            }
        )
        .then(async (userInput) => {
            await db.promise().query(`INSERT INTO employee (first_name, last_name, employee_role_id, manager_id) VALUES ?, ${userInput}`);
        })
        .then(async () => console.log("Updated!"))
        .catch(console.log);
};

// prompts the user to select a user then to select the new role to replace the existing role for the specified employee
async function updateEmployeeRole() {
    await inquirer
        .prompt(
            {
                name: "updateEmpRoleCurrent",
                type: "list",
                message: "For which employee do you want to update a role?",
                choices: await empChoices()
            },
            {
                name: "updateEmpRoleNew",
                type: "list",
                message: "What is the new role of the selected employee?",
                choices: await roleChoices()
            }
        )
        .then(async (userInput) => {
            await db.promise().query(`UPDATE employee SET employee_role_id = ? WHERE id = ?, ${userInput}`);
        })
        .then(async () => console.log("Updated!"))
        .catch(console.log);
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