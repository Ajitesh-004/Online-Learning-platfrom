import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { coursesAtom } from "../atoms/coursesAtom";
import { userAtom } from "../atoms/userAtom";

const QuizPage = () => {
    const user = useRecoilValue(userAtom);
    const courses = useRecoilValue(coursesAtom); // Get all courses
    const [selectedCourseId, setSelectedCourseId] = useState(""); // Selected course ID
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null); // Currently selected quiz
    const [answers, setAnswers] = useState({}); // User's selected answers
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);

    // Fetch quizzes based on courseId
    const fetchQuizzes = async (courseId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/quiz/getQuizByCourse/${courseId}`);
            setQuizzes(response.data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCourseSelect = (event) => {
        const courseId = event.target.value;
        setSelectedCourseId(courseId);
        setSelectedQuiz(null);
        setSubmitted(false);
        setScore(null);
        if (courseId) {
            fetchQuizzes(courseId);
        } else {
            setQuizzes([]);
        }
    };

    const handleTakeQuiz = async (quizId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/quiz/getQuizById/${quizId}`);
            setSelectedQuiz(response.data); // Load the selected quiz
            setAnswers({}); // Reset answers
            setSubmitted(false);
        } catch (error) {
            console.error("Error fetching quiz details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionChange = (questionId, optionText) => {
        setAnswers({ ...answers, [questionId]: optionText });
    };

    const handleSubmit = async () => {
        const userId = user.userId; // Replace with logged-in user's ID
        const payload = {
            userId,
            quizId: selectedQuiz._id,
            answers: selectedQuiz.questions.map((question) => ({
                question: question._id,
                selectedOption: answers[question._id] || "",
                isCorrect: question.options.some(
                    (opt) => opt.optionText === answers[question._id] && opt.isCorrect
                ),
            })),
        };

        try {
            const response = await axios.post("http://localhost:3000/api/submissions/submitquiz", payload);
            setScore(response.data.submission.score);
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-5">
            <header className="text-center py-10">
                <h1 className="text-4xl font-bold text-gray-800">Course Quizzes</h1>
                <p className="mt-4 text-lg text-gray-600">
                    {selectedQuiz ? "Answer the questions below" : "Select a course to view quizzes."}
                </p>
            </header>

            {/* Course Selection */}
            {!selectedQuiz && (
                <div className="text-center mb-6">
                    <select
                        value={selectedCourseId}
                        onChange={handleCourseSelect}
                        className="p-2 border rounded-lg"
                    >
                        <option value="">Select a course</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center py-10 text-gray-600">
                    <p>Loading...</p>
                </div>
            )}

            {/* Quizzes List */}
            {!loading && !selectedQuiz && quizzes.length > 0 && (
                <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz._id}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                        >
                            <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
                            <p className="mt-2 text-gray-600">{quiz.description}</p>
                            <button
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                onClick={() => handleTakeQuiz(quiz._id)}
                            >
                                Take Quiz
                            </button>
                        </div>
                    ))}
                </section>
            )}

            {/* Quiz Taking Section */}
            {selectedQuiz && !submitted && (
                <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">{selectedQuiz.title}</h2>
                    {selectedQuiz.questions.map((question) => (
                        <div key={question._id} className="mb-6">
                            <p className="text-lg font-semibold">{question.questionText}</p>
                            {question.options.map((option, index) => (
                                <div key={index} className="mt-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name={question._id}
                                            value={option.optionText}
                                            onChange={() => handleOptionChange(question._id, option.optionText)}
                                            checked={answers[question._id] === option.optionText}
                                            className="mr-2"
                                        />
                                        {option.optionText}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </button>
                </section>
            )}

            {/* Quiz Result */}
            {submitted && (
                <div className="text-center py-10">
                    <h2 className="text-3xl font-bold text-gray-800">Quiz Submitted!</h2>
                    <p className="text-lg mt-4">Your Score: <span className="font-bold">{score}</span></p>
                </div>
            )}

            {/* No Quizzes */}
            {!loading && !selectedQuiz && quizzes.length === 0 && selectedCourseId && (
                <div className="text-center py-10 text-gray-600">
                    <p>No quizzes available for this course.</p>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
