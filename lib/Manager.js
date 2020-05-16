// creats class of Manager extended from employee

const Employee = require("./Employee")

class Manager extends Employee {
    constructor (name, id, email, number) {
        super (name, id, email);
        this.officeNumber = number;
    }
    getOfficeNumber() {
        return this.officeNumber
    }
}

module.exports = Manager;