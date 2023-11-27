import { Request, Response, NextFunction } from 'express';
import { db } from '../models';

//Middleware to ensure that users email is not already registered.
export async function validateUserInput(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;
        const User = db.user

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
