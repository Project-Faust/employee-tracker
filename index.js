const db = require("./config/connection");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

async function homePrompt() {
    inquirer
        .prompt(
            {
                type: "list",
                message: "Please select an option from the list.",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "Add a Department",
                    "Add a Role",
                    "Add an Employee",
                    "Update an Employee Role"
                ]
            }
        )
        .then(async (userResponse) => {
            switch (userResponse.init) {
                case "View All Departments":
                    await getAllDepartments();
                    homePrompt();
                    break;
                case "View All Roles":
                    await getAllRoles();
                    homePrompt();
                    break;
                case "View All Employees":
                    await getAllEmployees();
                    homePrompt();
                    break;
                case "Add a Department":
                    await addDepartment();
                    homePrompt();
                    break;
                case "Add a Role":
                    await addRole();
                    homePrompt();
                    break;
                case "Add an Employee":
                    await addEmployee();
                    homePrompt();
                    break;
                case "Update an Employee Role":
                    await updateEmployeeRole();
                    homePrompt();
                    break;
                default:
                    console.log("Invalid selection. Please try again.");
                    homePrompt();
            };
        });
};

homePrompt();