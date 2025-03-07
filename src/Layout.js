import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/loginpage"]; // 헤더를 숨길 경로 목록

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Outlet />
    </>
  );
};

export default Layout;
