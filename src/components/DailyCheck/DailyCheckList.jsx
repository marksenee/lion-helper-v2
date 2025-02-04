import React, { useState } from "react";
import styled from "styled-components";

// 스타일 정의
const BoxContainer = styled.div`
  width: 886px;
  height: 394px;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 1%;
`;

const Title = styled.div`
  font-family: "Pretandard", sans-serif;
  font-size: 18pt;
  font-weight: bold;
  color: #000000;
`;

const ChecklistContainer = styled.div`
  margin-top: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CheckboxLabel = styled.div`
  font-family: "Pretandard", sans-serif;
  font-size: 18pt;
  color: #000000;
  margin-left: 10px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const DailyCheckList = () => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  return (
    <BoxContainer>
      {/* 일일 업무 체크리스트 제목 */}
      <Title>✅ 일일 업무 체크리스트</Title>

      {/* 체크리스트 항목 1 */}
      <ChecklistContainer>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={isChecked1}
            onChange={handleCheckboxChange1}
          />
          <CheckboxLabel>교강사 일지 작성 여부</CheckboxLabel>
        </CheckboxContainer>

        {/* 체크리스트 항목 2 */}
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={isChecked2}
            onChange={handleCheckboxChange2}
          />
          <CheckboxLabel>교강사 일지 작성 여부</CheckboxLabel>
        </CheckboxContainer>
      </ChecklistContainer>
    </BoxContainer>
  );
};

export default DailyCheckList;
