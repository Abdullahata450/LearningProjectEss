// server.js (or app.js)

require('dotenv').config(); // Load environment variables first

const express = require('express');
const connectDB = require('./config/dbConfig'); // Assuming you put DB connection code here

// --- Import Routers ---
const authRoutes = require('./routes/auth'); // NEW AUTH ROUTER
const userRoutes = require('./routes/users'); // EXISTING USER ROUTER

// --- App Setup ---
const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); 



// --- Route Mounting ---
// The base path is /api/auth, so the login route becomes /api/auth/login
app.use('/api/auth', authRoutes);

// The base path is /api/users
app.use('/api/users', userRoutes);


// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));