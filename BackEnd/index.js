import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import UserRoute from './routes/userRoute.js';
import { authMiddleware } from './Middlewares/authMiddleware.js';

dotenv.config();

// Connect to the database
connectDB();

const app = express();


const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', 
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use(express.json())

app.use('/api', UserRoute);

app.get('/', (req, res) => {
    res.status(200).send("Hello from Express!");
});

// Error handling middleware should be the last middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
