import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";

const Container = styled.div`
  width: 100%;
  /* width: calc(100% - 270px);  */
  max-width: 970px;
  height: calc(100vh - 100px);
  margin: 0 auto;
  padding: 50px 20px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  /* overflow-y: auto; */
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 50px;
  gap: 20px;
`;

const Select = styled.select`
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  background: white;
  color: #555;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-width: 200px;

  &:focus {
    outline: none;
    /* border-color: #ff7710; */
    /* box-shadow: 0 0 0 3px rgba(255, 119, 16, 0.1); */
  }
`;

const TitleInput = styled.input`
  width: 95%;
  padding: 20px;
  font-size: 28px;
  margin-top: 50px;
  border: none;
  border-bottom: 2px solid #ffefe0;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-bottom-color: #ff7710;
  }

  &::placeholder {
    color: #999;
  }
`;

const ContentInput = styled.textarea`
  width: 95%;
  height: 600px;
  margin-top: 30px;
  padding: 20px;
  font-size: 18px;
  border: 2px solid #ffefe0;
  border-radius: 12px;
  resize: none;
  transition: all 0.2s ease-in-out;
  line-height: 1.6;

  &:focus {
    outline: none;
    /* border-color: #ff7710; */
    /* box-shadow: 0 0 0 3px rgba(255, 119, 16, 0.1); */
  }

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  background: #ffefe0;
  color: #ff7710;
  font-weight: 600;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(255, 119, 16, 0.1);

  &:hover {
    background: #ff7710;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(255, 119, 16, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BackButton = styled(GoChevronLeft)`
  cursor: pointer;
  color: #555;
  transition: all 0.2s ease-in-out;
  padding: 8px;
  border-radius: 50%;
  background: #ffefe0;

  &:hover {
    color: #ff7710;
    background: #fff5eb;
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
