import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import UserRoute from './routes/userRoute.js';
import ProfileRoute from './routes/profileRoute.js';
import coursesRoute from "./routes/coursesRoute.js";
import contentRoute from './routes/contentRoutes.js';  // New import
import quizRoute from './routes/quizRoute.js';        // New import
import paymentRoute from './routes/paymentRoute.js';  // New import
import certificateRoute from './routes/certificateRoutes.js';  // New import
import submissionRoute from './routes/submissionRoutes.js';    // New import
import { authMiddleware } from './Middlewares/authMiddleware.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// Routes
app.use('/api', UserRoute);
app.use('/api/profiles', authMiddleware, ProfileRoute);
app.use('/api/courses', coursesRoute);

// New routes
app.use('/api/content', contentRoute);  // Content routes
app.use('/api/quiz', quizRoute);        // Quiz routes
app.use('/api/payments', paymentRoute);  // Payment routes
app.use('/api/certificates', certificateRoute);  // Certificate routes
app.use('/api/submissions', submissionRoute);    // Submission routes

app.get('/', (req, res) => {
    res.status(200).send("Hello from Express!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
