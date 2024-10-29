import express from 'express';
import { Login, SignUp } from '../controllers/userController.js';

const Route = express.Router();

Route.post('/signup', SignUp);
Route.post('/login', Login);

export default Route; // Directly export the Route
