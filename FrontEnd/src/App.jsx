import React, { Profiler } from 'react';
import { useRecoilValue } from 'recoil';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './Components/Home';
import { userAtom } from './atoms/userAtom'
import { Navbar } from './Components/Navbar';
import { SignUp } from './Components/SignUp';
import { Login } from './Components/Login';
import { UserProfile } from './Components/Profile'
import Contact from './Components/Contact';
import { SearchResults } from './Components/SearchResults';
import { searchQueryAtom } from './atoms/searchQueryAtom';
import  Footer  from './Components/Footer';
import CoursePage from './Components/CoursesPage';

function App() {

  const user = useRecoilValue(userAtom);
  const searchQuery = useRecoilValue(searchQueryAtom);

  return (
    <>
      <Navbar ></Navbar>
      <div className="container mx-auto p-4">
      {searchQuery &&<SearchResults />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/courses" element={<CoursePage />}/>
          <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
