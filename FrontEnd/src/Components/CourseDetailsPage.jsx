import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { coursesAtom } from "../atoms/coursesAtom";
import FullStack from "../assets/thumbnails/FullStack.jpg";
import Cyber from "../assets/thumbnails/Cyber.jpg";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const courses = useRecoilValue(coursesAtom);
  const setCourses = useSetRecoilState(coursesAtom);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Try to find the course in Recoil state
    const foundCourse = courses.find((c) => c._id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      // Fetch course data if not found in Recoil
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/courses/getcourses`);
          setCourses(response.data);
          const fetchedCourse = response.data.find((c) => c._id === courseId);
          setCourse(fetchedCourse || null);
        } catch (error) {
          console.error("Error fetching course:", error);
        }
      };
      fetchCourse();
    }
  }, [courseId, courses, setCourses]);

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <p className="text-2xl font-bold">Course not found. Please check back later.</p>
      </div>
    );
  }

  const thumbnailMap = {
    FullStack,
    Cyber,
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      {/* Course Header */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
        <p className="mt-2 text-lg font-semibold text-blue-600">{course.category}</p>
        <p className="mt-4 text-lg text-gray-600">{course.description}</p>
      </header>

      {/* Course Details Section */}
      <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Thumbnail */}
        <img
          src={thumbnailMap[course.thumbnail]} // Adjust to your image path
          alt={course.title}
          className="w-full h-auto rounded-lg"
        />

        {/* Overview */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Duration</h3>
            <p className="text-gray-600">{course.duration.weeks} weeks</p>
            <p className="text-gray-600">{course.duration.hoursOfContent} hours of content</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Difficulty Level</h3>
            <p className="text-gray-600">{course.difficultyLevel}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Enrollments</h3>
            <p className="text-gray-600">{course.enrollments || 0} students</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Ratings</h3>
            <p className="text-gray-600">{course.ratings.average || 0} / 5</p>
            <p className="text-gray-500 text-sm">({course.ratings.count || 0} reviews)</p>
          </div>
        </div>

        {/* Modules */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800">What You'll Learn</h2>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            {course.modules.map((module, index) => (
              <li key={index} className="mt-1">{module}</li>
            ))}
          </ul>
        </div>

        {/* Pricing and Buy Button */}
        <div className="mt-10 text-center">
          <div className="text-3xl font-bold text-gray-800">
            ₹{course.price?.discounted || course.price?.regular}
            {course.price?.discounted && (
              <span className="text-gray-500 text-xl line-through ml-2">
                ₹{course.price.regular}
              </span>
            )}
          </div>
          <p className="text-sm text-green-600 font-semibold">
            {course.price?.discounted && "Limited time offer! Enroll now to save."}
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 mt-6 rounded-lg shadow-lg">
            Buy Course
          </button>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsPage;
