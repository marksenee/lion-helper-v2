import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import { proPage } from "../apis/api";
import GetIssueUnCheckData from "../components/admin/unchecked/GetUnChecked";
import TableComponents from "../components/admin/table/Table";
import GetIssuesComponent from "../components/admin/issues/GetIssuesComponent";
import GetUnCheckedComponent from "../components/admin/unchecked/GetUnChecked";
import useCourseStore from "../\bstore/useCourseStore";

const AdminPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh; /* 높이를 최소화하여 콘텐츠에 맞춰 자동으로 늘어날 수 있게 */
  background-color: #fff;
  position: relative;
  padding-top: 1%;
  overflow: auto;
  padding-bottom: 90px; //푸터 공간을 위해 여백 추가
`;

const AdminPage = () => {
  const { fetchCourseItems } = useCourseStore();

  useEffect(() => {
    fetchCourseItems(); // 페이지가 로드될 때 과정 데이터 가져오기
  }, []); // Zustand에서 상태 가져오기

  return (
    <>
      <Header />
      <AdminPageContainer>
        <TableComponents />
        <GetUnCheckedComponent
          fetchData={proPage.getUnCheckedDescriptions}
          title="📌 미체크 항목"
        />
        <GetIssuesComponent />
      </AdminPageContainer>
    </>
  );
};

export default AdminPage;
