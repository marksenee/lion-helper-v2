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
  font-size: 18pt;
  color: #000000;
  margin-left: 10px;
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
  font-size: 15pt;
  color: #000000;
  resize: none;
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

const IrregularCheckList = () => {
  const [checkItems, setCheckItems] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [reason, setReason] = useState("");

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
      const response = await proPage.postDailyCheck(requestData);
      console.log("Response from API:", response);

      if (response.status === 201) {
        alert("체크리스트가 저장되었습니다!");
      }
    } catch (error) {
      console.error("Error saving checklist:", error);
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
        <ReasonInput
          placeholder={`미체크 된 항목에 대해 미체크 항목과, 사유를 작성해 주세요.\n예 : [강사 일지 작성] 전일자 강사 일지 미작성으로 강사님께 요청`}
          value={reason}
          onChange={handleReasonChange}
        />
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </ReasonInputContainer>
    </BoxContainer>
  );
};

export default IrregularCheckList;
