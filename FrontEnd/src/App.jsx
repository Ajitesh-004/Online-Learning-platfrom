import React, { Profiler } from 'react';
import { useRecoilValue } from 'recoil';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './Components/Home';
import { userAtom } from './atoms/userAtom'
import { Navbar } from './Components/Navbar';
import { SignUp } from './Components/SignUp';
import { Login } from './Components/Login';
import { UserProfile } from './Components/Profile'

function App() {

  const user = useRecoilValue(userAtom);

  return (
    <>
      <Navbar ></Navbar>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/profile' element={<UserProfile />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
