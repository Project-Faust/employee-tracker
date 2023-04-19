const db = require("./config/connection");
const inquirer = require("inquirer");
const promptFunctions = require("./utils/prompts")
require("console.table");


async function homePrompt() {
    const answers = await inquirer.prompt({
        name: "homePrompt",
        type: "list",
        message: "Please select an option from the list.",
        choices: [
            "View All Departments",
            "View All Roles",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            "Quit",
        ],
    });
    userResponse = answers.homePrompt;

    switch (userResponse) {
        case "View All Departments":
            const deptRes = await promptFunctions.getAllDepartments();
            console.table(deptRes[0]);
            homePrompt();
            break;
        case "View All Roles":
            promptFunctions.getAllRoles();
            homePrompt();
            break;
        case "View All Employees":
            promptFunctions.getAllEmployees();
            homePrompt();
            break;
        case "Add a Department":
            promptFunctions.addDepartment();
            homePrompt();
            break;
        case "Add a Role":
            promptFunctions.addRole();
            homePrompt();
            break;
        case "Add an Employee":
            promptFunctions.addEmployee();
            homePrompt();
            break;
        case "Update an Employee Role":
            promptFunctions.updateEmployeeRole();
            homePrompt();
            break;
        case "Quit":
            process.exit();
        default:
            console.log("Invalid selection. Please try again.");
            homePrompt();
    };
};

homePrompt();