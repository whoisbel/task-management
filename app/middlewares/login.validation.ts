import { db } from "../models";
import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

export async function validateLogin(req: Request, res: Response, next: NextFunction){
    try{
        const User = await db.user.findOne({email: req.body.email})

        if(!User){
            res.status(404).json({message: 'email not found'})
            return
        }
        
        const isPasswordValid = await bcrypt.compare(req.body.password, User.password)

        if(isPasswordValid){
            next()
        }else{
            res.status(403).json({message: 'Wrong password/email'})
        }
    }catch(error: any){
        res.status(403).json({message: error.message})
    }
}