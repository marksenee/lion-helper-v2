import React, { useState } from "react";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdAdminPanelSettings,
  MdAnnouncement,
} from "react-icons/md";
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

const Header = () => {
  // const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 가져오기

  // 네비게이션 아이템 리스트
  const menuItems = [
    { id: "home", label: "홈", icon: <FiHome />, path: "/" },
    {
      id: "checklist",
      label: "체크리스트",
      icon: <MdDashboard />,
      path: "/checklist/today",
    },
    // {
    //   id: "dashboard",
    //   label: "대시보드",
    //   icon: <MdDashboard />,
    //   path: "/dashboard",
    // },
    {
      id: "admin",
      label: "어드민",
      icon: <MdAdminPanelSettings />,
      path: "/admin/teamTask",
    },
    {
      id: "notice",
      label: "공지사항",
      icon: <MdAnnouncement />,
      path: "/notice",
    },
  ];

  // 현재 URL과 일치하는 메뉴 아이템 찾기 (없으면 기본값 "home")
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
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }} // 클릭 가능하게 설정
        />{" "}
        {/* <Title>000님의 라이언헬퍼</Title> */}
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
              <Icon active={active === item.id}>{item.icon}</Icon>{" "}
              {/* Icon에도 active 적용 */}
              {item.label}
            </NavItem>
          ))}
        </NavList>
      </Sidebar>
    </Layout>
  );
};

export default Header;
