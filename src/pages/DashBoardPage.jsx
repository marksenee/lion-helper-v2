import React, { useEffect } from "react";
import { ContentContainer } from "../components/content_layout/styles";
import DashBoardNavigationTabs from "../components/tab/DashBoardTab";
import DashBoardComponents from "../components/dashBoard/DashBoardComponents";

const DashBoardPage = () => {
  console.log("Asdfasdfadfasd");
  //   const { fetchCourseItems } = useCourseStore();

  //   useEffect(() => {
  //     fetchCourseItems(); // 페이지가 로드될 때 과정 데이터 가져오기
  //   }, []); // Zustand에서 상태 가져오기

  return (
    <>
      {/* <GetUnCheckedComponent
          fetchData={proPage.getUnCheckedDescriptions}
          title="📌 미체크 항목"
        /> */}
      {/* <GetIssuesComponent /> */}
      <ContentContainer>
        <DashBoardNavigationTabs />
        <DashBoardComponents />
      </ContentContainer>
    </>
  );
};

export default DashBoardPage;
