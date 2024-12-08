import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  status: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
      status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
      },
      submittedAt: { type: Date },
    },
  ],
  isActive: { type: Boolean, default: true },
});

assignmentSchema.index({ course: 1 });
assignmentSchema.index({ "status.user": 1 });

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
