import prisma from '../prisma';
import { randomBytes } from 'crypto';


/**
 * Create a new session for a user
 * @param userId - The ID of the user
 * @returns The created session token
 */
async function newSession(userId: number): Promise<string> {
    const token = randomBytes(64).toString('hex').slice(0, 64);
    const session = await prisma.sessions.create({
        data: {
            userId,
            token,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60)
        },
    });
    return session.token;
}


/**
 * Check if a session is valid
 * @param token - The session token
 * @returns Whether the session is valid
 */
async function isValidSession(token: string): Promise<boolean> {
    const session = await prisma.sessions.findFirst({
        where: { token },
    });
    // if session is null or expired, return false
    return session !== null && session.expiresAt > new Date();
}

