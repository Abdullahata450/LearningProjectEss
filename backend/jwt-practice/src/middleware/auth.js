const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    // let token;

    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     try {
    //         // Get token from header
    //         token = req.headers.authorization.split(' ')[1];
    //         console.log(token)
    //         // Verify token
    //         console.log(process.env.JWT_SECRET)
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //         // --- ADDED LINE FOR DEBUGGING ---
    //         console.log("--- JWT VERIFICATION SUCCESS ---");
    //         console.log("Decoded Token Data (User Payload):", decoded); 
    //         console.log(`User ID: ${decoded.id} | Role: ${decoded.role}`);
    //         console.log("----------------------------------");
    //         // ----------------------------------

    //         // Attach decoded user (ID and ROLE) to the request
    //         // We don't fetch the user from DB to keep it fast
    //         req.user = decoded; 

    //         next();
    //     } catch (error) {
    //         console.error(error);
    //         res.status(401).json({ message: 'Not authorized, token failed' });
    //     }
    // }

    // if (!token) {
    //     res.status(401).json({ message: 'Not authorized, no token' });
    // }
    let token;
    if (req.headers.authorization && req.headers.authorization.startswith("Bearer")) {
        // extract token from 
        token = req.headers.authorization.split(1)[' '];

        // decode the token
        decoded_token = jwt.verify(token,process.env.JWT_SECRET);


        req.user = decoded;
        next();
    }
};


// Middleware to check user role
exports.authorize = (roles = []) => {
    // roles param can be a single role string or an array of roles
    if (typeof roles === 'string') {
        roles = [roles];
    }
    
    return (req, res, next) => {
        // If the route doesn't require specific roles, proceed
        if (roles.length === 0) {
            return next();
        }

        // Check if the user's role is in the authorized roles array
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Forbidden. Role '${req.user.role}' is not authorized to access this route.`
            });
        }

        next();
    };
};