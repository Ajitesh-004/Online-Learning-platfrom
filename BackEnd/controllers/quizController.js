import Quiz from "../models/quiz.js";

export const addQuiz = async (req, res) => {
    const { title, description, courseId, questions } = req.body;

    if (!title || !courseId || !questions || questions.length === 0) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newQuiz = new Quiz({
        title,
        description,
        course: courseId,
        questions,
        });

        await newQuiz.save();
        return res.status(201).json({ message: "Quiz added successfully", quiz: newQuiz });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getQuizByCourse = async (req, res) => {
    const { courseId } = req.params;
  
    try {
      const quizzes = await Quiz.find({ course: courseId, isActive: true });
      if (!quizzes || quizzes.length === 0) {
        return res.status(404).json({ message: "No quizzes found for this course" });
      }
  
      return res.status(200).json(quizzes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
  
    try {
      const quiz = await Quiz.findByIdAndDelete(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
  
      return res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
};
  