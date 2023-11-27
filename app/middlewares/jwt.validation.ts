import { Response, Request, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/jwt.config';

//Used to validateJWT that users send which will grant them access to other api endpoints.
export async function validateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (!bearer || !token || bearer.toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: 'Invalid Authorization header format.' });
  }

  try {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, exp?: number };

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      throw new TokenExpiredError('jwt expired', new Date(decoded.exp * 1000));
    }

    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    res.status(401).json({ message: 'Invalid token' });
  }
}
