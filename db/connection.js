const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_tracker'
    },
    console.log('Connected to employee.db.')
);

module.exports = db;