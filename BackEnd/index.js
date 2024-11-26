import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import UserRoute from './routes/userRoute.js';
import ProfileRoute from './routes/profileRoute.js'
import CoursesRoute from "./routes/coursesRoute.js";
import { authMiddleware } from './Middlewares/authMiddleware.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
connectDB();

app.use('/api', UserRoute);
app.use('/api/profiles',authMiddleware,ProfileRoute)
app.use('/api/courses',CoursesRoute);

app.get('/', (req, res) => {
    res.status(200).send("Hello from Express!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
