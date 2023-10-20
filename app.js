const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // For parsing request bodies


// Import the route modules for other functionalities
const authRoutes = require('./routes/auth.js');
const signRoutes = require('./routes/authRoutes.js')
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 3000



// Serve static assets from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', authRoutes);
app.use('/', signRoutes);

// Define your routes here
app.get('/', (req, res) => {
    // This could be a landing page or a different route
    res.sendFile(path.join(__dirname, 'index.html'));
});









// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

