const db = require("../config/connection");
// const mysql = require("mysql2");

function getAllDepartments() {
    db.query(`SELECT * FROM department`);
};

function getAllRoles() {
    db.query(`SELECT * FROM employee_role`)
};

function getAllEmployees() {
    db.query(`SELECT * FROM employee`)
};

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees
};