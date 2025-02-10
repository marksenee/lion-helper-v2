import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { proPage } from "../../apis/api";

const BoxContainer = styled.div`
  width: 886px;
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
  font-size: 15pt;
  color: #000000;
  resize: none;
  font-family: "Pretandard", sans-serif;
  &::placeholder {
    color: #adabab;
  }
`;

const SubmitButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: white;
  border: 1px solid #ff7710;
  color: #ff7710;
  font-size: 14px;
  font-family: "Pretandard", sans-serif;
  cursor: pointer;
  align-self: flex-end;
  border-radius: 5px;
  margin-top: 10px;
  &:hover {
    background-color: #ff7710;
    color: white;
  }
`;

const Issues = () => {
  const [reason, setReason] = useState("");

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  // 미체크된 항목들을 필터링하고, 사유와 함께 백엔드로 전송
  const handleSubmit = async () => {
    const issueData = {
      issue: reason,
    };

    try {
      const response = await proPage.postIssues(issueData);
      console.log("Response from API:", response);

      if (response.status === 201) {
        alert("저장이 완료되었습니다");
      }
    } catch (error) {
      console.error("Error posting issue:", error);
    }
  };

  return (
    <BoxContainer>
      <Title>📌 이슈 사항</Title>
      <ReasonInputContainer>
        <ReasonInput
          placeholder={
            "이슈사항에 대해 작성해 주세요. (작성 예시 : [과정명] 이슈 내용)"
          }
          value={reason}
          onChange={handleReasonChange}
        />
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </ReasonInputContainer>
    </BoxContainer>
  );
};

export default Issues;
