import UserController from './UserController.js';
import BookController from './BookController.js'
import DatabaseController from "./DatabaseController.js";

const controller = new BookController();
controller.dbc.connect();
let x = await controller.findBook('uncle bob');
controller.dbc.disconnect();
console.log(x);