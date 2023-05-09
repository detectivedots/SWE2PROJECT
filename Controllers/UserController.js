const dbController = require("./DatabaseController");

class UserController{
    constructor() {
        if (UserController.instance){
            return UserController.instance;
        }
        this.dbc = new dbController();
    }
    //TODO Implement the functions from the class diagram
}

const instance = new UserController();
Object.freeze(instance);
module.exports = UserController()