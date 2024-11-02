import { PrismaClient } from '@prisma/client';

/**
 * Singleton instance of PrismaClient
 */
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn'],
});

export default prisma;
