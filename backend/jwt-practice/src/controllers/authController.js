const User = require('../model/user'); // CORRECTED: Use require() to get the Mongoose User Model
const jwt = require('jsonwebtoken');   // CORRECTED: Use require() for jsonwebtoken
const bcrypt = require('bcryptjs');   // CORRECTED: Use require() for bcryptjs

// Helper function to generate JWT
const generateToken = (id, role) => {
    
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
        // CRITICAL CHECK: If the secret is not found, log an error and throw one.
        console.error("CRITICAL ERROR: JWT_SECRET environment variable is not defined!");
        // Throwing an error stops the process before the 'jwt.sign' fails silently/cryptically.
        throw new Error("JWT Secret is missing. Please check your .env file and server restart.");
    }
    

    return jwt.sign({ id, role }, secret, {
        expiresIn: '1d'
    });
};

exports.register = async (req, res) => {
    // ... validation ...
    const { username, password } = req.body;
    try {
        // CORRECTED: Use User.create() (Mongoose method)
        const user = await User.create({ username, password, role: 'user' }); // Default role
        const token = generateToken(user._id, user.role);
        res.status(201).json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (error) {
        // Check for specific unique validation error (MongoDB error code 11000)
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        res.status(400).json({ error: error.message });
    }
};

// CORRECTED: Use module.exports or exports.functionName for CommonJS export
exports.login = async (req, res) => {
    // ... validation ...
    const { username, password } = req.body;
    
    // CORRECTED: Use User.findOne() (Mongoose method)
    const user = await User.findOne({ username }); 
    console.log("found user",user);
    // CORRECTED: Use bcrypt.compare() (imported object method)
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id, user.role);
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};