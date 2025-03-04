import React from "react";
import { ContentContainer, PageContainer } from "./styles";

const ContentLayout = ({ children }) => {
  return (
    <ContentContainer>
      <PageContainer>{children}</PageContainer>
    </ContentContainer>
  );
};

export default ContentLayout;
