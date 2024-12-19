import express from 'express';
import { addContent, getContentByCourse, deleteContent } from '../controllers/contentController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';

const route = express.Router();

// Add new content
route.post("/addcontent", addContent);

// Get content by course
route.get("/getcontent/:courseId", getContentByCourse);

// Delete content
route.delete("/deletecontent/:contentId", authMiddleware, deleteContent);

export default route;
