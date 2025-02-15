import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { proPage } from "../../apis/api";
import { FiHelpCircle } from "react-icons/fi"; // 물음표 아이콘 추가
import { Tooltip } from "react-tooltip";
import {
  BoxContainer,
  Title,
  CheckListSaveButton,
  ChecklistContainer,
  CheckboxContainer,
  CheckboxLabel,
  Checkbox,
  ReasonInputContainer,
  ReasonInput,
  UncheckedListContainer,
  SubmitButton,
} from "./styles";

const IrregularCheckList = () => {
  const [checkItems, setCheckItems] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [reason, setReason] = useState("");
  const [uncheckedItems, setUncheckedItems] = useState([]);
  const [commentsState, setCommentsState] = useState({});

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await proPage.getIrregularCheck();

        if (response && response.data && Array.isArray(response.data.data)) {
          const limitedCheckItems = response.data.data.slice(0, 3); // 0~6번째 항목만 추출

          setCheckItems(limitedCheckItems);

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

  const handleCheckboxChange = (id) => {
    setCheckedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  // 미체크된 항목들을 필터링하고, 사유와 함께 백엔드로 전송
  const handleSubmit = async () => {
    const uncheckedItems = checkItems
      .filter((item) => !checkedStates[item.id]) // 미체크된 항목
      .map((item) => ({
        id: item.id,
        task_name: item.task_name,
      }));

    const unCheckedDescriptionData = {
      description: reason,
      unchecked_items: uncheckedItems,
    };

    try {
      const response = await proPage.postUnCheckedDescriptions(
        unCheckedDescriptionData
      );
      console.log("Response from API:", response);

      if (response.status === 201) {
        alert("저장이 완료되었습니다");
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
      const response = await proPage.postIrregularCheck(requestData);
      console.log("Response from API:", response);

      if (response.status === 201) {
        alert("체크리스트가 저장되었습니다!");
      }
    } catch (error) {
      console.error("Error saving checklist:", error);
    }
  };

  const handleCommentChange = (id, value) => {
    setCommentsState((prev) => ({ ...prev, [id]: value }));
  };

  const handleCommentSubmit = async (id) => {
    if (!commentsState[id]) {
      alert("댓글을 입력해주세요!");
      return;
    }

    const commentData = { comment: commentsState[id], unchecked_id: id };

    try {
      const response = await proPage.postUncheckedComments(commentData);
      if (response?.status === 201) {
        alert("댓글이 저장되었습니다!");
      } else {
        console.error("댓글 저장 실패");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <BoxContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Title style={{ marginRight: "10px" }}>✅ 비정기 업무 체크리스트</Title>
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
              - 강사 계약시점 검토 목차 <br />
              ㄴ 텍스트, 이미지 활용 여부 <br />ㄴ 보조교재 활용여부
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

export default IrregularCheckList;
