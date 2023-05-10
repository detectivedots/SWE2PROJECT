import UserController from './UserController.js';
import DatabaseController from "./DatabaseController.js";

const controller = new UserController();
controller.dbc.connect();
let x = await controller.findUser('011')
controller.dbc.disconnect();
console.log(x);