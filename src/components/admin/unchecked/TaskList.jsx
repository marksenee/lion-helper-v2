import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 886px;
  /* margin: 0 auto; */
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  height: 500px; /* 원하는 높이로 설정 */
  overflow-y: auto; /* 스크롤 활성화 */
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const TaskCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusButton = styled.button`
  background: ${(props) => (props.resolved ? "#4CAF50" : "#FFA500")};
  color: white;
  font-weight: bold;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

const TaskContent = styled.div`
  margin-top: 8px;
  display: grid;
  gap: 8px;
`;

const TaskField = styled.div`
  background: #f3f3f3;
  padding: 12px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
`;

const InputField = styled.input`
  background: transparent;
  border: transparent;
  /* border-radius: 4px; */
  padding: 4px 8px;
  flex-grow: 1;
  margin-right: 10px;
`;

const RegisterButton = styled.button`
  background: #d1d1d1;
  padding: 4px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

const TaskItem = () => {
  const [resolved, setResolved] = useState(false);
  const [currentText, setCurrentText] = useState("");

  return (
    <TaskCard>
      <TaskHeader>
        <Title>미체크 항목 항목 : 액션 플랜 내용 조회</Title>
        <StatusButton
          resolved={resolved}
          onClick={() => setResolved(!resolved)}
        >
          {resolved ? "해결됨" : "해결"}
        </StatusButton>
      </TaskHeader>
      <TaskContent>
        <TaskField>
          <InputField
            type="text"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            placeholder="대응 현황 입력..."
          />
          <RegisterButton>등록</RegisterButton>
        </TaskField>
        <TaskField>
          <InputField type="text" placeholder="대응 결과 입력..." />
          <RegisterButton>등록</RegisterButton>
        </TaskField>
      </TaskContent>
    </TaskCard>
  );
};

const TaskList = () => {
  return (
    <Container>
      {/* <Title>
        <span role="img" aria-label="check">
          📝
        </span>{" "}
        미체크 항목
      </Title> */}
      {[1, 2, 3].map((_, index) => (
        <TaskItem key={index} />
      ))}
    </Container>
  );
};

export default TaskList;
