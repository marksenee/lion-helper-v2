import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import NavigationTabs from "./components/tab/Tab";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/loginpage"]; // 헤더를 숨길 경로 목록

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
