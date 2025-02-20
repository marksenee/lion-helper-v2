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
  TabContainer,
  Tab,
  TabWrapper,
  SaveButton,
} from "./styles";

const DailyCheckList = ({ selectedCourse }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [uncheckedItems, setUncheckedItems] = useState([]);
  const [commentsState, setCommentsState] = useState({});
  const [checkedStates, setCheckedStates] = useState({});
  const [reason, setReason] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("daily");
  const [reasonState, setReasonState] = useState({}); // 각 항목의 액션 플랜을 저장

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await proPage.getDailyCheck();
        if (response?.data?.data) {
          const limitedCheckItems = response.data.data;
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
    setCheckedStates((prev) => {
      return {
        ...prev,
        [id]: !prev[id], // 해당 체크박스 상태만 토글
      };
    });

    // 체크된 항목만 제거
    if (!checkedStates[id]) {
      setUncheckedItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setUncheckedItems((prev) => [...prev, checkedItem]);
    }

    try {
      await proPage.postDailyCheck({
        updates: [
          { is_checked: !checkedStates[id], task_name: checkedItem.task_name },
        ],
      });
      console.log(
        `체크리스트 업데이트: ${checkedItem.task_name} ${
          !checkedStates[id] ? "체크됨" : "체크 해제됨"
        }`
      );
    } catch (error) {
      console.error("체크 상태 업데이트 실패:", error);
    }
  };

  // 입력값 변경 시 즉시 상태 업데이트
  const handleReasonChange = (id, value) => {
    setReasonState((prev) => ({
      ...prev,
      [id]: value, // 해당 id에 대한 액션 플랜 저장
    }));
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
    const allItems = checkItems.map((item) => ({
      is_checked: !!checkedStates[item.id], // true 또는 false 값을 포함
      task_name: item.task_name,
    }));

    if (!selectedCourse || selectedCourse === "과정 선택") {
      alert("과정을 선택해 주세요");
      return;
    }

    try {
      const response = await proPage.postDailyCheck({
        updates: allItems, // ✅ 모든 항목을 전송 (체크 여부 포함)
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
      <div style={{ display: "flex", marginTop: "3%" }}>
        <Title>✅ 업무 체크리스트</Title>
      </div>
      <BoxContainer>
        <TabWrapper>
          <TabContainer>
            <Tab
              active={activeTab === "daily"}
              onClick={() => setActiveTab("daily")}
            >
              데일리 체크리스트
            </Tab>
            <Tab
              active={activeTab === "weekly"}
              onClick={() => setActiveTab("weekly")}
            >
              위클리 체크리스트
            </Tab>
          </TabContainer>
        </TabWrapper>
        <div>
          <ChecklistContainer>
            {Object.entries(groupedTasks).map(([category, tasks]) => (
              <div key={category} style={{ marginBottom: "15px" }}>
                <h3>{category}</h3>
                {tasks.map((item) => (
                  <CheckboxContainer key={item.id}>
                    <Checkbox
                      type="checkbox"
                      checked={!!checkedStates[item.id]}
                      onChange={() => handleCheckboxChange(item.id, item)}
                    />
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
                  </CheckboxContainer>
                ))}
              </div>
            ))}
            <CheckListSaveButton onClick={handleSaveChecklist}>
              체크리스트 저장
            </CheckListSaveButton>
          </ChecklistContainer>
        </div>
        <div
          style={{
            marginTop: "3%",
            marginBottom: "3%",
            border: "1px solid #ecebeb",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Title>💡미체크 항목 액션 플랜</Title>
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
        </div>
      </BoxContainer>
      {/* <div style={{ marginTop: "3%", marginBottom: "3%" }}>
        <BoxContainer>
          <Title>💡미체크 항목 액션 플랜</Title>
          {filteredUncheckedItems.length > 0 ? (
            <UncheckedListContainer>
              {filteredUncheckedItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ width: "500px" }}>
                    <text
                      style={{
                        marginBottom: "10px",
                        fontSize: "13pt",
                        padding: "1%",
                      }}
                    >
                      {item.task_name}
                    </text>
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
        </BoxContainer>
      </div> */}
    </div>
  );
};

export default DailyCheckList;
