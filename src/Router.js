import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProPage from "./pages/ProPage";
import AdminPage from "./pages/AdminPage";
import MainPage from "./pages/MainPage";
import NoticePage from "./pages/NoticePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pro" element={<ProPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notice" element={<NoticePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
