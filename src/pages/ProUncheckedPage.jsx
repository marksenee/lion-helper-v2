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
import GetUnCheckedComponent from "../components/admin/unchecked/GetUnChecked";

// const LayoutContainer = styled.div`
//   display: flex;
//   /* min-height: 100vh; */
// `;

const ProUncheckedPage = () => {
  return (
    <ContentContainer>
      <NavigationTabs />
      {/* <CourseDropDown /> */}
      <GetUnCheckedComponent />
    </ContentContainer>
  );
};

export default ProUncheckedPage;
