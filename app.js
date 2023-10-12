const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // For parsing request bodies
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./database/hnes.db')
// Import the route modules for other functionalities
const authRoutes = require('./routes/auth.js');

const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 3000
// Code to retrieve and display table names


// Create and export the database connection


// Define a route to retrieve and display table names

// Serve static assets from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your routes here
app.get('/', (req, res) => {
    // This could be a landing page or a different route
    res.sendFile(path.join(__dirname, 'index.html'));
});
 
async function getUserByUsername(username) {
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

app.post('/checkUsername', async (req, res) => {
    const { username } = req.body;

    try {
        // Query your database to check if the username already exists
        const user = await getUserByUsername(username);

        if (user) {
            res.status(200).send('Username already exists');
        } else {
            res.status(200).send('Username is available');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error checking username availability');
    }
});

// Use the route modules with a base path
app.use('/', authRoutes);

// Handle form submissions (example)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Implement authentication logic here
    // For example, check username and password against the database

    // Return a response (example)
    if (authenticated) {
        res.send('Login successful');
    } else {
        res.status(401).send('Authentication failed');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

