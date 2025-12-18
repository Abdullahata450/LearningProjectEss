import express from 'express';
import mongoose,{connectDB} from "./config/db.js";
import loginRouter from './router/authRoute.js'
import userRouter from './router/userRoute.js'
import cors from 'cors';

const app = express()   // create express object
export default app;
const port = 5000

// implementing cors options
const allowedOrigins = [
    // 'https://your-frontend-domain.com', // Production URL
    'http://localhost:5000',             // Local development URL
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow
        } else {
            callback(new Error('Not allowed by CORS')); // Block
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies/authorization headers to be sent
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/auth',loginRouter)     // use routes for mainly Login
app.use('/api/auth',userRouter)

const startServer = async () => {
    try {
        // Connect to database first
        await connectDB();

        // Then start server
        const server = app.listen(port, () => {
            console.log(` Server started on port ${port}`);
        });

    } catch (error) {
        console.error(' Failed to start server:', error);
        process.exit(1);
    }
};


startServer();