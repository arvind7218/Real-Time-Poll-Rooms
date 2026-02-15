import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { initSocket } from './socket.js';
import { connectDB } from './config/db.js';
import pollRoutes from './routes/pollRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin : "*",
    methods : ["GET","POST"]
}));
app.use(express.json());

connectDB();

const server = http.createServer(app);
initSocket(server);
const PORT = process.env.PORT || 5000;

app.use('/api/poll' , pollRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

