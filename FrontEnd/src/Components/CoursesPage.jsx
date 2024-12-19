import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { coursesAtom } from "../atoms/coursesAtom";
import { profileAtom } from "../atoms/profileAtom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FullStack from "../assets/thumbnails/FullStack.jpg";
import Cyber from "../assets/thumbnails/Cyber.jpg";
import { userAtom } from "../atoms/userAtom";

const CoursePage = () => {
  const [courses, setCourses] = useRecoilState(coursesAtom);
  const [user] = useRecoilState(userAtom); // Get user data
  const [selectedCourse, setSelectedCourse] = useState(null); // Track the selected course for payment
  const [open, setOpen] = useState(false); // Modal state
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

  const handleBuyNow = (course) => {
    setSelectedCourse(course);
    setOpen(true); // Open the modal
  };

  const handlePayment = async () => {
    if (!user) {
      alert("Please log in to complete your purchase.");
      return;
    }

    try {
      // Simulate payment process
      const paymentData = {
        userId: user.userId,
        courseId: selectedCourse._id,
        amount: selectedCourse.price.discounted || selectedCourse.price.regular,
        paymentMethod: "credit_card",
        transactionId: `TXN${Date.now()}`, // Generate a unique transaction ID
      };

      const response = await axios.post("http://localhost:3000/api/payments/createpayment", paymentData);

      if (response.status === 201) {
        alert("Payment successful!");
        setOpen(false); // Close the modal
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("An error occurred during payment.");
    }
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
              <CardMedia
                component="img"
                alt={course.title}
                height="200"
                image={thumbnailMap[course.thumbnail] || "default-thumbnail.jpg"}
              />
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
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 1, textAlign: "center" }}
                >
                  {course.description.slice(0, 80)}...
                </Typography>
                <div className="mt-3 text-center">
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: course.price?.discounted ? "#2e7d32" : "#333",
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
                </div>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2, pt: 0 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleLearnMore(course._id)}
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleBuyNow(course)}
                >
                  Buy Now
                </Button>
              </CardActions>
            </Card>
          ))}
        </section>
      )}

      {/* Payment Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Confirm Purchase
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to purchase <strong>{selectedCourse?.title}</strong> for ₹
            {selectedCourse?.price.discounted || selectedCourse?.price.regular}?
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="success" onClick={handlePayment}>
              Confirm
            </Button>
            <Button variant="outlined" color="error" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CoursePage;
