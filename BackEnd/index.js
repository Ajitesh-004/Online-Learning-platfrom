import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import { Route }  from './routes/userRoute.js'
import { authMiddleware } from './Middlewares/authMiddleware.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/', (req,res) => {
    res.status(200).send("Hello from Express!");
});

app.use('/api',authMiddleware,Route)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.PORT || 3000);