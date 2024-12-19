import React from "react";
import { useRecoilValue } from "recoil";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { userAtom } from "./atoms/userAtom";
import { Navbar } from "./Components/Navbar";
import { SignUp } from "./Components/SignUp";
import { Login } from "./Components/Login";
import { UserProfile } from "./Components/Profile";
import Contact from "./Components/Contact";
import { SearchResults } from "./Components/SearchResults";
import { searchQueryAtom } from "./atoms/searchQueryAtom";
import Footer from "./Components/Footer";
import CoursePage from "./Components/CoursesPage";
import CourseDetailsPage from "./Components/CourseDetailsPage";
import PaymentHistoryPage from "./Components/PaymentHistoryPage"; // New import
import SubmissionPage from "./Components/SubmissionPage"; // New import
import CertificatePage from "./Components/CertificatePage"; // New import
import ContentPage from "./Components/ContentPage"; // New import
import QuizPage from "./Components/QuizPage"; // New import
import { Home } from "./Components/Home";
import { About } from "./Components/About";

function App() {
  const user = useRecoilValue(userAtom);
  const searchQuery = useRecoilValue(searchQueryAtom);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {searchQuery && <SearchResults />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/course/:courseId" element={<CourseDetailsPage />} />
          <Route
            path="/profile"
            element={user ? <UserProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/payments"
            element={user ? <PaymentHistoryPage /> : <Navigate to="/login" />} // Payment History route
          />
          <Route
            path="/submissions"
            element={user ? <SubmissionPage /> : <Navigate to="/login" />} // Submissions route
          />
          <Route
            path="/certificates"
            element={user ? <CertificatePage /> : <Navigate to="/login" />} // Certificates route
          />
          <Route
            path="/content"
            element={user ? <ContentPage /> : <Navigate to="/login" />} // Course Content route
          />
          <Route
            path="/quizzes"
            element={user ? <QuizPage /> : <Navigate to="/login" />} // Quizzes route
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
