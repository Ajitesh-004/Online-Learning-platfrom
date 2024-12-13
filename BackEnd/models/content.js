import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
  title: { type: String, required: true }, // Title of the content
  description: { type: String }, // Description or summary of the content
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // References the Course this content belongs to
    required: true,
  },
  type: {
    type: String,
    enum: ["video", "pdf", "quiz", "assignment", "article"], // Type of content
    required: true,
  },
  resource: {
    videoUrl: { type: String }, // Video URL for video content
    pdfUrl: { type: String }, // PDF URL for document content
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }, // References Quiz model for quizzes
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }, // References Assignment model for assignments
    articleText: { type: String }, // Text for article content
  },
  duration: { type: String }, // Duration for video or other timed content (e.g., "10:30")
  order: { type: Number }, // To maintain the sequence of contents in the course
  isActive: { type: Boolean, default: true }, // Whether the content is active or not
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the content was created
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
