// authOperations.js
const sqlite3 = require('sqlite3');

// Create and export the database connection
const db = new sqlite3.Database('./database/hnes.db');

const jwt = require('jsonwebtoken');


async function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        // Query the database to check if the username exists
        const query = 'SELECT * FROM users WHERE username = ?';
        db.get(query, [username], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}



async function createUser(email, password) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';
        db.run(query, [email, password], function (err) {
            if (err) {
                reject(err);
            } else {
                // User was successfully created, and you can return the user ID or other relevant data.
                resolve({ username: this.username });
            }
        });
    });
}




async function authenticateUser(username, password) {
  return new Promise(async (resolve, reject) => {
    // Query the database to retrieve the user with the provided username
    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], (err, user) => {
      if (err) {
        reject(err);
      } else {
        if (user) {
            console.log('User has been found.'+user)
          // Compare the provided plain text password with the stored plain text password
          if (user.password_hash === password) {
            console.log("Password matches.")
            resolve(user);
          } else {
            console.log('Password does not match')
            resolve(null); // Password does not match
          }
        } else {
            console.log('user not found.')
          resolve(null); // User not found
        }
      }
    });
  });
}



async function generateAndInsertToken(userId, purpose, expirationTimestamp) {
    return new Promise((resolve, reject) => {
        // Generate a unique token
        const expiresIn = '12h';
        const token = generateUniqueToken(userId, purpose, expiresIn);

        // Define the SQL statement to insert a new session token into the database
        const insertTokenQuery = `
            INSERT INTO session_tokens (user_id, token, purpose, expiration_timestamp)
            VALUES (?, ?, ?, ?);
        `;

        // Execute the SQL statement with the provided parameters
        db.run(insertTokenQuery, [userId, token, purpose, expirationTimestamp], function (err) {
            if (err) {
                reject(err);
            } else {
                // Return the generated token
                resolve(token);
            }
        });
    });
}

// Generate a unique token using jsonwebtoken
function generateUniqueToken(userId, purpose, expiresIn) {
    const secretKey = 'your-secret-key'; // Replace with your own secret key
    const payload = {
        // You can include any data you want in the payload
        // For example, the user ID and purpose
        user_id: userId,
        purpose: purpose,
    };

    const options = {
        expiresIn: expiresIn, // Set the expiration time for the token
    };

    // Generate the token using jsonwebtoken
    const token = jwt.sign(payload, secretKey, options);

    return token;
}




// Export other user-related operations as needed




module.exports = {
    getUserByUsername,
    createUser,
    authenticateUser,
    generateAndInsertToken,
 
    // Export other functions here
};


