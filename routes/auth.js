// routes/auth.js

const express = require('express');
const router = express.Router();
const path = require('path');
const AuthOperations = require('../database/authOperations')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('hnes.db')

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../authentication', 'login.html'));
});

router.get('/reset', (req, res) => {
    res.sendFile(path.join(__dirname, '../authentication', 'reset.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../authentication', 'signup.html'));
});

router.post('/checkUsername', async (req, res) => {
    const { username } = req.body;

    try {
        // Query your database to check if the username already exists
        const user = await AuthOperations.getUserByUsername(username,db);

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


module.exports = router;
