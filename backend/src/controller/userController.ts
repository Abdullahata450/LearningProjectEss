import {Request,Response} from 'express';
import User from '../model/user.js';
import 'dotenv/config';


interface UserPayload {
    id: string;
    role: string;
}
interface AuthRequest extends Request {
    user?: UserPayload;
}
export const getUserData = async (req:Request,res:Response) => {
    try {
        const username:string = req.params.username;

        const userData = await User.findOne({username:username})
        // I mean it should exist becuz user has logged in to get here
        if (userData){
            res.status(200).json(userData);
        }
    }
    catch (e) {
        return res.status(400).json(e);
    }
}

export const getAllUsers = async (req:Request,res:Response) => {
    try {
        // Fetch all users, explicitly excluding the hashed password field
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error fetching user list.' });
    }
}

export const deleteUser = async (req: AuthRequest, res: Response) => {
    try {
        const { username } = req.params;

        // 1. First, find the user to check their ID against the logged-in admin
        const userToDelete = await User.findOne({ username });

        if (!userToDelete) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 2. Security check: Compare IDs (Mongoose IDs should be compared as strings or using .equals())
        if (req.user?.id === userToDelete._id.toString()) {
            return res.status(403).json({ message: 'Cannot delete your own account.' });
        }

        // 3. Perform the deletion
        await User.deleteOne({ username });

        res.status(200).json({ message: `User '${username}' successfully removed` });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error during deletion.' });
    }
};