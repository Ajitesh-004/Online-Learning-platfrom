import mongoose from "mongoose";

const coursesSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumnbnail: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviews: [
    {
      User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 0, max: 5 },
    },
  ],
});

const Courses = mongoose.model("Courses", coursesSchema);

export default Courses;
