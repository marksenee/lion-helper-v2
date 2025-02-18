import React, { useState, useEffect } from "react";
import { proPage } from "../../apis/api";
import {
  BoxContainer,
  Title,
  ReasonInputContainer,
  ReasonInput,
  SubmitButton,
} from "./styles";

const Issues = ({ formattedDate, selectedCourse }) => {
  const [reason, setReason] = useState("");

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async () => {
    const issueData = {
      issue: reason,
      date: formattedDate,
      training_course: selectedCourse,
    };

    try {
      const response = await proPage.postIssues(issueData);
      if (response.status === 201) {
        alert("저장이 완료되었습니다 \n (어드민페이지에서 내용 확인 가능)");
        setReason("");
      } else if (response.status === 400) {
        alert("이슈 사항을 입력해주세요!");
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
          placeholder={"이슈 사항이 있을 경우 작성해 주세요"}
          value={reason}
          onChange={handleReasonChange}
        />
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </ReasonInputContainer>
    </BoxContainer>
  );
};

export default Issues;
