import React, { useState } from "react";
import styled from "styled-components";

const notices = [
  "[클라우드 엔지니어링 1회차] 교강사 일지 미작성",
  "[클라우드 엔지니어링 1회차] 줌 업로드 2/4 기록 누락",
  "[데이터분석 1회차] 훈련평가 70점 미만 : 김멋사, 최멋사",
];

const NoticeList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NoticeItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
`;

const CommentButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
`;

const CommentBox = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 50px;
  margin-top: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  resize: none;
`;

const App = () => {
  // 각 NoticeItem의 댓글 창 상태 (true/false)
  const [memoVisible, setMemoVisible] = useState(
    Array(notices.length).fill(false)
  );

  // 각 NoticeItem의 댓글 입력값 저장
  const [comments, setComments] = useState(Array(notices.length).fill(""));

  // 댓글 창 열기/닫기
  const toggleMemo = (index) => {
    setMemoVisible((prev) => {
      const newMemoVisible = [...prev];
      newMemoVisible[index] = !newMemoVisible[index]; // 해당 index만 토글
      return newMemoVisible;
    });
  };

  // 댓글 입력값 변경 핸들러
  const handleCommentChange = (index, event) => {
    const newComments = [...comments];
    newComments[index] = event.target.value;
    setComments(newComments);
  };

  return (
    <NoticeList>
      {notices.map((item, index) => (
        <NoticeItem key={index}>
          {item}
          <CommentButton onClick={() => toggleMemo(index)}>
            {memoVisible[index] ? "- 닫기" : "+ 댓글"}
          </CommentButton>
          {memoVisible[index] && (
            <CommentBox>
              <TextArea
                placeholder="댓글을 입력하세요"
                value={comments[index]}
                onChange={(event) => handleCommentChange(index, event)}
              />
            </CommentBox>
          )}
        </NoticeItem>
      ))}
    </NoticeList>
  );
};

export default App;
