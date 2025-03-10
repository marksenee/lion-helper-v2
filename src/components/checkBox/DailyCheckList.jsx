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
  Circle,
  HiddenCheckbox,
  CategoryText,
  UncheckedInputBox,
  ReasonInputContainer,
  StatusContainer,
  NoCount,
  YesCount,
} from "./styles";
import useCourseStore from "../../\bstore/useCourseStore";
import { SubmitButton } from "../issue/styles";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/saveCheckList";
import useAuthStore from "../../\bstore/useAuthStore";

const DailyCheckList = ({ activeTab }) => {
  const { selectedCourse } = useCourseStore(); // 선택된 과정 가져오기
  const { username, logout } = useAuthStore();

  const [checkItems, setCheckItems] = useState([]);
  const [uncheckedItems, setUncheckedItems] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [reasonState, setReasonState] = useState({}); // 각 항목의 액션 플랜을 저장
  const [showInput, setShowInput] = useState({}); // 특정 항목의 입력창 표시 여부
  const [reason, setReason] = useState("");
  const [reasons, setReasons] = useState(Array(5).fill(""));
  const [reasonInputState, setReasonInputState] = useState({});

  // ✅ 체크리스트 데이터를 가져오면서 localStorage 데이터도 반영
  // ✅ localStorage에서 username별 상태 저장 및 불러오기
  useEffect(() => {
    // if (!username) return; // username 없으면 실행하지 않음

    const fetchChecklist = async () => {
      try {
        const response = await proPage.getDailyCheck();
        if (response?.data?.data) {
          const limitedCheckItems = response.data.data;
          setCheckItems(limitedCheckItems);

          // ✅ username 기반 localStorage 키 사용
          const savedStates = loadFromLocalStorage(`${username}_checkedStates`);
          const initialCheckedStates = response.data.data.reduce(
            (acc, item) => {
              acc[item.id] = savedStates?.[item.id] ?? item.is_checked;
              return acc;
            },
            {}
          );

          setCheckedStates(initialCheckedStates);
          updateUncheckedItems(initialCheckedStates, limitedCheckItems);
        }
      } catch (error) {
        console.error("Error fetching checklist:", error);
      }
    };

    fetchChecklist();
  }, [username]);

  useEffect(() => {
    const unresolvedItems = checkItems.filter(
      (item) => checkedStates[item.id] !== "yes"
    );
    setUncheckedItems(unresolvedItems);
  }, [checkItems, checkedStates]);

  // ✅ 체크박스 상태 변경 및 username별 localStorage 저장
  const handleCheckboxChange = async (id, checkedItem, isYesChecked) => {
    const newState = isYesChecked ? "yes" : "no";
    const updatedCheckedStates = { ...checkedStates, [id]: newState };

    setCheckedStates(updatedCheckedStates);
    updateUncheckedItems(updatedCheckedStates, checkItems);

    // ✅ username 기반 localStorage 키 사용
    saveToLocalStorage(`${username}_checkedStates`, updatedCheckedStates);
  };

  // ✅ 체크되지 않은 항목 업데이트 (useEffect 제거)
  const updateUncheckedItems = (updatedCheckedStates, items) => {
    const unresolvedItems = items.filter(
      (item) => updatedCheckedStates[item.id] !== "yes"
    );
    setUncheckedItems(unresolvedItems);
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
    // Filter items based on activeTab and task_period
    const filteredItems = checkItems.filter(
      (item) => item.task_period === activeTab
    );

    const allItems = filteredItems.map((item) => ({
      is_checked: checkedStates[item.id] === "yes", // "yes"일 때만 true, "no"면 false
      task_name: item.task_name,
    }));

    if (!selectedCourse || selectedCourse === "과정 선택") {
      alert("과정을 선택해 주세요");
      return;
    }

    try {
      const response = await proPage.postDailyCheck({
        updates: allItems,
        training_course: selectedCourse,
        username: username,
      });
      if (response.status === 201) {
        alert("체크리스트가 저장되었습니다!");
      }
    } catch (error) {
      console.error("Error saving checklist:", error);
    }

    // handleCommentSubmit();
  };

  const handleCommentChange = (id, value) => {
    setReasonState((prev) => ({
      ...prev,
      [id]: value, // ✅ reasonState 업데이트 유지
    }));
  };

  const today = new Date();

  const handleSubmit = async () => {
    // "no"로 체크된 항목 중에서 코멘트가 입력되지 않은 항목 찾기
    // const uncheckedItemsWithoutComment = checkItems.filter(
    //   (item) => checkedStates[item.id] === "no" && !reasonState[item.id]?.trim()
    // );

    // // 미입력된 항목이 하나라도 있으면 알림 띄우고 제출 막기
    // if (uncheckedItemsWithoutComment.length > 0) {
    //   alert("이슈사항을 입력해주세요!");
    //   return;
    // }

    const issueData = {
      issue: Object.values(reasonInputState).join(" "), // 이유값만 하나의 문자열로 결합
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

    // 현재 id에 해당하는 체크 상태만 검사
    if ((checkedStates[id] ?? "yes") === "no" && !reasonState[id]?.trim()) {
      alert("미체크 사유를 입력해주세요!");
      return;
    }

    const uncheckedTask = uncheckedItems.find((item) => item.id === id);
    const description = uncheckedTask
      ? `${uncheckedTask.task_name}에 대한 미체크 사유`
      : "미체크 항목 관련 액션 플랜";

    const commentData = {
      action_plan: reasonState[id],
      description: description,
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
  // 오늘/주간 카운트 계산
  const yesCount = checkItems.filter(
    (item) => item.task_period === activeTab && checkedStates[item.id] === "yes"
  ).length;

  const noCount = checkItems.filter(
    (item) => item.task_period === activeTab && checkedStates[item.id] === "no"
  ).length;

  const handleReasonInputChange = (index, value) => {
    setReasonInputState((prev) => ({
      ...prev,
      [index]: value, // index로 state 관리
    }));
  };

  return (
    <div>
      <div style={{ display: "flex" }}></div>
      <BoxContainer>
        <div>
          {/* ✅ 상태 표시 UI */}
          <StatusContainer>
            <NoCount>미완료 {noCount}건</NoCount> /{" "}
            <YesCount>완료 {yesCount}건</YesCount>
          </StatusContainer>
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
                      <CheckboxLabel
                        style={{
                          textDecoration:
                            checkedStates[item.id] === "yes"
                              ? "line-through"
                              : "none",
                          color:
                            checkedStates[item.id] === "yes"
                              ? "#888"
                              : "inherit",
                        }}
                      >
                        {item.task_name}
                      </CheckboxLabel>
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
                      {(showInput[item.id] ||
                        checkedStates[item.id] === "no") && (
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
        {reasons.map((reason, index) => (
          <ReasonInputContainer key={index}>
            <ReasonInput
              placeholder="이슈사항을 작성해주세요! 예) 취업으로 인한 중도퇴소자 연속 발생"
              value={reasonInputState[index] || ""}
              onChange={(e) => handleReasonInputChange(index, e.target.value)}
            />
            <SubmitButton onClick={() => handleSubmit(index)}>
              등록
            </SubmitButton>
          </ReasonInputContainer>
        ))}

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
