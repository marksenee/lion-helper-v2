import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NavigationTabs from "./components/tab/Tab";
import AdminNavigationTabs from "./components/tab/AdminTab";
import DashBoardComponents from "./components/dashBoard/DashBoardComponents";
import DashBoardNavigationTabs from "./components/tab/DashBoardTab";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지가 첫 화면 */}
        <Route path="/" element={<LoginPage />} />

        {/* 로그인 이후 접근 가능한 페이지들 */}
        <Route path="/app" element={<Layout />}>
          <Route path="main" element={<MainPage />} />
          <Route path="checklist/*" element={<NavigationTabs />} />
          <Route path="admin/*" element={<AdminNavigationTabs />} />
          <Route path="dashboard/*" element={<DashBoardNavigationTabs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
