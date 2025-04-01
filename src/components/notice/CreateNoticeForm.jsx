import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  justify-content: center;
  /* height: 100vh; */
  width: calc(100% - 270px); /* 사이드바를 제외한 나머지 영역을 사용 */
  margin: 0 auto;
  padding: 50px 20px;
  background: #f8f8f8;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: white;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  margin-top: 20px;
  border: none;
  border-bottom: 2px solid #ddd;
  outline: none;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 200px;
  margin-top: 20px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

const Button = styled.button`
  background: #ffefe0;
  color: #d67a2b;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  float: right;

  &:hover {
    background: #fdd4b6;
  }
`;

const CreateNoticeForm = () => {
  return (
    <Container>
      <Select>
        <option>카테고리 선택</option>
        <option>옵션 1</option>
        <option>옵션 2</option>
      </Select>
      <TitleInput placeholder="제목을 입력하세요" />
      <ContentInput placeholder="내용을 입력하세요" />
      <Button>등록하기</Button>
    </Container>
  );
};

export default CreateNoticeForm;
