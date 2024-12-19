import express from 'express';
import { submitQuiz, getSubmission, getSubmissionsForQuiz } from '../controllers/submissionController.js';

const route = express.Router();

// Submit quiz answers
route.post("/submitquiz", submitQuiz);

// Get submission by user and quiz
route.get("/getSubmission/:userId/:quizId", getSubmission);

// Get all submissions for a quiz
route.get("/getSubmissionsForQuiz/:quizId", getSubmissionsForQuiz);

export default route;
