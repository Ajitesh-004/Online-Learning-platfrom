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
        },
    ],
    totalMarks: { type: Number }, // Total marks for the quiz, calculated based on questions
    isActive: { type: Boolean, default: true }, // Whether the quiz is currently active
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the quiz was created
});

// Custom validation for each question to ensure it has at least one correct option
quizSchema.pre('save', function(next) {
    this.questions.forEach((question) => {
        const correctOption = question.options.find(option => option.isCorrect);
        if (!correctOption) {
            const error = new Error("Each question must have at least one correct option.");
            return next(error); // If no correct option, return error
        }
    });
    next(); // Continue with save if all validations pass
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
