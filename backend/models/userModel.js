const db = require('../utils/db');
const bcrypt = require('bcryptjs');

async function addUser(username, hashedPassword) {
    try {
        const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        return result.affectedRows === 1;
    } catch (error) {
        console.error('Error adding user:', error);
        return false;
    }
}

async function authenticateUser(username, password) {
    try {
        const [rows] = await db.query('SELECT password FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            const hashedPassword = rows[0].password;
            return await bcrypt.compare(password, hashedPassword);
        }
        return false;
    } catch (error) {
        console.error('Error authenticating user:', error);
        return false;
    }
}

module.exports = { addUser, authenticateUser };
