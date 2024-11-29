import { Request, Response, NextFunction } from 'express';
import { isValidSession } from '../services/SessionService';

/**
 * Check if a session is valid
 * @param req - The request
 * @param res - The response
 * @param next - The next middleware
 */
export const sessionController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const sessionToken = req.body.sessionToken;
        if (!sessionToken) {
            res.status(400).json({ error: 'Session token is required' });
        }
        const isValid = await isValidSession(sessionToken);
        if (!isValid) {
            res.status(401).json({ error: 'Invalid session token' });
        }
        res.status(200).json({ message: 'Session is valid' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}