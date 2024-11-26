import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { coursesAtom } from "../atoms/coursesAtom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CoursePage = () => {
  const [courses, setCourses] = useRecoilState(coursesAtom); // Recoil state for courses
  const navigate = useNavigate();

  // Fetch data only if not already fetched
  useEffect(() => {
    if (courses.length === 0) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/courses/getcourses");
          setCourses(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
      fetchCourses();
    }
  }, [courses, setCourses]);

  const handleLearnMore = (courseId) => {
    navigate(`/course/${courseId}`); // Navigate to details page
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">Our Courses</h1>
        <p className="mt-4 text-lg text-gray-600">
          Explore our wide range of courses and find the right one for you.
        </p>
      </header>

      {/* Show message if no courses are available */}
      {courses.length === 0 ? (
        <div className="text-center mt-10 text-lg text-gray-600">
          <p>No courses available at the moment. Please check back later.</p>
        </div>
      ) : (
        <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card key={course._id} sx={{ maxWidth: 345, mx: "auto" }}>
              <CardMedia
                component="img"
                alt={course.title}
                height="140"
                image={`/assets/thumbnails/${course.thumbnail}`} // Adjust to your image path
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {course.description.slice(0, 100)}... {/* Short description */}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleLearnMore(course._id)}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
};

export default CoursePage;
