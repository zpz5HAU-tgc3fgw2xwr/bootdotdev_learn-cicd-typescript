import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { db, openDBConnection } from './db/index.js';
import { config } from './config.js';
import { handlerReadiness } from './api/readiness.js';
import { middlewareAuth } from './api/middleware.js';
import { handlerNotesCreate, handlerNotesGet } from './api/notes.js';
import { handlerUsersCreate, handlerUsersGet } from './api/users.js';

dotenv.config();
const __dirname = path.resolve();

const PORT = process.env.PORT;
if (!PORT) {
    console.error("PORT environment variable is not set");
    process.exit(1);
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.log("DATABASE_URL environment variable is not set")
    console.log("Running without CRUD endpoints")
} else {
    config.db.url = DATABASE_URL;
    openDBConnection();
}

const app = express();

app.use(cors({
    origin: ['https://*', 'http://*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
    exposedHeaders: ['Link'],
    credentials: false,
    maxAge: 300,
}));

app.use('/', express.static(path.join(__dirname, config.api.filepathRoot)));

const v1Router = express.Router();

if (db) {
    v1Router.post('/users', handlerUsersCreate);
    v1Router.get('/users', middlewareAuth(handlerUsersGet));
    v1Router.get('/notes', middlewareAuth(handlerNotesGet));
    v1Router.post('/notes', middlewareAuth(handlerNotesCreate));
}

v1Router.get('/healthz', handlerReadiness);

app.use('/v1', v1Router);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
