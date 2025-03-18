import React from "react";
import { ContentContainer } from "../components/content_layout/styles";

import CourseDropDown from "../components/course/CourseDropDown";
import DailyCheckList from "../components/checkBox/DailyCheckList";
import NavigationTabs from "../components/tab/Tab";
import CheckListGuide from "../components/guide/CheckListGuide";

const RecruitCheckListPage = () => {
  return (
    <ContentContainer>
      <NavigationTabs />
      <CheckListGuide />
      <CourseDropDown />
      <DailyCheckList activeTab="recruit" />
    </ContentContainer>
  );
};

export default RecruitCheckListPage;
