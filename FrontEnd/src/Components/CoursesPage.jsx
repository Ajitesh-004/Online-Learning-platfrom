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
import FullStack from "../assets/thumbnails/FullStack.jpg";
import Cyber from "../assets/thumbnails/Cyber.jpg";

const CoursePage = () => {
  const [courses, setCourses] = useRecoilState(coursesAtom);
  const navigate = useNavigate();

  // Map thumbnail keys to imported assets
  const thumbnailMap = {
    FullStack,
    Cyber,
  };

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
    navigate(`/course/${courseId}`);
  };

  const handleBuyNow = (courseId) => {
    alert(`Course with ID ${courseId} purchased!`);
    // Add actual purchase functionality here
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 min-h-screen p-5">
      <header className="text-center py-10">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Explore <span className="text-blue-600">Our Courses</span>
        </h1>
        <p className="mt-4 text-xl text-gray-700">
          Unlock your potential with courses tailored just for you.
        </p>
      </header>

      {/* Show message if no courses are available */}
      {courses.length === 0 ? (
        <div className="text-center mt-10 text-lg text-gray-600">
          <p>No courses available at the moment. Please check back later.</p>
        </div>
      ) : (
        <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <Card
              key={course._id}
              sx={{
                boxShadow: 6,
                borderRadius: 4,
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              {/* Thumbnail */}
              <CardMedia
                component="img"
                alt={course.title}
                height="200"
                image={thumbnailMap[course.thumbnail] || "default-thumbnail.jpg"}
              />

              {/* Course Details */}
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {course.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, textAlign: "center" }}>
                  {course.description.slice(0, 80)}...
                </Typography>
                <div className="mt-3 text-center">
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: course.price?.discounted ? "#2e7d32" : "#333",
                      animation: course.price?.discounted ? "bounce 1s infinite alternate" : "none",
                    }}
                  >
                    ₹{course.price?.discounted || course.price?.regular}
                  </Typography>
                  {course.price?.discounted && (
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: "line-through", color: "gray", mt: 1 }}
                    >
                      ₹{course.price.regular}
                    </Typography>
                  )}
                  {course.price?.discounted && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "green",
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                    >
                      Limited-time offer!
                    </Typography>
                  )}
                </div>
              </CardContent>

              {/* Actions */}
              <CardActions
                sx={{
                  justifyContent: "space-between",
                  px: 2,
                  pb: 2,
                  pt: 0,
                  borderTop: "1px solid #f0f0f0",
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "#1976d2",
                    color: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#1976d2",
                      color: "white",
                    },
                  }}
                  onClick={() => handleLearnMore(course._id)}
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "#d32f2f",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#b71c1c",
                    },
                  }}
                  onClick={() => handleBuyNow(course._id)}
                >
                  Buy Now
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
