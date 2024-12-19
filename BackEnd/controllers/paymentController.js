import Payment from "../models/payment.js";
import User from "../models/user.js";
import Course from "../models/courses.js";

// Create a new payment
export const createPayment = async (req, res) => {
  const { userId, courseId, amount, paymentMethod, transactionId } = req.body;

  try {
    // Validate user and course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(400).json({ message: "Invalid user or course" });
    }

    const payment = new Payment({
      user: userId,
      course: courseId,
      amount,
      paymentMethod,
      paymentStatus: "Completed", // Assuming the payment is in pending initially
      transactionId,
    });

    await payment.save();

    return res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get payments for a user
export const getPaymentsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const payments = await Payment.find({ user: userId }).populate("course");
    return res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get a specific payment
export const getPayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId).populate("user course");
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update payment status (e.g., to 'completed', 'failed', 'refunded')
export const updatePaymentStatus = async (req, res) => {
  const { paymentId, status } = req.body;

  try {
    const validStatuses = ["pending", "completed", "failed", "refunded"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.paymentStatus = status;
    await payment.save();

    return res.status(200).json({ message: "Payment status updated", payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPurchasedCourses = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    // Fetch payments for the user and populate course details
    const payments = await Payment.find({ user: userId })
      .populate('course') // Populate the course details in the payment
      .exec();

    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No courses found for this user" });
    }

    // Extract the course details from the payments
    const purchasedCourses = payments.map(payment => payment.course);

    return res.status(200).json(purchasedCourses);
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};