import express from 'express';
import { connectDB } from "./config/db.js";
import loginRouter from './router/authRoute.js';
import userRouter from './router/userRoute.js';
import cors from 'cors';
import morgan from "morgan";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express(); // create express object
export default app;
const port = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename, '\n\n', __dirname);
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// 1. TERMINAL LOGGING (Errors Only)
app.use(morgan('dev', {
    // skip will return TRUE (meaning DON'T log) if status is less than 400
    skip: (req, res) => res.statusCode < 400
}));
// 2. FILE LOGGING (Everything)
app.use(morgan('combined', {
    stream: accessLogStream
}));
// implementing cors options
const allowedOrigins = [
    // 'https://your-frontend-domain.com', // Production URL
    'http://localhost:5000', // Local development URL
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow
        }
        else {
            callback(new Error('Not allowed by CORS')); // Block
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies/authorization headers to be sent
};
// app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use('/api/auth', loginRouter); // use routes for mainly Login
app.use('/api/auth', userRouter);
const startServer = async () => {
    try {
        // Connect to database first
        await connectDB();
        // Then start server
        app.listen(port, () => {
            console.log(` Server started on port ${port}`);
        });
    }
    catch (error) {
        console.error(' Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=app.js.map