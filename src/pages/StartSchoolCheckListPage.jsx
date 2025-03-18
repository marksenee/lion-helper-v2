import React from "react";
import { ContentContainer } from "../components/content_layout/styles";

import CourseDropDown from "../components/course/CourseDropDown";
import DailyCheckList from "../components/checkBox/DailyCheckList";
import NavigationTabs from "../components/tab/Tab";
import CheckListGuide from "../components/guide/CheckListGuide";

const StartSchoolCheckListPage = () => {
  return (
    <ContentContainer>
      <NavigationTabs />
      <CheckListGuide />
      <CourseDropDown />
      <DailyCheckList activeTab="2weeks" />
    </ContentContainer>
  );
};

export default StartSchoolCheckListPage;
