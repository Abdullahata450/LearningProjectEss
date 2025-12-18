import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
interface UserPayload extends JwtPayload {
    id: string;
    role: string;
}
interface AuthRequest extends Request {
    user?: UserPayload;
}
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const authorize: (roles?: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export {};
