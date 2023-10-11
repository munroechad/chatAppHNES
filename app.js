const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // For parsing request bodies
const sqlite3 = require('sqlite3'); // For SQLite database


const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 3000

// Serve static assets from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up SQLite database
const db = new sqlite3.Database('hnes.db');

// Define your routes here
app.get('/', (req, res) => {
    // This could be a landing page or a different route
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'authentication', 'login.html'));
});

app.get('/reset', (req, res) => {
    res.sendFile(path.join(__dirname, 'authentication', 'reset.html'));
});

// Define other routes for signup, reset password, etc.

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

