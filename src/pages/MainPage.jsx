import React from "react";
import Search from "../components/Search/Search";
import Layout from "../components/layout/Layout";
import { ContentContainer } from "../components/content_layout/styles";

const MainPage = () => {
  return (
    // <Layout>
    //   <Search />
    // </Layout>
    <ContentContainer>
      <Search />
    </ContentContainer>
  );
};

export default MainPage;
