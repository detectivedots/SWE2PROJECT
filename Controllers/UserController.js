import DatabaseController from "./DatabaseController.js";
import NormalUser from "../Models/NormalUser.js";

class UserController {
    constructor() {
        if (UserController.instance) {
            return UserController.instance;
        }
        this.dbc = new DatabaseController();
    }

    async createUser(name, email, password, phone) {
        // Get next id from mysql database
        const query = "SELECT MAX(id) as max_id FROM users";
        const rows = await this.dbc.get(query);
        const nxtId = rows[0].max_id + 1;

        let user = new NormalUser(name, email, password, phone);
        user.id = nxtId;
        await this.saveUserToDb(user);
    }

    async updateUser(user) {
        // Changes the user data in the db to match the user in the argument
        const query = `UPDATE users
                       SET name='${user.name}',
                           email='${user.email}',
                           password='${user.password}',
                           phone='${user.phone}',
                           status='${user.status}',
                           type='${user.type}'
                       WHERE id = ${user.id}`;
        await this.dbc.save(query);
    }

    async deleteUser(user) {
        const query = `DELETE
                       FROM users
                       WHERE id = ${user.id}`;
        await this.dbc.save(query);
    }

    async findUser(searchTerm) {
        // Search for user using name, id, email, etc.
        const query = `SELECT *
                       FROM users
                       WHERE id = '${searchTerm}'
                          OR name = '${searchTerm}'
                          OR email = '${searchTerm}'
                          OR phone = '${searchTerm}'`;
        const rows = await this.dbc.get(query);
        const users = rows.map(row => new NormalUser(row.name, row.email, row.password, row.phone, row.status, row.type, row.id));
        return users;
    }

    async getAllUsers() {
        // Returns a list of all the users
        const query = "SELECT * FROM users";
        const rows = await this.dbc.get(query);
        const users = rows.map(row => new NormalUser(row.name, row.email, row.password, row.phone, row.status, row.type, row.id));
        return users;
    }

    async saveUserToDb(user) {
        const query = `INSERT INTO users (name, email, password, phone, status, type, id)
                       VALUES ('${user.name}', '${user.email}', '${user.password}', '${user.phone}', 'active',
                               'normal', ${user.id})`;
        await instance.dbc.save(query);
    }

    async retrieveUserFromDb(userId) {
        const query = `SELECT *
                       FROM users
                       WHERE id = ${userId}`;
        const rows = await instance.dbc.get(query);
        const user = new NormalUser(rows[0].name, rows[0].email, rows[0].password, rows[0].phone, rows[0].status, rows[0].type, rows[0].id);
        return user;
    }
}

const instance = new UserController();
Object.freeze(instance);
export default UserController;
