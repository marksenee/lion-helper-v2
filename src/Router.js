import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NavigationTabs from "./components/tab/Tab";
import AdminNavigationTabs from "./components/tab/AdminTab";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 화면 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 로그인 후에 접근해야 할 페이지 */}
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/checklist/*" element={<NavigationTabs />} />
          <Route path="/admin/*" element={<AdminNavigationTabs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
