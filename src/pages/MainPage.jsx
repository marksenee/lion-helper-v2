import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import Search from "../components/Search/Search";
import Layout from "../components/layout/Layout";

const notices = [
  "[클라우드 엔지니어링 1회차] 교강사 일지 미작성",
  "[클라우드 엔지니어링 1회차] 줌 업로드 2/4 기록 누락",
  "[데이터분석 1회차] 훈련평가 70점 미만 : 김멋사, 최멋사",
];

const NoticeList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NoticeItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
`;

const CommentButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
`;

const CommentBox = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 50px;
  margin-top: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  resize: none;
`;

const MainPage = () => {
  return (
    <Layout>
      <Search />
    </Layout>
  );
};

export default MainPage;
