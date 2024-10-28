import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(express.json);
app.use(cors());

connectDB();

app.use('/', (req,res) => {
    res.status(200).send("Hello from Express!");
});

app.listen(process.env.PORT || 3000);