import express from 'express';
import { addQuiz, getQuizByCourse, deleteQuiz, getQuiz, GetAllQuiz } from '../controllers/quizController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';

const route = express.Router();

// Add new quiz
route.post("/addquiz", addQuiz);

// Get quizzes by course
route.get("/getQuizByCourse/:courseId", getQuizByCourse);

// Get quizzes by quizId
route.get("/getQuizById/:quizId", getQuiz);

// Delete quiz
route.delete("/deletequiz/:quizId", deleteQuiz);

// Get All Quiz
route.get("/getAllQuiz", GetAllQuiz);

export default route;
