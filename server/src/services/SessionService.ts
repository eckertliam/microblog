import prisma from '../db';
import { randomBytes } from 'crypto';

const SESSION_EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

/**
 * Clean up expired sessions
 * @returns The number of sessions deleted
 */
export async function cleanUpExpiredSessions(): Promise<number> {
    const deletedSessions = await prisma.session.deleteMany({
        where: { expiresAt: { lt: new Date(Date.now()) } },
    });
    return deletedSessions.count;
}

/**
 * Create a new session for a user
 * @param userId - The ID of the user
 * @returns The created session token
 */
export async function newSession(userId: number): Promise<string> {
    const token = randomBytes(64).toString('hex').slice(0, 64);
    const session = await prisma.session.create({
        data: {
            userId,
            token,
            expiresAt: new Date(Date.now() + SESSION_EXPIRATION_TIME)
        },
    });
    return session.token;
}


/**
 * Check if a session is valid
 * @param token - The session token
 * @returns Whether the session is valid
 */
export async function isValidSession(token: string): Promise<boolean> {
    const session = await prisma.session.findFirst({
        where: { token },
    });
    // if session is null or expired, return false
    return session !== null && session.expiresAt > new Date(Date.now());
}

