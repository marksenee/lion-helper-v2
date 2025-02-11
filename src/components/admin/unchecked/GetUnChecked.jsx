import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  NoticeList,
  NoticeItem,
  NoticeBox,
  CommentBox,
  CommentButton,
  TextArea,
} from "./styles";
import SubmitButtonComponents from "../../button/SubmitButton";
import { proPage } from "../../../apis/api";

const GetIssueUnCheckData = ({ fetchData, title }) => {
  const [items, setItems] = useState([]); // API 데이터 상태
  const [comments, setComments] = useState([]); // 댓글 상태
  const [memoVisible, setMemoVisible] = useState([]); // 댓글 입력창 상태
  // uncheckedItems가 업데이트된 후, comments와 memoVisible 초기화

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetchData(); // ✅ props로 받은 API 함수 실행
        if (response && response.data && response.data.data) {
          // uncheckedItems가 업데이트된 후, comments와 memoVisible 초기화

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

    fetchItems();
  }, [fetchData]);

  const toggleMemo = (index) => {
    setMemoVisible((prev) => {
      const newMemoVisible = [...prev];
      newMemoVisible[index] = !newMemoVisible[index]; // 해당 index만 토글
      return newMemoVisible;
    });
  };

  const handleCommentChange = (index, event) => {
    const newComments = [...comments];
    newComments[index] = event.target.value;
    setComments(newComments);
  };

  return (
    <Container>
      <Title>{title}</Title>
      <NoticeBox>
        <NoticeList>
          {items.map((item, index) => (
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
                  <SubmitButtonComponents />
                </CommentBox>
              )}
            </NoticeItem>
          ))}
        </NoticeList>
      </NoticeBox>
    </Container>
  );
};

export default GetIssueUnCheckData;
