import Submission from "../models/submission.js";
import Quiz from "../models/quiz.js";

export const submitQuiz = async (req, res) => {
  const { userId, quizId, answers } = req.body;

  if (!userId || !quizId || !answers) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch the quiz to calculate total marks
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Calculate the score
    const totalMarks = quiz.questions.reduce((sum, q) => sum + q.marks, 0);
    const score = answers.reduce((acc, ans) => {
      const question = quiz.questions.find(
        (q) => q._id.toString() === ans.question
      );
      const correctOption = question.options.find((opt) => opt.isCorrect);
      return correctOption.optionText === ans.selectedOption ? acc + question.marks : acc;
    }, 0);

    const newSubmission = new Submission({
      user: userId,
      quiz: quizId,
      course: quiz.course,
      answers: answers.map((ans) => ({
        question: ans.question,
        selectedOption: ans.selectedOption,
        isCorrect: ans.isCorrect,
      })),
      score,
      totalMarks,
    });

    await newSubmission.save();

    return res.status(201).json({
      message: "Quiz submitted successfully",
      submission: newSubmission,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getSubmission = async (req, res) => {
    const { userId, quizId } = req.params;
  
    try {
      const submission = await Submission.findOne({ user: userId, quiz: quizId }).populate("quiz").populate("user");
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
  
      return res.status(200).json(submission);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

export const getSubmissionsForQuiz = async (req, res) => {
    const { quizId } = req.params;
  
    try {
      const submissions = await Submission.find({ quiz: quizId }).populate("user");
      if (!submissions || submissions.length === 0) {
        return res.status(404).json({ message: "No submissions found" });
      }
  
      return res.status(200).json(submissions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
};
  