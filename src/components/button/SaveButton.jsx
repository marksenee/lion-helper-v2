import React from "react";
import styled from "styled-components";

// 스타일 정의

// const SaveButtonContainer = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: flex-end;
//   margin-top: 20px; /* 일일 업무 체크리스트 아래에 간격 추가 */
// `;

const SaveButton = styled.button`
  width: 158px;
  height: 48px;
  background-color: white;
  border: 2px solid #ff7710;
  border-radius: 5px;
  font-family: "Pretandard", sans-serif;
  font-weight: semibold;
  font-size: 18pt;
  color: #ff7710;
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
