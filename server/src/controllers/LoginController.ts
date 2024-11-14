import { Request, Response } from 'express';
import { loginSchema, LoginSchema } from '../../../shared/schemas';

export const loginController = async (req: Request, res: Response) => {
    try {
        // Validate data
        const validatedData: LoginSchema = loginSchema.parse(req.body);
        // TODO: Check if user exists
        // TODO: Check if password is correct
        // TODO: Generate JWT
        // TODO: Send JWT in response
    } catch (error) {
        console.log(error);
    }
}
