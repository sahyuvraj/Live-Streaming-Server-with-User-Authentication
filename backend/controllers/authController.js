require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUser, authenticateUser } = require('../models/userModel');

const secret = process.env.JWT_SECRET;

async function register(req, res) {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const success = await addUser(username, hashedPassword);
        if (success) {
            res.status(201).send('User registered');
        } else {
            res.status(409).send('User already exists');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const isAuthenticated = await authenticateUser(username, password);
        if (isAuthenticated) {
            const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { register, login };
