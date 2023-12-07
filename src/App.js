import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home-Page";
import LoginPage from "./pages/Login-Page";
import TutorialPage from "./pages/Tutorial-Page";
import ForgotPasswordPage from "./pages/ForgotPassword-Page";
import RegisterPage from "./pages/Register-Page";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
