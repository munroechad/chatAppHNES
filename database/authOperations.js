

class AuthOperations {
    static async getUserByUsername(username, db) {
        return new Promise((resolve, reject) => {
            // Query the database to check if the username exists
            const query = 'SELECT * FROM users WHERE username = ?';
            console.log()
            db.get(query, [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Add more static methods for other operations here
}

module.exports = AuthOperations;
