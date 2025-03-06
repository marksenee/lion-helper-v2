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
  ReasonInput,
  UncheckedListContainer,
  SaveButton,
  Circle,
  HiddenCheckbox,
  CategoryText,
  UncheckedInputBox,
  ReasonInputContainer,
} from "./styles";
import useCourseStore from "../../\bstore/useCourseStore";
import { SubmitButton } from "../issue/styles";

const DailyCheckList = ({ activeTab }) => {
  const { selectedCourse } = useCourseStore(); // 선택된 과정 가져오기

  const [checkItems, setCheckItems] = useState([]);
  const [uncheckedItems, setUncheckedItems] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [reasonState, setReasonState] = useState({}); // 각 항목의 액션 플랜을 저장
  const [showInput, setShowInput] = useState({}); // 특정 항목의 입력창 표시 여부
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await proPage.getDailyCheck();
        if (response?.data?.data) {
          const limitedCheckItems = response.data.data;
          setCheckItems(limitedCheckItems);
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

  useEffect(() => {
    const unresolvedItems = checkItems.filter(
      (item) => checkedStates[item.id] !== "yes"
    );
    setUncheckedItems(unresolvedItems);
  }, [checkItems, checkedStates]);

  const handleCheckboxChange = async (id, checkedItem, isYesChecked) => {
    const newState = isYesChecked ? "yes" : "no";
    const updatedCheckedStates = { ...checkedStates, [id]: newState };
    setCheckedStates(updatedCheckedStates);
    setUncheckedItems(
      checkItems.filter((item) => updatedCheckedStates[item.id] !== "yes")
    );
    // try {
    //   await proPage.postDailyCheck({
    //     updates: [
    //       { is_checked: newState === "yes", task_name: checkedItem.task_name },
    //     ],
    //   });
    // } catch (error) {
    //   console.error("체크 상태 업데이트 실패:", error);
    // }
  };

  const handleReasonChange = (id, value) => {
    setReasonState((prev) => ({ ...prev, [id]: value }));
  };

  const groupedTasks = checkItems
    .filter((item) => item.task_period === activeTab)
    .reduce((acc, item) => {
      if (!acc[item.task_category]) {
        acc[item.task_category] = [];
      }
      acc[item.task_category].push({
        id: item.id,
        task_name: item.task_name,
        guide: item.guide, // ✅ guide 정보 추가
      });
      return acc;
    }, {});

  const handleSaveChecklist = async () => {
    const allItems = checkItems.map((item) => ({
      is_checked: !!checkedStates[item.id],
      task_name: item.task_name,
    }));
    if (!selectedCourse || selectedCourse === "과정 선택") {
      alert("과정을 선택해 주세요");
      return;
    }
    try {
      console.log("response", {
        updates: allItems,
        training_course: selectedCourse,
      });
      const response = await proPage.postDailyCheck({
        updates: allItems,
        training_course: selectedCourse,
      });
      if (response.status === 201) {
        alert("체크리스트가 저장되었습니다!");
      }
    } catch (error) {
      console.error("Error saving checklist:", error);
    }
  };

  const handleCommentChange = (id, value) => {
    setReasonState((prev) => ({
      ...prev,
      [id]: value, // ✅ reasonState 업데이트 유지
    }));
  };

  const today = new Date();

  const handleSubmit = async () => {
    const issueData = {
      issue: reason,
      date: today,
      training_course: selectedCourse,
    };

    if (!selectedCourse || selectedCourse === "과정 선택") {
      alert("과정을 선택해주세요!");
      return;
    }

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

  const handleCommentSubmit = async (id) => {
    if (!selectedCourse || selectedCourse === "과정 선택") {
      alert("과정을 선택해 주세요!");
      return;
    }

    if (!reasonState[id] || reasonState[id].trim() === "") {
      alert("액션 플랜을 입력해주세요!");
      return;
    }

    // `description` 필드 설정 (예: task_name을 기반으로 설명 추가)
    const uncheckedTask = uncheckedItems.find((item) => item.id === id);
    const description = uncheckedTask
      ? `${uncheckedTask.task_name}에 대한 미체크 사유`
      : "미체크 항목 관련 액션 플랜";

    const commentData = {
      action_plan: reasonState[id],
      description: description, // description 추가
      training_course: selectedCourse,
    };

    try {
      const response = await proPage.postUnCheckedDescriptions(commentData);
      if (response?.status === 201) {
        alert("입력되었습니다!");
      } else {
        console.error("입력 실패");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const filteredUncheckedItems = uncheckedItems.filter(
    (item) => item.task_period === activeTab
  );

  return (
    <div>
      <div style={{ display: "flex" }}></div>
      <BoxContainer>
        <div>
          <ChecklistContainer>
            {Object.entries(groupedTasks).map(([category, tasks]) => (
              <div key={category}>
                {tasks.map((item) => (
                  <CheckboxContainer key={item.id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* YES 체크박스 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#888",
                            marginRight: "10px",
                          }}
                        >
                          YES
                        </span>
                        <HiddenCheckbox
                          type="checkbox"
                          checked={checkedStates[item.id] === "yes"}
                          onChange={() =>
                            handleCheckboxChange(item.id, item, true)
                          }
                          style={{ display: "none" }}
                        />
                        <Circle
                          checked={checkedStates[item.id] === "yes"}
                          onClick={() => {
                            handleCheckboxChange(item.id, item, true);
                            setShowInput((prev) => ({
                              ...prev,
                              [item.id]: false,
                            }));
                          }}
                        />
                      </div>

                      {/* NO 체크박스 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          marginLeft: "10px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#888",
                            marginRight: "10px",
                          }}
                        >
                          NO
                        </span>
                        <HiddenCheckbox
                          type="checkbox"
                          checked={checkedStates[item.id] === "no"}
                          onChange={() =>
                            handleCheckboxChange(item.id, item, false)
                          }
                          style={{ display: "none" }}
                        />
                        <Circle
                          checked={checkedStates[item.id] === "no"}
                          onClick={() => {
                            handleCheckboxChange(item.id, item, false);
                            setShowInput((prev) => ({
                              ...prev,
                              [item.id]: true,
                            }));
                          }}
                        />
                      </div>
                      <CheckboxLabel>{item.task_name}</CheckboxLabel>
                      <FiHelpCircle
                        data-tooltip-id={`tooltip-${item.id}`}
                        style={{
                          marginLeft: "5px",
                          cursor: "pointer",
                          color: "#888",
                        }}
                      />
                      <Tooltip
                        id={`tooltip-${item.id}`}
                        place="top"
                        effect="solid"
                      >
                        {item.guide && item.guide !== "업무 가이드 없음"
                          ? item.guide
                          : "가이드 정보 없음"}
                      </Tooltip>
                      {showInput[item.id] && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <UncheckedInputBox
                            type="text"
                            placeholder="사유 입력 후 엔터를 눌러주세요!"
                            value={reasonState[item.id] || ""}
                            onChange={(e) =>
                              handleReasonChange(item.id, e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); // 엔터 입력 시 새로고침 방지
                                handleCommentSubmit(
                                  item.id,
                                  reasonState[item.id]
                                );
                              }
                            }}
                          />
                          {/* 
                          <button
                            onClick={() =>
                              handleCommentSubmit(item.id, reasonState[item.id])
                            }
                            style={{
                              padding: "5px 10px",
                              borderRadius: "5px",
                              background: "#007bff",
                              color: "white",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            등록
                          </button> */}
                        </div>
                      )}
                    </div>
                    <div>
                      <CategoryText>
                        {"#"}
                        {category}
                      </CategoryText>
                    </div>
                  </CheckboxContainer>
                ))}
              </div>
            ))}
          </ChecklistContainer>
        </div>
        <Title>이슈사항</Title>
        <ReasonInputContainer>
          <ReasonInput
            placeholder={"이슈 사항이 있을 경우 작성해 주세요"}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     e.preventDefault();
            //     handleSubmit();
            //   }
            // }}
          />

          <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
        </ReasonInputContainer>
        {/* <div
          style={{
            marginTop: "3%",
            marginBottom: "3%",
            border: "1px solid #ecebeb",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          {filteredUncheckedItems.length > 0 ? (
            <UncheckedListContainer>
              {filteredUncheckedItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start", // 여러 줄일 때도 균형 잡힌 정렬
                    gap: "10px", // 요소 간 간격 추가
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "500px",
                      minHeight: "40px", // 최소 높이 지정 (줄바꿈 시 UI 안정성 확보)
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "13pt",
                        marginLeft: "10%",
                        whiteSpace: "normal",
                        wordBreak: "break-word", // 긴 텍스트 줄바꿈 처리
                        lineHeight: "1.5", // 줄 간격 조절
                      }}
                    >
                      {item.task_name}
                    </div>
                  </div>
                  <ReasonInput
                    placeholder="액션플랜을 입력하세요"
                    value={reasonState[item.id] || ""}
                    onChange={(e) =>
                      handleCommentChange(item.id, e.target.value)
                    }
                  />
                  <SaveButton onClick={() => handleCommentSubmit(item.id)}>
                    등록
                  </SaveButton>
                </div>
              ))}
            </UncheckedListContainer>
          ) : (
            <p>미체크된 항목이 없습니다.</p>
          )}
        </div> */}
        {/* 왼쪽 정렬된 버튼 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <CheckListSaveButton onClick={handleSaveChecklist}>
            체크리스트 저장
          </CheckListSaveButton>
        </div>
      </BoxContainer>
    </div>
  );
};

export default DailyCheckList;
