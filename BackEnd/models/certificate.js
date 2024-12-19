import mongoose from "mongoose";

const certificateSchema = mongoose.Schema({
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
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  certificateNumber: {
    type: String,
    required: true,
    unique: true, // Ensures certificate number is unique
  },
  certificateUrl: {
    type: String, // URL to the generated certificate image or PDF
    required: true,
  },
  grade: {
    type: String, // The grade or completion status (e.g., "Completed", "A", "B", etc.)
  },
});

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
