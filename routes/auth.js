// routes/auth.js

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../authentication', 'login.html'));
});

router.get('/reset', (req, res) => {
    res.sendFile(path.join(__dirname, '../authentication', 'reset.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../authentication', 'signup.html'));
});

router.get('/reset/'+token, (req, res) => {
    res.sendFile(path.join(__dirname, '../authentication', 'signup.html'));
});


module.exports = router;
