import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email().optional(),
    username: z.string().min(3).max(255).optional(),
    password: z.string().min(6),
}).refine((data) => {
    if (!data.email && !data.username) {
        throw new Error('Either email or username is required');
    }
    return true;
});

export type LoginSchema = z.infer<typeof loginSchema>;