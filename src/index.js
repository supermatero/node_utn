"use strict";

import express from 'express';
import rateLimiterConfig from './config/rateLimitConfig.js';
import connectToMongoDB from './config/mongoDB.js';
import helmet from 'helmet';

import { router as moviesRouter } from './routers/movies.js';
import { router as authRouter } from './routers/auth.js';
import { router as healthRouter } from './routers/health.js';


const app = express();
app.use(express.json());
app.use(helmet());

app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/auth", authRouter);
app.use('/health', healthRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(rateLimiterConfig)
}

const PORT = process.env.PORT ?? 3000;

async function startServer() {
    try {
        await connectToMongoDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
}

startServer();