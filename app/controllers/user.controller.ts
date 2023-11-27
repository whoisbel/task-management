import { db } from "../models";
import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from "../configs/jwt.config";
import jwt from 'jsonwebtoken'

// Where user creates their account.
export async function register(req: Request, res: Response) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new db.user({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        // Return the user's _id explicitly
        res.status(200).json({ userId: user._id });
    } catch (error: any) {
        res.status(403).json({ message: error.message });
    }
}

// Where user will send their login information to get their JWT that users use to access api endpoints
export async function login(req: Request, res: Response) {
    try {
        const user = await db.user.findOne({ email: req.body.email });

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is required');
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ userId: user._id, token });
    } catch (error: any) {
        res.status(403).json({ message: error.message });
    }
}
