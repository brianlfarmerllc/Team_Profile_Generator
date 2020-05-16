// const for employee classes, render html function, and employee array to store employee objects 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const teamMembers = [];
// const for node packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// const for creating output folder and html file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// calls add member when node app.js is run in command line
addMember();

function addMember() {
    // first prompt for determining role of employee
    inquirer.prompt([
        {
            type: "list",
            message: "What is the team members role",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ],
            name: "role"
        }])
        // assigning role info based off of employee role
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
            // prompts to gather each employee info
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
                // function to create new employee objects
            ]).then(function (data) {
                let newMember;
                if (role === "Engineer") {
                    newMember = new Engineer(data.name, data.id, data.email, data.info);
                } else if (role === "Manager") {
                    newMember = new Manager(data.name, data.id, data.email, data.info);
                } else if (role === "Intern") {
                    newMember = new Intern(data.name, data.id, data.email, data.info);
                }
                // pushes newMember to teamMember Array and determines if add another member or render html
                if (data.anotherMember === "Yes") {
                    teamMembers.push(newMember);
                    addMember();
                } else if (data.anotherMember === "No") {
                    teamMembers.push(newMember);
                    console.log(teamMembers);
                    renderHTML(render(teamMembers));
                }
            })
        })
}
// function to create output folder and render the team html. 
function renderHTML(html) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, html);
}


