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

const ReasonInputContainer = styled.div`
  width: 800px;
  height: 190px;
  background-color: #ffffff;
  border: 1px solid #ecebeb;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ReasonInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 18pt;
  color: #000000;
  resize: none;
  font-family: "Pretandard", sans-serif;
  &::placeholder {
    color: #adabab;
  }
`;

const SubmitButton = styled.button`
  width: 50px;
  height: 24px;
  background-color: white;
  border: 1px solid #ff7710;
  color: #ff7710;
  font-size: 14px;
  font-family: "Pretandard", sans-serif;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 10px;
  &:hover {
    background-color: #ff7710;
    color: white;
  }
`;

const DailyCheckList = () => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [reason, setReason] = useState("");

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  return (
    <BoxContainer>
      <Title>✅ 일일 업무 체크리스트</Title>
      <ChecklistContainer>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={isChecked1}
            onChange={handleCheckboxChange1}
          />
          <CheckboxLabel>교강사 일지 작성 여부</CheckboxLabel>
        </CheckboxContainer>

        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={isChecked2}
            onChange={handleCheckboxChange2}
          />
          <CheckboxLabel>교강사 일지 작성 여부</CheckboxLabel>
        </CheckboxContainer>
      </ChecklistContainer>

      <ReasonInputContainer>
        <ReasonInput
          placeholder="미체크 된 항목에 대해 사유를 작성해 주세요."
          value={reason}
          onChange={handleReasonChange}
        />
        <SubmitButton>등록</SubmitButton>
      </ReasonInputContainer>
    </BoxContainer>
  );
};

export default DailyCheckList;
