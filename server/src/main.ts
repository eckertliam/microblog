import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';


// bring in dotenv
dotenv.config();


// ensuring correctness of dotenv
const requiredEnvVars = ['PORT', 'CORS_ORIGIN'];

let errored_env = false;

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable ${envVar}`);
        errored_env = true;
    }
});

if (errored_env) {
    process.exit(1);
}

// now safely access the environment variables
const PORT: number = parseInt(process.env.PORT as string);
const CORS_ORIGIN: string = process.env.CORS_ORIGIN as string;

// init the corsOptions
const corsOptions: CorsOptions = {
    origin: CORS_ORIGIN,
};

// init the express app
const app: Express = express();

app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log('Server is running on port 8080');
});
