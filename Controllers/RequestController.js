const dbController = require("./DatabaseController");

class RequestController{
    constructor() {
        if (RequestController.instance){
            return RequestController.instance;
        }
        this.dbc = new dbController();
    }
    //TODO Implement the functions from the class diagram
}

const instance = new RequestController();
Object.freeze(instance);
module.exports = RequestController()