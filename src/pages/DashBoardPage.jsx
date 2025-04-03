import React, { useState } from "react";
import { ContentContainer } from "../components/content_layout/styles";
import DashBoardComponents from "../components/dashBoard/DashBoardComponents";
import DashTab from "../components/tab/DashTab";
import styled from "styled-components";

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
`;

const MainContentWrapper = styled.div`
  position: relative;
  margin-left: 250px;
  width: calc(100% - 250px);
`;

const DashBoardPage = () => {
  const [viewMode, setViewMode] = useState("week");

  return (
    <PageContainer>
      <MainContentWrapper>
        <DashTab viewMode={viewMode} onViewModeChange={setViewMode} />
        <DashBoardComponents viewMode={viewMode} />
      </MainContentWrapper>
    </PageContainer>
  );
};

export default DashBoardPage;
