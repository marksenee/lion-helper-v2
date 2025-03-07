import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NavigationTabs from "./components/tab/Tab";
import AdminNavigationTabs from "./components/tab/AdminTab";
import ProtectedRouter from "/Users/parkseeun/Projects/lion-helper-v2/src/ProtectedRouter.js";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ 로그인 필요 페이지 (ProtectedRoute로 감싸기) */}
        <Route element={<ProtectedRouter />}>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/checklist/*" element={<NavigationTabs />} />
            <Route path="/admin/*" element={<AdminNavigationTabs />} />
          </Route>
        </Route>

        {/* 개별적으로 관리할 페이지 (헤더 제외) */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
