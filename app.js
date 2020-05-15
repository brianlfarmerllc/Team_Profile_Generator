const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

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

            ]).then(function (data) {
                let newMember;
                if (role === "Engineer") {
                    newMember = new Engineer(data.name, data.id, data.email, data.info);
                } else if (role === "Manager") {
                    newMember = new Manager(data.name, data.id, data.email, data.info);
                } else if (role === "Intern") {
                    newMember = new Intern(data.name, data.id, data.email, data.info);
                }
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

function renderHTML(html) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }

    fs.writeFileSync(outputPath, html);

}


