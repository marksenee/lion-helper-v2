import React, { useEffect, useState } from "react";
import { proPage } from "../../../apis/api";
import {
  Container,
  Title,
  NoticeBox,
  TextArea,
  CommentBox,
  NoticeItem,
  MemoInput,
  MemoBox,
  SubmitButton,
  CommentButton,
  NoticeList,
  CommentText,
} from "./styles";

const GetIssuesComponent = () => {
  const [items, setItems] = useState([]); // API 데이터 상태

  const [comments, setComments] = useState(Array(items.length).fill(""));
  const [issueComments, setIssueComments] = useState({});
  // const [issues, setIssues] = useState([]); // issues 상태 추가
  const [memoVisible, setMemoVisible] = useState(
    Array(items.length).fill(false)
  ); // uncheckedItems로

  useEffect(() => {
    const fetchIssuesList = async () => {
      try {
        const response = await proPage.getIssues();
        if (response && response.data && Array.isArray(response.data.data)) {
          setItems(response.data.data);
          setComments(Array(response.data.data.length).fill(""));
          setMemoVisible(Array(response.data.data.length).fill(false));
        } else {
          console.error("데이터 형식 오류: 예상된 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };
    fetchIssuesList();
  }, []);

  useEffect(() => {
    items.forEach((element, index) => {
      if (memoVisible[index] && !issueComments[element.id]) {
        fetchComments(element.id);
      }
    });
  }, [memoVisible, items]);

  const toggleMemo = (index) => {
    setMemoVisible((prev) => {
      const newMemoVisible = [...prev];
      newMemoVisible[index] = !newMemoVisible[index];
      return newMemoVisible;
    });
  };

  const fetchComments = async (issueId) => {
    try {
      const response = await proPage.getComments({
        params: { issue_id: issueId },
      });

      if (
        response.status === 200 &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setIssueComments((prev) => ({
          ...prev,
          [issueId]: response.data.data.map((comment) => ({
            content: comment.comment,
            created_at: comment.created_at,
          })),
        }));
      } else {
        console.error("댓글 데이터 형식 오류:", response.data);
      }
    } catch (error) {
      console.error("댓글 조회 실패:", error);
    }
  };

  // 댓글 입력값 변경 핸들러
  const handleCommentChange = (index, event) => {
    const newComments = [...comments];
    newComments[index] = event.target.value; // event.target이 정상적으로 접근됨
    setComments(newComments);
  };

  const SubmitButtonComponents = ({ onClick }) => {
    return <CommentButton onClick={onClick}>제출</CommentButton>;
  };

  const handleSubmitComment = async (index, issueId) => {
    const newComment = {
      author: "작성자", // 실제 사용자 이름을 받아올 수 있으면 대체
      content: comments[index],
    };

    try {
      const response = await proPage.postComments({
        comment: comments[index],
        issue_id: issueId,
      });

      if (response.status === 200 || response.status === 201) {
        alert("댓글이 성공적으로 저장되었습니다.");

        // 1️⃣ 기존 댓글 목록에 새 댓글 추가 (UI 즉시 반영)
        setIssueComments((prev) => ({
          ...prev, // prev == issueComments
          [issueId]: prev[issueId]
            ? [...prev[issueId], newComment] // 기존 댓글이 있으면 추가
            : [newComment], // 기존 댓글이 없으면 새 배열 생성
        }));

        // 2️⃣ 입력 필드 초기화
        setComments((prev) => {
          const newComments = [...prev];
          newComments[index] = "";
          return newComments;
        });

        // 3️⃣ 서버에서 최신 댓글을 다시 가져와 동기화 (선택적)
        fetchComments(issueId);
      } else {
        alert("댓글 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 오류:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD" 형태로 변환
  };

  return (
    <Container>
      <Title>📌 이슈 사항</Title>
      <NoticeBox>
        <NoticeList>
          {items.map((item, index) => (
            <NoticeItem key={index}>
              {item.content}
              <CommentButton onClick={() => toggleMemo(index, item.id)}>
                {memoVisible[index] ? "- 닫기" : "+ 댓글"}
              </CommentButton>
              {memoVisible[index] && (
                <CommentBox>
                  {/* 기존 댓글 리스트 표시 */}
                  {issueComments[item.id] &&
                    issueComments[item.id].map((comment, i) => (
                      <CommentText key={comment.id}>
                        작성자 : {comment.content} (
                        {formatDate(comment.created_at)})
                      </CommentText>
                    ))}

                  <TextArea
                    placeholder="댓글을 입력하세요"
                    value={comments[index] || ""}
                    onChange={(event) => handleCommentChange(index, event)}
                  />
                  <SubmitButtonComponents
                    onClick={() => handleSubmitComment(index, item.id)}
                  />
                </CommentBox>
              )}
            </NoticeItem>
          ))}
        </NoticeList>
      </NoticeBox>
    </Container>
  );
};

export default GetIssuesComponent;
