import React, { useEffect, useState } from "react";
import { Wrapper, TabContainer, TabItem } from "./styles";
import TodayCheckListPage from "../../pages/TodayCheckListPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import WeeklyCheckListPage from "../../pages/WeeklyCheckListPage";
import DashBoardPage from "../../pages/DashBoardPage";

const tabs = [
  { name: "주간", path: "/app/dashboard/weekly" },
  { name: "월간", path: "/app/dashboard/monthly" },
  // { name: "미체크 항목", path: "/checklist/unchecked" },
];

const DashBoardNavigationTabs = () => {
  const [selectedTab, setSelectedTab] = useState("주간");
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 정보를 가져옴

  // 현재 경로에 맞는 탭을 선택하도록 useEffect 사용
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes("weekly")) {
      setSelectedTab("주간");
    } else if (currentPath.includes("monthly")) {
      setSelectedTab("월간");
    }
    // else if (currentPath.includes("unchecked")) {
    //   setSelectedTab("미체크 항목");
    // }
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
        <Route path="weekly" element={<DashBoardPage />} />
        <Route path="monthly" element={<DashBoardPage />} />
        {/* <Route path="unchecked" element={<ProUncheckedPage />} /> */}
      </Routes>
    </>
  );
};

export default DashBoardNavigationTabs;
