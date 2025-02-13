import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { proPage } from "../../apis/api";
import { FiHelpCircle } from "react-icons/fi"; // 물음표 아이콘 추가
import { Tooltip } from "react-tooltip";

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

const CheckListSaveButton = styled.button`
  font-family: "Pretandard", sans-serif;
  font-size: 13pt;
  background-color: transparent;
  border: 1px solid transparent;
  color: gray;
  cursor: pointer;
  /* transition: color 0.3s ease-in-out; */

  &:active {
    color: #ff7710;
  }
`;

const ChecklistContainer = styled.div`
  margin-top: 20px;
  max-height: ${(props) => (props.itemCount > 5 ? "250px" : "auto")};
  overflow-y: ${(props) => (props.itemCount > 5 ? "auto" : "visible")};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CheckboxLabel = styled.div`
  font-family: "Pretandard", sans-serif;
  /* font-size: 18pt; */
  color: #000000;
  margin-left: 10px;
  font-size: large;
`;

const unCheckedBox = styled.div`
  font-family: "Pretandard", sans-serif;
  color: #000000;
  margin-left: 10px;
  font-size: large;
  margin-bottom: 5%;
  margin-left: 5%;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
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
  font-size: 13pt;
  color: #000000;
  resize: none;
  margin-left: 5%;
  white-space: pre-line; /* 줄바꿈 적용 */
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
  /* margin-top: 10px; */
  &:hover {
    background-color: #ff7710;
    color: white;
  }
`;

const UncheckedListContainer = styled.div`
  max-height: 250px; /* 최대 높이 지정 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 */
  padding-right: 5px; /* 스크롤바가 내용 가리는 문제 방지 */
