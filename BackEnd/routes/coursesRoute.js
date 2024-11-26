import express from 'express';
import { addCourse, addReview, deleteCourse, getCourses, updateCourse } from '../controllers/coursesController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';
const route = express.Router();

route.post("/addcourses", addCourse);
route.get("/getcourses",authMiddleware, getCourses);
route.post("/updatecourses/:courseId", updateCourse);
route.delete("/deletecourses/:courseId", deleteCourse);
route.post("/addreview/:courseId", authMiddleware, addReview);

export default route;
