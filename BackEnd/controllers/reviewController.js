import Review from "../models/review.js";
import Course from "../models/courses.js";
import User from "../models/user.js";

// Create a new review
export const createReview = async (req, res) => {
  const { courseId, rating, reviewText } = req.body;
  const userId = req.user.id; // Assuming user is authenticated

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(400).json({ message: "Invalid user or course" });
    }

    // Check if user already submitted a review for the course
    const existingReview = await Review.findOne({ user: userId, course: courseId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this course" });
    }

    const review = new Review({
      user: userId,
      course: courseId,
      rating,
      reviewText,
    });

    await review.save();

    return res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get reviews for a course
export const getReviewsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const reviews = await Review.find({ course: courseId }).populate("user");
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get a specific review
export const getReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId).populate("user course");
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
