const dbController = require("./DatabaseController");

class UserAuthentication {
    constructor() {
        this.dbc = new dbController();
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

module.exports = UserAuthentication;
