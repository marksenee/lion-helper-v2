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
  CheckYesBox,
  CheckNoBox,
  CheckStatusText,
  CategoryDiv,
  IssueContainer,
  IssueInputWrapper,
  IssueInput,
  IssueTextarea,
  IssueButtonGroup,
  AddIssueButton,
  RemoveIssueButton,
  SubmitButton,
  UncheckedListContainer,
  TabContainer,
  Tab,
  TabWrapper,
  SaveButton,
  IssueTitleContainer,
  IssueTitle,
} from "./styles";
import useCourseStore from "../../\bstore/useCourseStore";
import { SubmitButton as IssueSubmitButton } from "../issue/styles";
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
  const [issueInputs, setIssueInputs] = useState([""]); // 이슈사항 입력창 상태 추가

  // ✅ 체크리스트 데이터를 가져오면서 localStorage 데이터도 반영
  // ✅ localStorage에서 username별 상태 저장 및 불러오기
  useEffect(() => {
    // console.log("username", username);
    // if (!username) return; // username 없으면 실행하지 않음
    // const getUserName = async () => {
    //   try {
    //     const response = await proPage.getUserName();

    //     console.log("respoonse", response);
    //   } catch (err) {
    //     return err;
    //   }
    // };

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
    // getUserName();
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
    // if (!username) {
    //   alert("로그인이 필요합니다!");
    //   return;
    // }
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

  const handleSubmit = async (index) => {
    // 과정 선택 검증
    if (!selectedCourse || selectedCourse === "과정 선택") {
      alert("과정을 선택해주세요!");
      return;
    }

    // 이슈사항 입력 검증
    const issue = issueInputs[index];
    if (!issue || issue.trim() === "") {
      alert("이슈사항을 입력해주세요!");
      return;
    }

    const issueData = {
      issue: issue,
      date: today,
      training_course: selectedCourse,
      username: username,
    };

    try {
      const response = await proPage.postIssues(issueData);
      if (response.status === 201) {
        alert("저장이 완료되었습니다 \n (어드민페이지에서 내용 확인 가능)");
        const newInputs = [...issueInputs];
        newInputs[index] = "";
        setIssueInputs(newInputs);
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
      username: username,
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

  const handleIssueInputChange = (index, value) => {
    const newInputs = [...issueInputs];
    newInputs[index] = value;
    setIssueInputs(newInputs);
  };

  const handleAddIssueInput = () => {
    setIssueInputs([...issueInputs, ""]);
  };

  const handleRemoveIssueInput = (index) => {
    if (issueInputs.length > 1) {
      const newInputs = issueInputs.filter((_, i) => i !== index);
      setIssueInputs(newInputs);
    }
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
                <CategoryDiv>
                  <CategoryText>
                    {"#"}
                    {category.replace("관련", "").trim()}
                  </CategoryText>
                </CategoryDiv>

                {tasks.map((item) => (
                  <CheckboxContainer key={item.id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* YES 체크박스 */}
                      <CheckYesBox>
                        <CheckStatusText>YES</CheckStatusText>
                        <HiddenCheckbox
                          type="checkbox"
                          checked={checkedStates[item.id] === "yes"}
                          onChange={() =>
                            handleCheckboxChange(item.id, item, true)
                          }
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
                      </CheckYesBox>

                      {/* NO 체크박스 */}
                      <CheckNoBox>
                        <CheckStatusText>NO</CheckStatusText>
                        <HiddenCheckbox
                          type="checkbox"
                          checked={checkedStates[item.id] === "no"}
                          onChange={() =>
                            handleCheckboxChange(item.id, item, false)
                          }
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
                      </CheckNoBox>
                      <div style={{ display: "flex", flexDirection: "column" }}>
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
                          <FiHelpCircle
                            data-tooltip-id={`tooltip-${item.id}`}
                            style={{
                              marginLeft: "5px",
                              cursor: "pointer",
                              color: "#888",
                            }}
                          />
                        </CheckboxLabel>
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
                            style={{ display: "flex", alignItems: "center" }}
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
                                  e.preventDefault();
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
                    </div>
                  </CheckboxContainer>
                ))}
              </div>
            ))}
          </ChecklistContainer>
        </div>
        <IssueTitleContainer>
          <IssueTitle>
            이슈사항
            <IssueButtonGroup>
              <AddIssueButton onClick={handleAddIssueInput}>+</AddIssueButton>
              {issueInputs.length > 1 && (
                <RemoveIssueButton
                  onClick={() => handleRemoveIssueInput(issueInputs.length - 1)}
                >
                  -
                </RemoveIssueButton>
              )}
            </IssueButtonGroup>
          </IssueTitle>
        </IssueTitleContainer>
        <IssueContainer>
          {issueInputs.map((issue, index) => (
            <IssueInputWrapper key={index}>
              <div style={{ position: "relative", width: "100%" }}>
                <IssueInput
                  value={issue}
                  onChange={(e) =>
                    handleIssueInputChange(index, e.target.value)
                  }
                  placeholder="이슈사항을 입력해주세요&#10;작성 예시:&#10;- 배경: 이슈가 발생한 배경&#10;- 상황: 이슈 상황"
                />
                <SubmitButton onClick={() => handleSubmit(index)}>
                  등록
                </SubmitButton>
              </div>
            </IssueInputWrapper>
          ))}
        </IssueContainer>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
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
