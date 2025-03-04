import React from "react";
import {
  ContentContainer,
  PageContainer,
} from "../components/content_layout/styles";
import styled from "styled-components";

import CourseDropDown from "../components/course/CourseDropDown";
import AttendanceRecord from "../components/Attendance/Attendance";
import DailyCheckList from "../components/checkBox/DailyCheckList";
import Header from "../components/header/Header";
import NavigationTabs from "../components/tab/Tab";

// const LayoutContainer = styled.div`
//   display: flex;
//   /* min-height: 100vh; */
// `;

const TodayCheckListPage = () => {
  return (
    <ContentContainer>
      <NavigationTabs />
      <CourseDropDown />
      <AttendanceRecord />
      <DailyCheckList activeTab="daily" />
    </ContentContainer>
  );
};

export default TodayCheckListPage;
