import React, { useEffect, useState } from "react";
import axios from "axios";

const ContentPage = () => {
    const [courses, setCourses] = useState([]); // Store all courses
    const [contentList, setContentList] = useState([]); // Store course content
    const [selectedCourse, setSelectedCourse] = useState(null); // Currently selected course
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/courses/getcourses");
                setCourses(response.data);
            } catch (err) {
                console.error("Error fetching courses:", err);
                setError("Failed to load courses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseClick = async (course) => {
        setSelectedCourse(course); // Set the selected course
        setContentList([]); // Clear previous content
        setLoading(true); // Show loading spinner while fetching content
        try {
            const response = await axios.get(`http://localhost:3000/api/content/getcontent/${course._id}`);
            setContentList(response.data);
        } catch (err) {
            console.error("Error fetching content:", err);
            setError("Failed to load content. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackToCourses = () => {
        setSelectedCourse(null); // Deselect the course to show the course list again
        setContentList([]);
    };

    if (loading && !selectedCourse) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-600">Loading courses...</p>
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
        <div className="bg-gray-100 min-h-screen p-5">
            <header className="text-center py-10">
                <h1 className="text-4xl font-bold text-gray-800">
                    {selectedCourse ? "Course Content" : "Available Courses"}
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    {selectedCourse
                        ? `Access all learning materials for "${selectedCourse.title}".`
                        : "Select a course to view its content."}
                </p>
            </header>

            {selectedCourse ? (
                <>
                    <button
                        onClick={handleBackToCourses}
                        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Back to Courses
                    </button>
                    {contentList.length === 0 ? (
                        <div className="text-center py-20 text-gray-600">
                            <p>No content available for this course. Please check back later.</p>
                        </div>
                    ) : (
                        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contentList.map((content) => (
                                <div
                                    key={content._id}
                                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                                >
                                    <h3 className="text-xl font-bold text-gray-800">{content.title}</h3>
                                    <p className="mt-2 text-gray-600">{content.description}</p>
                                    <p className="mt-4 text-gray-500">
                                        <span className="font-bold">Type:</span> {content.type}
                                    </p>
                                    {content.type === "video" && (
                                        <a
                                            href={content.resource.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block mt-4 text-blue-600 hover:underline"
                                        >
                                            Watch Video
                                        </a>
                                    )}
                                    {content.type === "pdf" && (
                                        <a
                                            href={content.resource.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block mt-4 text-blue-600 hover:underline"
                                        >
                                            View PDF
                                        </a>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}
                </>
            ) : (
                <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
                            onClick={() => handleCourseClick(course)}
                        >
                            <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                            <p className="mt-2 text-gray-600">{course.description}</p>
                            <p className="mt-4 text-gray-500">
                                <span className="font-bold">Category:</span> {course.category}
                            </p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default ContentPage;
