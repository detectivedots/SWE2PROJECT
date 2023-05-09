const dbController = require("./DatabaseController");

class BookController{
    constructor() {
        if (BookController.instance){
            return BookController.instance;
        }
        this.dbc = new dbController();
    }
    //TODO Implement the functions from the class diagram
}

const instance = new BookController();
Object.freeze(instance);
module.exports = BookController()