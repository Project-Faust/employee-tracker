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
            "View All Employees",
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
            const empRoleRes = await promptFunctions.getAllRoles();
            console.table(empRoleRes[0]);
            homePrompt();
            break;
        case "View All Employees":
            const empRes = await promptFunctions.getAllEmployees();
            console.table(empRes[0]);
            homePrompt();
            break;
        case "Add a Department":
            await promptFunctions.addDepartment();
            homePrompt();
            break;
        case "Add a Role":
            await promptFunctions.addRole();
            homePrompt();
            break;
        case "Add an Employee":
            await promptFunctions.addEmployee();
            homePrompt();
            break;
        case "Update an Employee Role":
            await promptFunctions.updateEmployeeRole();
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