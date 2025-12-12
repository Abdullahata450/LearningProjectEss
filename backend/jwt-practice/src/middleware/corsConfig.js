const cors = require('cors');

const allowedOrigins = [
    'http://localhost:5000', // Backend server
];

// cors config object
const corsOptions = {

    // function to check if origin is valid
    origin: function(orgin,callback){

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); 
        } else {
            console.warn(`CORS blocked request from unauthorized origin: ${origin}`);
            callback(new Error('CORS: Not allowed by policy'), false); // Deny the request
        }
    },
    // methods allowed
    methods: 'GET,PUT,POST,DELETE',
    
}