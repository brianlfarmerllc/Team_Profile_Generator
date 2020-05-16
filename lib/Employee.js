// Creates class of employee which Managar, Intern, and Engineer will extend from.  
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getRole() {
        return this.constructor.name
    };
    getName() {
        return this.name
    };
    getEmail() {
        return this.email
    }
    getId() {
        return this.id
    }
}

module.exports = Employee;