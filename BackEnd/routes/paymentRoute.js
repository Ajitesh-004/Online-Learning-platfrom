import express from 'express';
import { createPayment, getPaymentsByUser, getUserPurchasedCourses, updatePaymentStatus } from '../controllers/paymentController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';

const route = express.Router();

// Create new payment
route.post("/createpayment", createPayment);

// Get payments by user
route.get("/getpayments/:userId", getPaymentsByUser);

// Update payment status
route.patch("/updatepayment/:paymentId", updatePaymentStatus);

// In your backend API
route.get("/getUserPurchasedCourses/:userId", getUserPurchasedCourses);


export default route;
