const mysql = require('mysql');

class DatabaseController {
    constructor() {
        if (DatabaseController.instance) {
            return DatabaseController.instance;
        }
        // Configure your MySQL connection settings here
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            database: 'lsp',
            port: 3306
        });
        DatabaseController.instance = this;
    }

    connect() {
        // Establish a connection to the MySQL server
        this.connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to MySQL server.');
        });
    }

    disconnect() {
        // Close the connection to the MySQL server
        this.connection.end((err) => {
            if (err) throw err;
            console.log('Disconnected from MySQL server.');
        });
    }

    save(query) {
        // Execute an INSERT, UPDATE, or DELETE query on the MySQL server
        this.connection.query(query, (err, result) => {
            if (err) throw err;
            console.log('Query executed successfully:', result.affectedRows, 'rows affected.');
        });
    }

    get(query) {
        // Execute a SELECT query on the MySQL server and return the results as an array of objects
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}

const instance = new DatabaseController();
Object.freeze(instance);

module.exports = DatabaseController;
