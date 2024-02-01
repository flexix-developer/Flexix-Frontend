import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home-Page";
import LoginPage from "./pages/Login-Page";
import TutorialPage from "./pages/Tutorial-Page";
import ForgotPasswordPage from "./pages/ForgotPassword-Page";
import RegisterPage from "./pages/Register-Page";
import PlatformPage from "./pages/Platform-Page";
import DesignPage from "./pages/Designs-Page";
import WorkspacePage from "./pages/Workspace-Page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/design" element={<DesignPage />} />
      </Routes>
    </>
  );
}

export default App;
