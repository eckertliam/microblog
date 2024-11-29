import { Request, Response } from 'express';
import { loginSchema, LoginSchema } from '../../../shared/schemas';
import { userExists, checkPassword } from '../services/LoginService';
import { newSession } from '../services/SessionService';
import { User } from '@prisma/client';

export const loginController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate data
        const validatedData: LoginSchema = loginSchema.parse(req.body);
        // Check if user exists
        const user: User | null = await userExists(validatedData);
        if (!user) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        // Check if password is correct
        const isPasswordCorrect: boolean = await checkPassword(user, validatedData.password);
        if (!isPasswordCorrect) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        // Generate session
        const sessionToken: string = await newSession(user.id);
        res.status(200).json({ sessionToken });
    } catch (error) {
        console.log(error);
    }
}
