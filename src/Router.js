import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NavigationTabs from "./components/tab/Tab";
import AdminNavigationTabs from "./components/tab/AdminTab";
import DashBoardComponents from "./components/dashBoard/DashBoardComponents";
import DashBoardNavigationTabs from "./components/tab/DashBoardTab";
import CourseRegistrationPage from "./pages/CourseRegistrationPage";
import NoticePage from "./pages/NoticePage";
import CreateNoticeForm from "./components/notice/CreateNoticeForm";

const Router = () => {
  return (
    <Routes>
      {/* 로그인 페이지가 첫 화면 */}
      <Route path="/" element={<LoginPage />} />

      {/* 로그인 이후 접근 가능한 페이지들 */}
      <Route path="/app" element={<Layout />}>
        {/* <Route path="main" element={<MainPage />} /> */}
        <Route path="registration" element={<CourseRegistrationPage />} />
        <Route
          path="checklist/*"
          element={
            <>
              <NavigationTabs /> {/* ✅ 여기서만 렌더링! */}
              <Outlet />
            </>
          }
        />{" "}
        {/* ✅ Outlet을 사용하여 동적 렌더링 */}
        {/* <Route path="checklist/*" element={<NavigationTabs />} /> */}
        <Route path="admin/*" element={<AdminNavigationTabs />} />
        <Route path="dashboard/*" element={<DashBoardNavigationTabs />} />
        <Route path="notice" element={<NoticePage />} />
        <Route path="notice/create" element={<CreateNoticeForm />} />
      </Route>
    </Routes>
  );
};

export default Router;
