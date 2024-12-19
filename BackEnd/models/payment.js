import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensures amount is a positive number
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["credit_card", "paypal", "bank_transfer"], // Different payment methods
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Failed'], // Different stages of the payment
    default: "pending",
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String, // A unique identifier for the payment transaction
    required: true,
    unique: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;