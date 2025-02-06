import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; // 토글 아이콘

const NoticeBoxContainer = styled.div`
  width: 886px;
  height: 50px;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  margin-top: 2%;
`;

const NoticeText = styled.div`
  font-family: "Pretandard", sans-serif;
  font-size: 18pt;
  font-weight: bold;
  color: #000000;
  font-family: "Pretandard", sans-serif;
  font-size: 18pt;
  font-weight: bold;
  color: #000000;
`;

const ToggleContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ToggleIcon = styled.div`
  font-size: 24px;
  color: #000000;
`;

const ToggleContent = styled.div`
  width: 886px;
  height: 132px;
  background-color: ${({ isOpen }) => (isOpen ? "#ecebeb" : "transparent")};
  border-radius: 10px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding: 20px;
  margin-top: 10px;
  font-size: 18px;
`;

const ProPageWithNotice = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* 공지사항 박스 */}
      <NoticeBoxContainer>
        <NoticeText>
          <span role="img" aria-label="pin">
            📌
          </span>{" "}
          공지사항
        </NoticeText>
        <ToggleContainer onClick={toggleContent}>
          <ToggleIcon>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </ToggleIcon>
        </ToggleContainer>
      </NoticeBoxContainer>

      {/* 토글이 열리면 내용 보여주기 */}
      <ToggleContent isOpen={isOpen}>
        <p>여기에 공지사항 내용을 작성해주세요.</p>
      </ToggleContent>
    </div>
  );
};

export default ProPageWithNotice;
