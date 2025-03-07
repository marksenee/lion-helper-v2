import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NavigationTabs from "./components/tab/Tab";
import AdminNavigationTabs from "./components/tab/AdminTab";
import useAuthStore from "./\bstore/useAuthStore";

const ProtectRouter = ({ children }) => {
  const { username } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 세션 스토리지가 제대로 반영될 때까지 로딩 유지
    const timeout = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <div>로딩 중...</div>;

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 로그인 필요 페이지 */}
        <Route
          path="/"
          element={
            <ProtectRouter>
              <Layout />
            </ProtectRouter>
          }
        >
          <Route index element={<MainPage />} />
          <Route path="checklist/*" element={<NavigationTabs />} />
          <Route path="admin/*" element={<AdminNavigationTabs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
