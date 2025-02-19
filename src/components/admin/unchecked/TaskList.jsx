import React, { useEffect, useState } from "react";
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

const CommentItem = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentInfo = styled.span`
  font-size: 12px;
  color: gray;
  margin-top: 4px;
`;

// 날짜 포맷 변환 함수
const formatDate = (dateString) => {
  if (!dateString) return "N/A"; // 값이 없으면 "N/A" 표시
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "N/A" : date.toISOString().split("T")[0]; // 유효한 날짜인지 확인
};

const TaskItem = ({ id, content, actionPlan }) => {
  const [resolved, setResolved] = useState(false);
  const [statusComment, setStatusComment] = useState(""); // 대응 현황
  const [resultComment, setResultComment] = useState(""); // 대응 결과
  const [statusList, setStatusList] = useState([]); // ✅ 반드시 빈 배열로 초기화

  // ✅ 대응 현황 데이터 불러오는 함수
  const fetchStatusList = async () => {
    try {
      const response = await proPage.getUnCheckComment({
        params: { unchecked_id: id },
      });
      if (response.status === 200) {
        const data = response.data;
        setStatusList(response.data.data || []); // 서버에서 받아온 데이터를 상태에 저장
      }
    } catch (error) {
      console.error("대응 현황 불러오기 실패:", error);
    }
  };

  // ✅ 컴포넌트가 처음 마운트될 때와 ID가 변경될 때 대응 현황 데이터 로드
  useEffect(() => {
    fetchStatusList();
  }, [id]); // id가 변경될 때마다 새 데이터 로드

  // ✅ 대응 현황 API 호출
  const handleStatusSubmit = async () => {
    if (!statusComment) return alert("대응 현황을 입력해주세요.");

    const newComment = {
      comment: statusComment,
      id: Date.now(),
      user: "작성자", // API에 실제 작성자 정보가 있다면 여기에 넣어줘!
      created_at: new Date().toISOString(),
    };

    try {
      const response = await proPage.postUnCheckedDescriptionsComment({
        comment: statusComment,
        unchecked_id: id,
      });
      if (response.status === 201) {
        alert("대응 현황이 등록되었습니다!");
        setStatusList([newComment, ...statusList]); // 최신 댓글이 위쪽으로 가도록 설정
        setStatusComment("");
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
        {/* 대응 현황 목록 */}
        {statusList.length > 0 &&
          statusList.map((item) => (
            <CommentItem key={item.id}>
              <CommentText>
                <span>{item.comment}</span>
                <CommentInfo>
                  {item.user || "익명"} · {formatDate(item.created_at)}
                </CommentInfo>
              </CommentText>
            </CommentItem>
          ))}
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
        {/* <TaskField>
          <InputField
            type="text"
            value={resultComment}
            onChange={(e) => setResultComment(e.target.value)}
            placeholder="대응 결과 입력..."
          />
          <RegisterButton onClick={handleResultSubmit}>등록</RegisterButton>
        </TaskField> */}
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
