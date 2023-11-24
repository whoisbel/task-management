import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string, exp: number };

    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: 'Token has expired.' });
    }

    req.body.userId = decoded.userId;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired.' });
    }

    res.status(401).json({ message: 'Invalid token.' });
  }
}
