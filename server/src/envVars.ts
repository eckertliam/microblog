import dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

export interface Env {
    PORT: number;
    CORS_ORIGIN: string;
}

const requiredEnvVars = ['PORT', 'CORS_ORIGIN'];


/**
 * Validates the required environment variables are set and returns them as an object
 * @returns Env
 * @throws Error if any required environment variables are missing
 * @example const envObj: Env = readEnv();
 */
export function readEnv(): Env {
    const missingVars = requiredEnvVars.filter((envVar) => !env[envVar]);

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    return {
        PORT: parseInt(process.env.PORT as string),
        CORS_ORIGIN: process.env.CORS_ORIGIN as string,
    };
}
