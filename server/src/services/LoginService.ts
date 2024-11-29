import prisma from '../db';
import { User } from '@prisma/client';
import { LoginSchema } from '../../../shared/schemas';
import bcrypt from 'bcrypt';


/**
 * Checks if a user exists based on the provided identifier.
 * @param identifier - The identifier object containing either a username or email.
 * @returns A Promise that resolves to the User object if found, or null if not found.
 */
export const userExists = async (userData: LoginSchema): Promise<User | null> => {
    if (userData.username) {
        const user: User | null = await prisma.user.findFirst({ where: { username: userData.username } });
        return user;
    } else if (userData.email) {
        const user: User | null = await prisma.user.findFirst({ where: { email: userData.email } });
        return user;
    } else {
        return null;
    }
}

/**
 * Checks if the provided password matches the user's password.
 * @param user - The user object to check the password against.
 * @param password - The password to check against the user's password.
 * @returns A Promise that resolves to a boolean indicating whether the passwords match.
 */
export const checkPassword = async (user: User, password: string): Promise<boolean> => {
    return await bcrypt.compare(password, user.password);
}

