import express from 'express';
import { Login, SignUp } from '../controllers/userController.js';
const Route = express.Router();

Route.post('/auth/signup', SignUp);
Route.post('/auth/login', Login);

export { Route };