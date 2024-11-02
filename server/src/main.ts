import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import { Env, readEnv } from './envVars';

const envObj: Env = readEnv();

const app: Express = express();

const corsOptions: CorsOptions = {
    origin: envObj.CORS_ORIGIN,
};

app.use(cors(corsOptions));

app.listen(envObj.PORT, () => {
    console.log(`Server listening on port ${envObj.PORT}`);
});
