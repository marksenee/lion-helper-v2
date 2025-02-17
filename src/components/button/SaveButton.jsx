import React from "react";
import styled from "styled-components";

const SaveButton = styled.button`
  width: 100px;
  height: 45px;
  background-color: #f5f5f5;
  border-radius: 5px;
  font-family: "Pretandard", sans-serif;
  font-weight: semibold;
  font-size: 15pt;
  color: #000000;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff7710;
    color: white;
  }
`;

const SaveButtonComponent = () => {
  const handleSaveClick = () => {
    // 저장 버튼 클릭 시 동작을 추가할 수 있습니다.
    alert("저장되었습니다!");
  };

  return (
    <div>
      {/* 저장하기 버튼 */}
      <SaveButton onClick={handleSaveClick}>저장하기</SaveButton>
    </div>
  );
};

export default SaveButtonComponent;
