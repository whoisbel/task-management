import { db } from "../models";
import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';

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
