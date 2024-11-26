import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  duration: {
    weeks: { type: Number, required: true },
    hoursOfContent: { type: Number, required: true },
  },
  difficultyLevel: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Beginner to Advanced"], required: true },
  modules: [{ type: String, required: true }],
  ratings: {
    average: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        rating: { type: Number, min: 0, max: 5 },
      },
    ],
  },
  enrollments: { type: Number, default: 0 },
  price: {
    regular: { type: Number, required: true },
    discounted: { type: Number },
    discountValidity: { type: Date },
  },
  thumbnail: { type: String },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
