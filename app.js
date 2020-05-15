const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

addMember();

function addMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "What is team members role",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ],
            name: "role"
        }])
        .then(function (data) {
        let info = "";
        let role = data.role
        if (role === "Engineer") {
            info = "Github user name"
        } else if (role === "Manager") {
            info = "office number"
        } else {
            info = "school name"
        }
        inquirer.prompt([
            {
                type: "input",
                message: "Enter team members name",
                name: "name"
            },
            {
                type: "input",
                message: "Enter team members id",
                name: "id"
            },
            {
                type: "input",
                message: "Enter team members email address",
                name: "email"
            },
            {
                type: "input",
                message: "Enter team members " + info,
                name: "info"
            },
            {
                type: "list",
                message: "Would you like to enter a new team member",
                name: "anotherMember",
                choices: [
                    "Yes",
                    "No"
                ]
            }
            
        ]).then(function(data) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(data.name, data.id, data.email, data.info);
            } else if (role === "Manager") {
                newMember = new Manager(data.name, data.id, data.email, data.info);
            } else if (role === "Intern"){
                newMember = new Intern(data.name, data.id, data.email, data.info);
            }
            console.log(newMember)
        })   
    })
        
}





// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
