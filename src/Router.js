import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProPage from "./pages/ProPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/pro" element={<ProPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
