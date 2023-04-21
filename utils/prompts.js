const inquirer = require("inquirer");
const db = require("../config/connection");

// populates departments from table department
// async function deptChoices() {
//     const deptQuery = db.promise().query(`SELECT id FROM department`);
//     return deptQuery[0];
// };

// populates roles from table employee_role
// async function roleChoices() {
//     const roleQuery = await db.promise().query(`SELECT id FROM employee_role`);
//     return roleQuery[0];
// };

// populates roles from table employee
// async function empChoices() {
//     const empQuery = await db.promise().query(`SELECT id FROM employee`);
//     return empQuery[0];
// };

// shows all data in department table
function getAllDepartments() {
    return db.promise().query(`SELECT * FROM department`);
};

// shows all data in employee_role table
function getAllRoles() {
    return db.promise().query(`SELECT * FROM employee_role`);
};

// shows all data in employee table
function getAllEmployees() {
    return db.promise().query(`SELECT * FROM employee`);
};

// shows only managers in employee table
function getAllManagers() {
    return db.promise().query(`SELECT * FROM employee WHERE manager_id IS NOT NULL`);
};

// creates new row in department table
async function addDepartment() {
    const { deptName } = await inquirer
        .prompt(
            {
                name: "deptName",
                type: "input",
                message: "What is the name of the new department?"
            }
        )
    console.log(deptName);
    await db.promise().query(`INSERT INTO department (department_name) VALUES (?)`, deptName);
    console.log("Updated!");
};

// creates new row and fills columns in employee_role table
async function addRole() {
    const [allDept] = await getAllDepartments();
    const choices = allDept.map(department => {
        return {
            name: department.department_name,
            value: department.id
        };
    });
    const { empRoleTitle, empRoleSalary, empRoleDept } = await inquirer
        .prompt([
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
                choices
            }
        ]);
    await db.promise().query(`INSERT INTO employee_role (title, salary, department_id) VALUES (?,?,?)`, [empRoleTitle, empRoleSalary, empRoleDept]);
    console.log("Updated!");
};

// creates new row and fills columns in employee table
async function addEmployee() {
    const [allRole] = await getAllRoles();
    const choicesRole = allRole.map(employee_role => {
        return {
            name: employee_role.title,
            value: employee_role.id
        };
    });
    const [allManager] = await getAllManagers();
    const choicesManager = allManager.map(employee => {
        return {
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.manager_id
        };
    });
    const { newEmpFirstName, newEmpLastName, newEmpRole, newEmpManager } = await inquirer
        .prompt([
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
                choices: choicesRole
            },
            {
                name: "newEmpManager",
                type: "list",
                message: "Who is the manager of the new employee?",
                choices: choicesManager
            }
        ]);
    await db.promise().query(`INSERT INTO employee (first_name, last_name, employee_role_id, manager_id) VALUES (?,?,?,?)`, [newEmpFirstName, newEmpLastName, newEmpRole, newEmpManager]);
    console.log("Updated!")
};

// prompts the user to select a user then to select the new role to replace the existing role for the specified employee
async function updateEmployeeRole() {
    const [allRole] = await getAllRoles();
    const choicesRole = allRole.map(employee_role => {
        return {
            name: employee_role.title,
            value: employee_role.id
        };
    });
    const [allEmp] = await getAllEmployees();
    const choicesEmp = allEmp.map(employee => {
        return {
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.id
        };
    });
    const { updateEmpRoleCurrent, updateEmpRoleNew } = await inquirer
        .prompt([
            {
                name: "updateEmpRoleCurrent",
                type: "list",
                message: "For which employee do you want to update a role?",
                choices: choicesEmp
            },
            {
                name: "updateEmpRoleNew",
                type: "list",
                message: "What is the new role of the selected employee?",
                choices: choicesRole
            }
        ])
    await db.promise().query(`UPDATE employee SET employee_role_id = ? WHERE id = ?`, [updateEmpRoleNew, updateEmpRoleCurrent]);
    console.log("Updated!")
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