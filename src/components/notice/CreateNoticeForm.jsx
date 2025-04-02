import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";

const Container = styled.div`
  width: 100%;
  /* width: calc(100% - 270px);  */
  max-width: 900px;
  margin: 0 auto;
  padding: 50px 20px;
  background: white;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 50px;
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
  font-size: 25px;
  margin-top: 50px;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 300px;
  margin-top: 20px;
  padding: 15px;
  font-size: 18px;
  border: transparent;
  border-radius: 5px;
  resize: none;
`;

const Button = styled.button`
  background: #ffefe0;
  color: #ff7710;
  font-weight: 600;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #ff7710;
    color: white;
  }
`;

const BackButton = styled(GoChevronLeft)`
  cursor: pointer;
  color: #555;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #222;
  }
`;

const CreateNoticeForm = () => {
  const navigate = useNavigate();
  const [isMouseHovered, setIsMouseHovered] = useState(false);

  const handleSumbit = () => {};

  return (
    <Container>
      <BackButton size={40} onClick={() => navigate(-1)} />

      <FlexContainer>
        <Select>
          <option>카테고리 선택</option>
          <option>옵션 1</option>
          <option>옵션 2</option>
        </Select>
        <Button>등록하기</Button>
      </FlexContainer>
      <TitleInput placeholder="제목을 입력하세요" />
      <ContentInput placeholder="내용을 입력하세요" />
    </Container>
  );
};

export default CreateNoticeForm;
