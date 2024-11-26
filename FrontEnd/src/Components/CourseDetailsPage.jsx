import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { coursesAtom } from "../atoms/coursesAtom";

const CourseDetailsPage = () => {
  const { id } = useParams(); // Course ID from URL
  const courses = useRecoilValue(coursesAtom); // Access courses from Recoil state
  const course = courses.find((c) => c._id === id); // Find course by ID

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
        <p className="mt-4 text-lg text-gray-600">{course.description}</p>
      </header>

      <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <img
          src={`/assets/thumbnails/${course.thumbnail}`} // Adjust to your image path
          alt={course.title}
          className="w-full h-auto rounded-lg"
        />
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Modules</h2>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            {course.modules.map((module, index) => (
              <li key={index}>{module}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Buy Course
          </button>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsPage;
