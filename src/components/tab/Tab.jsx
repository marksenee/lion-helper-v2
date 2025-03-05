import React, { useEffect, useState } from "react";
import { Content, Wrapper, TabContainer, TabItem } from "./styles";
import DailyCheckList from "../checkBox/DailyCheckList";
import TodayCheckListPage from "../../pages/TodayCheckListPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import WeeklyCheckListPage from "../../pages/WeeklyCheckListPage";
import ProUncheckedPage from "../../pages/ProUncheckedPage";

// 페이지 내용 컴포넌트
const MonthlyPage = () => <Content>🗓️ 월간 페이지</Content>;
const OtherPage = () => <Content>🔍 기타 페이지</Content>;

const tabs = [
  { name: "오늘", path: "/checklist/today" },
  { name: "주간", path: "/checklist/weekly" },
  // { name: "미체크 항목", path: "/checklist/unchecked" },
];

const NavigationTabs = () => {
  const [selectedTab, setSelectedTab] = useState("오늘");
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 정보를 가져옴

  // 현재 경로에 맞는 탭을 선택하도록 useEffect 사용
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes("today")) {
      setSelectedTab("오늘");
    } else if (currentPath.includes("weekly")) {
      setSelectedTab("주간");
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
        <Route path="today" element={<TodayCheckListPage />} />
        <Route path="weekly" element={<WeeklyCheckListPage />} />
        {/* <Route path="unchecked" element={<ProUncheckedPage />} /> */}
      </Routes>
    </>
  );
};

export default NavigationTabs;
