import DatabaseController from "./DatabaseController.js";
class UserAuthentication {
    constructor() {
        if (UserAuthentication.instance){
            return UserAuthentication.instance;
        }
        this.dbc = new DatabaseController();
    }

    async login(username, password){
        let loginValid = false;
        try {
            loginValid = await this.isLoginValid(username, password)
        } catch (error) {
            console.error(error);
            throw error;
        }
        return loginValid;
    }

    async register(username, password, email, phone){
        if (await this.#doesUserExist(username)){
            console.log("Name already taken");
        } else {
            //TODO: Call UserController for creating user and adding it to the database
            throw new Error("Not implemented");
        }
    }

    async isLoginValid(username, password) {
        try {
            const userExists = await this.#doesUserExist(username);
            if (!userExists) {
                return false;
            }
            const dbPassword = await this.#getPassword(username);
            return dbPassword === password;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            this.dbc.disconnect();
        }
    }

    async #doesUserExist(username) {
        const countQuery = `SELECT COUNT(*) AS count FROM users WHERE name = '${username}'`;
        const results = await this.dbc.get(countQuery);
        return results[0].count > 0;
    }

    async #getPassword(username) {
        const selectQuery = `SELECT password FROM users WHERE name = '${username}'`;
        const results = await this.dbc.get(selectQuery);
        return results[0].password;
    }
}

const instance = new UserAuthentication();
Object.freeze(instance);

export default UserAuthentication
