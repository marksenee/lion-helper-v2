import React, { useState, useEffect } from "react";
import { proPage } from "../../apis/api";
import { FiHelpCircle } from "react-icons/fi";
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
} from "./styles";

const DailyCheckList = ({ selectedCourse }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [uncheckedItems, setUncheckedItems] = useState([]);
  const [commentsState, setCommentsState] = useState({});
  const [checkedStates, setCheckedStates] = useState({});
  const [reason, setReason] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await proPage.getDailyCheck();
        if (response?.data?.data) {
          const limitedCheckItems = response.data.data.slice(0, 6);
          setCheckItems(limitedCheckItems);

          const unresolvedItems = response.data.data.filter(
            (item) => !item.is_checked
          );
          setUncheckedItems(unresolvedItems);

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

  const handleCheckboxChange = async (id, checkedItem) => {
    setCheckedStates((prev) => ({ ...prev, [id]: !prev[id] }));
    setUncheckedItems((prev) => prev.filter((item) => item.id !== id));

    try {
      await proPage.postDailyCheck({
        updates: [{ is_checked: true, task_name: checkedItem.task_name }],
      });
      console.log(`체크리스트 업데이트: ${checkedItem.task_name} 체크됨`);
    } catch (error) {
      console.error("체크 상태 업데이트 실패:", error);
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async () => {
    const uncheckedItemsData = checkItems
      .filter((item) => !checkedStates[item.id])
      .map((item) => ({
        id: item.id,
        task_name: item.task_name,
      }));

    const unCheckedDescriptionData = {
      description: reason,
      training_course: selectedCourse,
    };

    try {
      const response = await proPage.postUnCheckedDescriptions(
        unCheckedDescriptionData
      );
      if (response.status === 201) {
        // alert("저장이 완료되었습니다");
        setAlertVisible(true); // 알람 표시

        setReason("");
      }
    } catch (error) {
      console.error("Error posting issue:", error);
    }
  };

  const handleSaveChecklist = async () => {
    const checkedItems = checkItems
      .filter((item) => checkedStates[item.id])
      .map((item) => ({
        is_checked: true,
        task_name: item.task_name,
      }));

    try {
      const response = await proPage.postDailyCheck({ updates: checkedItems });
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
        <Title>✅ 정기 업무 체크리스트</Title>
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
              onChange={() => handleCheckboxChange(item.id, item)}
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
                    marginLeft: "10%",
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
