import { Request, Response } from "express";
import 'dotenv/config';
interface RegisterFormat {
    username: string;
    password: string;
}
export declare const login: (req: Request, res: Response) => Promise<void>;
export declare const register: (req: Request<{}, {}, RegisterFormat>, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
