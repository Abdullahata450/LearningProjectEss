// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for new user registration
// This uses the 'exports.register' function from authController.js
router.post('/register', authController.register); 

// Route for existing user login (to acquire the JWT)
// This uses the 'exports.login' function from authController.js
router.post('/login', authController.login); 

module.exports = router;