import mongoose from "mongoose";
import Quiz from "./quiz"; // Assuming you have a Quiz model

const submissionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who submitted the quiz
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz", // Reference to the quiz
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Reference to the course the quiz belongs to
    required: true,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      selectedOption: { type: String, required: true }, // User's selected option
      isCorrect: { type: Boolean, required: true }, // Whether the answer is correct
    },
  ],
  score: { type: Number, required: true, default: 0 }, // Total score achieved by the user
  totalMarks: { type: Number, required: true }, // Total marks for the quiz
  submittedAt: { type: Date, default: Date.now }, // Timestamp for submission
});

// Pre-save hook to calculate score
submissionSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const quiz = await Quiz.findById(this.quiz).populate("questions");
      if (!quiz) {
        throw new Error("Quiz not found");
      }

      // Calculate total marks
      const totalMarks = quiz.questions.reduce((sum, question) => sum + question.marks, 0);
      this.totalMarks = totalMarks;

      // Calculate score based on correct answers
      const score = this.answers.reduce((acc, answer) => {
        const question = quiz.questions.find(
          (q) => q._id.toString() === answer.question.toString()
        );
        const correctOption = question.options.find((opt) => opt.isCorrect);
        return correctOption.optionText === answer.selectedOption ? acc + question.marks : acc;
      }, 0);

      this.score = score;

      next();
    } catch (error) {
      next(error); // Pass any error to the next middleware
    }
  } else {
    next(); // Continue if the document is not new (e.g., if being updated)
  }
});

// Add unique index to prevent multiple submissions for the same quiz by the same user
submissionSchema.index({ user: 1, quiz: 1 }, { unique: true });

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
