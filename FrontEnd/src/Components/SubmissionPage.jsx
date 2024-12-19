import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";

const SubmissionPage = () => {
    const user = useRecoilValue(userAtom); // Get the logged-in user from global state
    const [quizzes, setQuizzes] = useState([]); // Store quizzes
    const [submissions, setSubmissions] = useState([]); // Store submissions
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAnswers, setShowAnswers] = useState({}); // Store which answers are visible

    useEffect(() => {
        const fetchQuizzesAndSubmissions = async () => {
            if (!user || !user.userId) {
                setError("User not logged in. Please log in to view submissions.");
                setLoading(false);
                return;
            }

            try {
                // Fetch all quizzes (this can be based on a course or other criteria)
                const quizResponse = await axios.get("http://localhost:3000/api/quiz/getAllQuiz");
                setQuizzes(quizResponse.data);

                // Fetch submissions for each quiz
                const submissionPromises = quizResponse.data.map(async (quiz) => {
                    const response = await axios.get(
                        `http://localhost:3000/api/submissions/getSubmission/${user.userId}/${quiz._id}`
                    );
                    return { quiz, submission: response.data };
                });

                // Wait for all submission data to be fetched
                const submissionData = await Promise.all(submissionPromises);
                setSubmissions(submissionData);

            } catch (err) {
                console.error("Error fetching quizzes and submissions:", err);
                setError("Failed to load quizzes and submissions. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzesAndSubmissions();
    }, [user]);

    const handleShowAnswers = (quizId) => {
        setShowAnswers((prevState) => ({
            ...prevState,
            [quizId]: !prevState[quizId],
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-600">Loading submissions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="py-10 bg-purple-600 text-white text-center">
                <h1 className="text-4xl font-bold">My Submissions</h1>
                <p className="mt-2 text-lg">Review your quiz submissions and scores.</p>
            </header>

            <main className="max-w-5xl mx-auto p-6 space-y-4">
                {submissions.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">
                        No submissions found. Start by taking a quiz!
                    </p>
                ) : (
                    submissions.map(({ quiz, submission }) => (
                        <div
                            key={submission._id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {quiz.title}
                            </h2>
                            <p className="text-gray-600 text-lg">
                                <span className="font-semibold">Score:</span>{" "}
                                {submission.score}/{submission.totalMarks}
                            </p>
                            <p className="text-gray-600 text-lg">
                                <span className="font-semibold">Submitted On:</span>{" "}
                                {new Date(submission.submittedAt).toLocaleDateString()}{" "}
                                {new Date(submission.submittedAt).toLocaleTimeString()}
                            </p>

                            {/* Button to toggle the answer visibility */}
                            <button
                                onClick={() => handleShowAnswers(quiz._id)}
                                className="mt-4 text-blue-600 hover:underline"
                            >
                                {showAnswers[quiz._id] ? "Hide Answers" : "See Answers"}
                            </button>

                            {/* Display the detailed answers for each question if toggled */}
                            {showAnswers[quiz._id] && (
                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-gray-800">Answer Details:</h3>
                                    <div className="space-y-4">
                                        {submission.answers.map((answer, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-100 p-4 rounded-lg shadow-sm"
                                            >
                                                <h4 className="font-semibold text-gray-800">
                                                    Question {index + 1}: {quiz.questions[index].questionText}
                                                </h4>
                                                <p className="text-gray-600">
                                                    <span className="font-semibold">Your Answer:</span>{" "}
                                                    {answer.selectedOption}
                                                </p>
                                                <p
                                                    className={`text-lg font-semibold ${
                                                        answer.isCorrect ? "text-green-500" : "text-red-500"
                                                    }`}
                                                >
                                                    {answer.isCorrect ? "Correct" : "Incorrect"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

export default SubmissionPage;
