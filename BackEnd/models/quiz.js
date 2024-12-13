import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
    title: { type: String, required: true }, // Title of the quiz
    description: { type: String }, // Description of the quiz
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Links quiz to a course
        required: true,
    },
    questions: [
        {
          questionText: { type: String, required: true },
          options: [
            {
              optionText: { type: String, required: true },
              isCorrect: { type: Boolean, default: false },
            },
          ],
          marks: { type: Number, default: 1 },
          validate: {
            validator: function (options) {
              return options.some((option) => option.isCorrect);
            },
            message: "Each question must have at least one correct option.",
          },
        },
      ],      
    totalMarks: { type: Number }, // Total marks for the quiz, calculated based on questions
    isActive: { type: Boolean, default: true }, // Whether the quiz is currently active
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the quiz was created
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
