import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
    username: z.string().min(3).max(255),
}).superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
        });
    }
});

export type RegisterSchema = z.infer<typeof registerSchema>;