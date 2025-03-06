import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NavigationTabs from "./components/tab/Tab";
import Header from "./components/header/Header";
import AdminNavigationTabs from "./components/tab/AdminTab";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/checklist/*" element={<NavigationTabs />} />
        <Route path="/admin/*" element={<AdminNavigationTabs />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/notice" element={<NoticePage />} /> */}
        {/* NavigationTabs가 포함된 페이지 */}
        {/* <Route path="/checklist/*" element={<NavigationTabs />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
