import jwt from 'jsonwebtoken';
import 'dotenv/config';
// Helper function to handle the 401 response
const unauthorizedResponse = (res, message) => {
    res.status(401).json({ message });
};
export const protect = (req, res, next) => {
    let token;
    // 1. Check if token exists in the Authorization header and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (split "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET not configured.");
            }
            // 2. Verify token
            const decoded = jwt.verify(token, secret);
            // --- DEBUGGING LOGS ---
            console.log("--- JWT VERIFICATION SUCCESS ---");
            console.log("Decoded Token Data (User Payload):", decoded);
            // 3. Attach decoded user payload to the request for subsequent middleware/controllers
            req.user = decoded;
            next();
        }
        catch (error) {
            console.error("Token verification failed:", error);
            unauthorizedResponse(res, 'Not authorized, token failed');
        }
    }
    else {
        // If no token was found in the header
        unauthorizedResponse(res, 'Not authorized, no token');
    }
};
export const authorize = (roles = []) => {
    // Ensure roles is always an array for simpler logic below
    if (typeof roles === 'string') {
        roles = [roles];
    }
    // Return the actual Express middleware function
    return (req, res, next) => {
        // 1. Check if req.user exists (It should, if 'protect' ran successfully)
        if (!req.user) {
            // This is a safety check: authorize should always run AFTER protect
            return unauthorizedResponse(res, 'Authorization failed: User payload missing.');
        }
        // 2. Check if the route requires authorization (if roles array is empty, skip check)
        if (roles.length === 0) {
            return next();
        }
        // 3. Check if the user's role is included in the authorized roles array
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Forbidden. Role '${req.user.role}' is not authorized to access this route.`
            });
        }
        next();
    };
};
//# sourceMappingURL=authMiddleware.js.map