const sqlite3 = require('../node_modules/sqlite3');

// Create and export the database connection
const db = new sqlite3.Database('./hnes.db');


module.exports = db;
