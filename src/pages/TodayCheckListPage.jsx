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
import CheckListGuide from "../components/guide/CheckListGuide";
import TrainRegistrationButton from "../components/button/TrainRegistrationButton";
import { useNavigate } from "react-router-dom";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  width: 886px;
  margin-bottom: 20px;
`;

const TodayCheckListPage = () => {
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    navigate("/app/registration");
  };

  return (
    <ContentContainer>
      <NavigationTabs />
      <CheckListGuide />
      <ButtonContainer>
        <CourseDropDown />
        <TrainRegistrationButton onClick={handleRegistrationClick} />
      </ButtonContainer>
      <AttendanceRecord />
      <DailyCheckList activeTab="daily" />
    </ContentContainer>
  );
};

export default TodayCheckListPage;
