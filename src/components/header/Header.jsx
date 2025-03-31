import React, { useState } from "react";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { MdDashboard, MdAdminPanelSettings } from "react-icons/md";
import { BiBarChart } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Layout,
  Sidebar,
  Content,
  Logo,
  Title,
  NavList,
  NavItem,
  Icon,
} from "./styles";
import useAuthStore from "../../\bstore/useAuthStore";
import { Outlet } from "react-router-dom"; // ✅ Outlet을 가져오기!

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, logout } = useAuthStore();

  // 네비게이션 아이템 리스트 - /app 경로로 수정
  const menuItems = [
    // { id: "home", label: "홈", icon: <FiHome />, path: "/app" },
    {
      id: "trainRegistration",
      label: "훈련과정 등록",
      icon: <MdDashboard />,
      path: "/app/registration",
    },
    {
      id: "checklist",
      label: "체크리스트",
      icon: <MdDashboard />,
      path: "/app/checklist/today",
    },
    {
      id: "admin",
      label: "어드민",
      icon: <MdAdminPanelSettings />,
      path: "/app/admin/teamTask",
    },
    // {
    //   id: "dashboard",
    //   label: "대시보드",
    //   icon: <BiBarChart />,
    //   path: "/app/dashboard/weekly",
    // },
  ];

  const currentMenuItem = menuItems.find((item) =>
    location.pathname.startsWith(item.path)
  );
  const [active, setActive] = useState(
    currentMenuItem ? currentMenuItem.id : "home"
  );

  return (
    <Layout>
      <Sidebar>
        <Logo
          src={process.env.PUBLIC_URL + "/likelion_logo.png"}
          alt="Logo"
          onClick={() => navigate("/app")}
          style={{ cursor: "pointer" }}
        />
        {/* <Title>{username}님의 라이언헬퍼</Title> */}
        <NavList>
          {menuItems.map((item) => (
            <NavItem
              key={item.id}
              active={active === item.id}
              onClick={() => {
                setActive(item.id);
                navigate(item.path);
              }}
            >
              <Icon active={active === item.id}>{item.icon}</Icon>
              {item.label}
            </NavItem>
          ))}
        </NavList>
      </Sidebar>
    </Layout>
  );
};

export default Header;
