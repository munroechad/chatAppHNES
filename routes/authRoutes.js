const express = require('express');
const { body, validationResult } = require('express-validator');
const AuthOperations = require('../database/authOperations');

const router = express.Router();

// Define the signup route
router.post('/signup', [
    body('email').isEmail().normalizeEmail(),
    body('password').isString().trim(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Create the user with the given email and password
        // Handle success or error accordingly

        const user = await AuthOperations.createUser(email, password);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating the user' });
    }
});



router.post('/checkUsername', async (req, res) => {
    const { username } = req.body;

    try {
        // Query your database to check if the username already exists
        const user = await AuthOperations.getUserByUsername(username);

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





router.post('/log-in', async (req, res) => {
   
    const { username, password } = req.body;

    try {
        const user = await AuthOperations.authenticateUser(username, password);

        if (user) {
            // Authentication successful; generate and insert a token
            const userId = user.id; // Use the actual property name from your user object
            const purpose = 'login';
            const currentTimestamp = new Date().getTime();
            const expirationTimestamp = new Date(currentTimestamp + 12 * 60 * 60 * 1000);
            console.log(expirationTimestamp)
            const token = await AuthOperations.generateAndInsertToken(userId, purpose, expirationTimestamp);

            // Return the token or perform other actions as needed\
            res
            .status(201)
            .cookie('access_token', 'Bearer ' + token, {
                expires: new Date(Date.now() + 12 * 3600000) // cookie will be removed after 8 hours
            })
            .redirect(301,'/')
           

            
           
        } else {
            res.status(401).send('Authentication failed');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during authentication');
    }
});


// Define other user-related routes

module.exports = router;