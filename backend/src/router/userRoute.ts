import express, { Request, Response, NextFunction } from 'express';
// Note: Use the .js extension for imports when using ES Modules/ts-node
import { protect, authorize } from '../middleware/authMiddleware.js'; 
import User from '../model/user.js'; // Assuming your Mongoose Model is here


interface UserPayload {
    id: string; 
    role: string; 
}
interface AuthRequest extends Request {
    user?: UserPayload; 
}

const router = express.Router();



router.get('/me', protect, (req: AuthRequest, res: Response) => {
    // req.user is guaranteed to exist here because 'protect' middleware ran successfully
    res.status(200).json(req.user); 
});


router.get('/', protect, authorize(['admin', 'moderator']), async (req: AuthRequest, res: Response) => {
    try {
        // Fetch all users, explicitly excluding the hashed password field
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error fetching user list." });
    }
});


router.delete('/:id', protect, authorize(['admin']), async (req: AuthRequest, res: Response) => {
    try {
        const userIdToDelete = req.params.id;
        
        // Optional security check: Prevent an admin from deleting themselves
        if (req.user?.id === userIdToDelete) {
             return res.status(403).json({ message: "Cannot delete your own account via this endpoint." });
        }
        
        const deletedUser = await User.findByIdAndDelete(userIdToDelete);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: 'User successfully removed' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error during deletion." });
    }
});

export default router;