import React, { useState } from "react";
import styled from "styled-components";
import { proPage } from "../../../apis/api";

const Container = styled.div`
  max-width: 886px;
  /* min-height: 50%; */
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  height: 500px;
  overflow-y: auto;
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
  background: ${(props) => (props.resolved ? "#4CAF50" : "#ff7710")};
  color: white;
  font-weight: bold;
  border: none;
  padding: 6px 15px;
  border-radius: 4px;
  margin-right: 1%;
  cursor: pointer;
`;

const TaskContent = styled.div`
  margin-top: 8px;
  display: grid;
  gap: 8px;
`;

const TaskField = styled.div`
  background: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
`;

const InputField = styled.input`
  background: transparent;
  border: transparent;
  padding: 4px 8px;
  flex-grow: 1;
  margin-right: 10px;
`;

const RegisterButton = styled.button`
  background: #ffffff;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #565656;
    color: white;
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const TaskItem = ({ id, content, actionPlan }) => {
  const [resolved, setResolved] = useState(false);
  const [statusComment, setStatusComment] = useState(""); // 대응 현황
  const [resultComment, setResultComment] = useState(""); // 대응 결과

  // ✅ 대응 현황 API 호출
  const handleStatusSubmit = async () => {
    if (!statusComment) return alert("대응 현황을 입력해주세요.");

    const data = { comment: statusComment, unchecked_id: id };

    try {
      const response = await proPage.postUnCheckedDescriptionsComment(data);
      if (response.status === 201) {
        alert("대응 현황이 등록되었습니다!");
        setStatusComment(""); // 입력값 초기화
      }
    } catch (error) {
      alert("등록 실패: " + error.message);
    }
  };

  // ✅ 대응 결과 API 호출
  const handleResultSubmit = async () => {
    if (!resultComment) return alert("대응 결과를 입력해주세요.");

    const data = { comment: resultComment, unchecked_id: id };

    try {
      const response = await proPage.postUnCheckedDescriptionsComment(data);
      if (response.status === 201) {
        alert("대응 결과가 등록되었습니다!");
        setResultComment(""); // 입력값 초기화
      }
    } catch (error) {
      alert("등록 실패: " + error.message);
    }
  };

  const handleResolve = async () => {
    try {
      const response = await proPage.deleteUnCheckedDescriptions({
        unchecked_id: id,
      });
      if (response.status === 200) {
        alert("항목이 해결되었습니다!");
        setResolved(true); // 상태 업데이트
      }
    } catch (error) {
      alert("해결 실패: " + error.message);
    }
  };

  return (
    <TaskCard>
      <TaskHeader>
        <Title>
          {content || "미체크 항목 없음"} : {actionPlan || "액션 플랜 없음"}
        </Title>
        <StatusButton resolved={resolved} onClick={handleResolve}>
          {resolved ? "해결됨" : "해결"}
        </StatusButton>
      </TaskHeader>
      <TaskContent>
        {/* 대응 현황 입력 */}
        <TaskField>
          <InputField
            type="text"
            value={statusComment}
            onChange={(e) => setStatusComment(e.target.value)}
            placeholder="대응 현황 입력..."
          />
          <RegisterButton onClick={handleStatusSubmit}>등록</RegisterButton>
        </TaskField>

        {/* 대응 결과 입력 */}
        <TaskField>
          <InputField
            type="text"
            value={resultComment}
            onChange={(e) => setResultComment(e.target.value)}
            placeholder="대응 결과 입력..."
          />
          <RegisterButton onClick={handleResultSubmit}>등록</RegisterButton>
        </TaskField>
      </TaskContent>
    </TaskCard>
  );
};

// ✅ **TaskList에서 `selectedCourse`에 맞는 데이터만 표시**
const TaskList = ({ items, selectedCourse }) => {
  const filteredTasks = items.filter(
    (item) => item.training_course === selectedCourse
  );

  return (
    <Container>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id} // ✅ ID 전달 (API에서 unchecked_id로 사용)
            content={task.content}
            actionPlan={task.action_plan}
          />
        ))
      ) : (
        <p>해당 과정에 대한 미체크 항목이 없습니다.</p>
      )}
    </Container>
  );
};

export default TaskList;
