import React from "react";
import Layout from "../components/layout/Layout";
import Notification from "../components/notification/Notification";
import NoticeBoard from "../components/notice/NoticeBoard";

const NoticePage = () => {
  return (
    <Layout>
      {/* <Notification /> */}
      <NoticeBoard />
    </Layout>
  );
};

export default NoticePage;
