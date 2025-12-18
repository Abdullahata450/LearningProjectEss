import {Request,Response} from 'express';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

// interface to enforce structure of request body

interface RegisterFormat {
    username:string,
    password:string,
}


// function generates signature by taking user_id,role and secret as payload
const generateJWT = (id:string,role:string) => {
    try {
        // validate arguments
        if(!id || !role) {
            throw new Error('Role or ID not given');
        }
        const secret:string = process.env.JWT_SECRET as string;
        if(!secret) {
            throw new Error('Secret not found');
        }

        // call the function to generate token

        return jwt.sign({id, role}, secret, {
            expiresIn: '1h'
        });

    }
    catch (e) {
        console.error('Error occurred:',e);
    }
};


/* function takes credentials, finds if user exists
matches hashed_password using bcrypt,
returns data with jwt token if found else Null
 */
export const login = async (req:Request,res:Response) => {
    const {username,password}= req.body;
    const found_user = await User.findOne({username:username});
    // console.log(req)
    // console.log("User found:",found_user)

    

    // console.log(await bcrypt.hash(password,10))
    if (found_user && (await bcrypt.compare(password,found_user.password))){
        const token = generateJWT(found_user._id.toString(), found_user.role);
        res.json({ token,
            user:
                { id: found_user._id,
                    username: found_user.username,
                    role: found_user.role }
        });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

export const register = async (req:Request<Record<string, never>,Record<string, never>,RegisterFormat>,res:Response) => {
    // compile time checking
    const {username,password} = req.body;
    const role:string = 'user';
    // run time checks
    // 1. Define fields to check
    const requiredFields = { username, password, role };

    // 2. Filter out keys that have empty/undefined values
    // This creates an array like ['email'] or ['username', 'password']
    const missingFields = Object.keys(requiredFields)
        .filter(key => !requiredFields[key as keyof typeof requiredFields]);

    // 3. If the array is not empty, return the specific error
    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }
    try {

        // check if user already exists
        const user = await User.findOne({username:username});
        if (user) {
            return res.status(401).json('Username already taken');
        }

        await User.create({
            username: username.trim(),
            password: password.trim(),
            role: 'user',
        });
        return res.status(200).json({message:'User successfully created'});
    }
    catch (e) {
        return res.status(500).json(e);
    }

};