`;

const DailyCheckList = (selectedCourse) => {
  const [checkItems, setCheckItems] = useState([]);
  const [uncheckedItems, setUncheckedItems] = useState([]);
  const [commentsState, setCommentsState] = useState({}); // 각 항목별 코멘트 상태

  const [checkedStates, setCheckedStates] = useState({});
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await proPage.getDailyCheck();

        if (response && response.data && Array.isArray(response.data.data)) {
          const limitedCheckItems = response.data.data.slice(0, 6); // 0~6번째 항목만 추출
          setCheckItems(limitedCheckItems);

          // unchecked가 false인 데이터만 불러오기
          const unresolvedItems = response.data.data.filter(
            (item) => !item.is_checked
          );
          setUncheckedItems(unresolvedItems);

          // API에서 받아온 `is_checked` 값을 반영하여 초기 체크 상태 설정
          const initialCheckedStates = response.data.data.reduce(
            (acc, item) => {
              acc[item.id] = item.is_checked;
              return acc;
            },
            {}
          );
          setCheckedStates(initialCheckedStates);
        }
      } catch (error) {
        console.error("Error fetching checklist:", error);
      }
    };

    fetchChecklist();
  }, []);

  const handleCheckboxChange = async (id) => {
    // 새로운 체크 상태 반영
    setCheckedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    // 체크 시 uncheckedItems에서 즉시 제거
    setUncheckedItems((prev) => prev.filter((item) => item.id !== id));

    // 서버로 체크 상태 업데이트 요청
    try {
      await proPage.postDailyCheck({ updates: [{ is_checked: true, id }] });
      console.log(`체크리스트 업데이트: ${id} 체크됨`);
    } catch (error) {
      console.error("체크 상태 업데이트 실패:", error);
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  // 미체크된 항목들을 필터링하고, 사유와 함께 백엔드로 전송
  const handleSubmit = async () => {
    console.log("check", checkItems);

    const uncheckedItems = checkItems
      .filter((item) => !checkedStates[item.id]) // 미체크된 항목
      .map((item) => ({
        id: item.id,
        task_name: item.task_name,
      }));

    const unCheckedDescriptionData = {
      description: reason,
      // unchecked_items: uncheckedItems,
      training_course: selectedCourse,
    };

    try {
      const response = await proPage.postUnCheckedDescriptions(
        unCheckedDescriptionData
      );
      console.log("Response from API:", response);

      if (response.status === 201) {
        alert("저장이 완료되었습니다");
        setReason("");
      }
    } catch (error) {
      console.error("Error posting issue:", error);
    }
  };

  const handleSaveChecklist = async () => {
    const checkedItems = checkItems
      .filter((item) => checkedStates[item.id]) // 체크된 항목만 필터링
      .map((item) => ({
        is_checked: true,
        task_name: item.task_name,
      }));

    const requestData = { updates: checkedItems };

    try {
      const response = await proPage.postDailyCheck(requestData);
      console.log("Response from API:", response);

      if (response.status === 201) {
        alert("체크리스트가 저장되었습니다!");
      }
    } catch (error) {
      console.error("Error saving checklist:", error);
    }
  };

  // 코멘트 입력값 변경 핸들러
  const handleCommentChange = (id, value) => {
    setCommentsState((prev) => ({
      ...prev,
      [id]: value, // 댓글을 해당 unchecked_id에 저장
    }));
  };

  // 코멘트 전송 핸들러
  const handleCommentSubmit = async (id) => {
    if (!commentsState[id]) {
      alert("댓글을 입력해주세요!");
      return;
    }

    const commentData = {
      comment: commentsState[id], // 입력한 코멘트 그대로 유지
      unchecked_id: id, // 해당 unchecked 항목의 ID
    };

    try {
      const response = await proPage.postUncheckedComments(commentData);

      // response 객체가 정상적인지 확인
      console.log("서버 응답:", response);

      if (response && response.status === 201) {
        alert("댓글이 저장되었습니다!");
        // ✅ 기존 코멘트 상태 유지 (초기화하지 않음)
        setCommentsState((prev) => ({
          ...prev,
          [id]: commentsState[id], // 입력값 유지
        }));
      } else {
        console.error("댓글 저장 실패: 응답이 올바르지 않음", response);
      }
    } catch (error) {
      console.error("Error posting comment:", error);

      // 서버 에러 응답이 있는 경우 출력
      if (error.response) {
        console.error("서버 에러 응답:", error.response);
      }
    }
  };

  return (
    <BoxContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Title style={{ marginRight: "10px" }}>✅ 정기 업무 체크리스트</Title>
        <CheckListSaveButton onClick={handleSaveChecklist}>
          체크리스트 저장
        </CheckListSaveButton>
      </div>
      <ChecklistContainer itemCount={checkItems.length}>
        {checkItems.map((item) => (
          <CheckboxContainer key={item.id}>
            <Checkbox
              type="checkbox"
              checked={checkedStates[item.id] || false}
              onChange={() => handleCheckboxChange(item.id)}
            />

            <CheckboxLabel>{item.task_name}</CheckboxLabel>
            <FiHelpCircle
              data-tooltip-id={`tooltip-${item.id}`}
              style={{ marginLeft: "5px", cursor: "pointer", color: "#888" }}
            />
            <Tooltip id={`tooltip-${item.id}`} place="top" effect="solid">
              가이드 추가 예정
            </Tooltip>
          </CheckboxContainer>
        ))}
      </ChecklistContainer>

      <ReasonInputContainer>
        {uncheckedItems.length > 0 ? (
          <UncheckedListContainer>
            {uncheckedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                <text
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    fontSize: "13pt",
                    padding: "1%",
                  }}
                >
                  {item.task_name}
                </text>
                <ReasonInput
                  placeholder="코멘트를 입력하세요"
                  value={commentsState[item.id] || ""}
                  onChange={(e) => handleCommentChange(item.id, e.target.value)}
                />
                <button
                  onClick={() => handleCommentSubmit(item.id)}
                  style={{
                    marginLeft: "10px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "#ff7710",
                    fontSize: "16px",
                  }}
                >
                  ✔️
                </button>
              </div>
            ))}
          </UncheckedListContainer>
        ) : (
          <p>미체크된 항목이 없습니다.</p>
        )}
      </ReasonInputContainer>
    </BoxContainer>
  );
};

export default DailyCheckList;
