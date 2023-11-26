import { db } from "../models";
import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from "../configs/jwt.config";
import jwt from 'jsonwebtoken'
export async function register(req: Request, res: Response) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new db.user({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
        });

        await user.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error: any) {
        res.status(403).json({ message: error.message });
    }
}


export async function login(req: Request, res: Response){
    try{
        const User = await db.user.findOne({email: req.body.email})
        if(!JWT_SECRET){
            throw new Error('JWT_SECRET environment variable is required');
        }
        const token = jwt.sign({ userId: User?._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'User login successfully', token});
    }catch(error:any){
        res.status(403).json({ message: error.message });
    }
}