import express from 'express';
import { createCertificate, getCertificatesByUser, getCertificate } from '../controllers/certificateController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';

const route = express.Router();

// Create a new certificate
route.post("/createcertificate", authMiddleware, createCertificate);

// Get certificates by user
route.get("/getcertificates/:userId", authMiddleware, getCertificatesByUser);

// Get a specific certificate
route.get("/getcertificate/:certificateId", getCertificate);

export default route;
