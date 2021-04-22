const util = require('util');
const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.pass,
    database: config.database.database,
    insecureAuth: config.database.insecureAuth,
    dateStrings: true
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {

    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) connection.release();

    return;

});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

// Keep alive
setInterval(async function() {
    await pool.query('SELECT 1');
}, 5000);

module.exports = pool;