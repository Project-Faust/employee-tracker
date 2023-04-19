const db = require("../config/connection");

// correct structure to call inside inquirer prompt
function getAllDepartments() {
    return db.promise().query(`SELECT * FROM department`);
};

function getAllRoles() {
    return db.query(`SELECT * FROM employee_role`)
};

function getAllEmployees() {
    return db.query(`SELECT * FROM employee`)
};

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees
};