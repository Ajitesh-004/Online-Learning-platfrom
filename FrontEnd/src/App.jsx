import React from 'react';
import { useRecoilValue } from 'recoil';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './Components/Home';
import { userAtom } from './atoms/userAtom';
import { Navbar } from './Components/Navbar';
import { SignUp } from './Components/SignUp';
import { Login } from './Components/Login';
import { UserProfile } from './Components/Profile';
import Contact from './Components/Contact';
import { SearchResults } from './Components/SearchResults';
import { searchQueryAtom } from './atoms/searchQueryAtom';
import Footer from './Components/Footer';
import CoursePage from './Components/CoursesPage';
import CourseDetailsPage from './Components/CourseDetailsPage';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="container mx-auto p-4">{children}</div>
    <Footer />
  </>
);

function App() {
  const user = useRecoilValue(userAtom);
  const searchQuery = useRecoilValue(searchQueryAtom);

  return (
    <Routes>
      {/* Search Results */}
      {searchQuery && <Route path="*" element={<Layout><SearchResults /></Layout>} />}

      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/signup" element={<Layout><SignUp /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/courses" element={<Layout><CoursePage /></Layout>} />
      <Route path="/course/:courseId" element={<Layout><CourseDetailsPage /></Layout>} />

      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          user ? (
            <Layout><UserProfile /></Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
