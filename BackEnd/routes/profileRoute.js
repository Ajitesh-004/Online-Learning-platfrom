import express from 'express';
const route = express.Router();
import { getProfile, updateProfile } from '../controllers/profileController.js';

route.get('/:userId',getProfile);
route.put('/:userId',updateProfile);

export default route;