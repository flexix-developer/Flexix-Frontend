import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home-Page';
import LoginPage from './pages/Login-Page';
import TutorialPage from './pages/Tutorial-Page';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
       </Routes>
    </>
 );
};

export default App;
