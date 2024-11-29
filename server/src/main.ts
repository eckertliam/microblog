import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { loginController } from './controllers/LoginController';
import { sessionController } from './controllers/SessionController';

dotenv.config({ path: path.resolve(__dirname, '../.env') });


const app: Express = express();

const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN,
};

const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.use(cors(corsOptions));

app.use(express.json());

app.post('/session', sessionController);
app.post('/login', loginController);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});