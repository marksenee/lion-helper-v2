import React, { useEffect, useState } from "react";
import { TabContainer, TabItem, Wrapper } from "./styles";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AdminPage from "../../pages/AdminPage";
import UncheckedPage from "../../pages/UncheckedPage";

const tabs = [
  { name: "팀 업무 현황", path: "/app/admin/teamTask" },
  { name: "미체크 항목", path: "/app/admin/uncheckedTask" },
];

const AdminNavigationTabs = () => {
  const [selectedTab, setSelectedTab] = useState("팀 업무 현황");
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 정보를 가져옴

  // 현재 경로에 맞는 탭을 선택하도록 useEffect 사용
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes("teamTask")) {
      setSelectedTab("팀 업무 현황");
    } else if (currentPath.includes("uncheckedTask")) {
      setSelectedTab("미체크 항목");
    }
  }, [location.pathname]); // 경로가 바뀔 때마다 실행

  return (
    <>
      {/* 네비게이션 탭 */}
      <Wrapper>
        <TabContainer>
          {tabs.map((tab) => (
            <TabItem
              key={tab.name}
              active={selectedTab === tab.name}
              onClick={() => {
                setSelectedTab(tab.name);
                {
                  /* 클릭 시 selectedTab 업데이트 */
                }
                navigate(tab.path);
                {
                  /* 페이지 이동 */
                }
              }}
            >
              {tab.name}
            </TabItem>
          ))}
        </TabContainer>
      </Wrapper>

      {/* 선택된 탭에 따라 다른 페이지 표시 */}
      <Routes>
        <Route path="teamTask" element={<AdminPage />} />
        <Route path="uncheckedTask" element={<UncheckedPage />} />
      </Routes>
    </>
  );
};

export default AdminNavigationTabs;
