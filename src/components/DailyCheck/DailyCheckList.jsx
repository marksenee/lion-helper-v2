import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { proPage } from "../../apis/api";

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
  font-size: 18pt;
  color: #000000;
  resize: none;
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

const DailyCheckList = () => {
  const [checkItems, setCheckItems] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await proPage.getDailyCheck();
        console.log(response.data);

        if (response && response.data && Array.isArray(response.data.data)) {
          setCheckItems(response.data.data);

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

  return (
    <BoxContainer>
      <Title>✅ 일일 업무 체크리스트</Title>
      <ChecklistContainer itemCount={checkItems.length}>
        {checkItems.map((item) => (
          <CheckboxContainer key={item.id}>
            <Checkbox
              type="checkbox"
              checked={checkedStates[item.id] || false}
              onChange={() => handleCheckboxChange(item.id)}
            />
            <CheckboxLabel>{item.task_name}</CheckboxLabel>
          </CheckboxContainer>
        ))}
      </ChecklistContainer>

      <ReasonInputContainer>
        <ReasonInput
          placeholder="미체크 된 항목에 대해 사유를 작성해 주세요."
          value={reason}
          onChange={handleReasonChange}
        />
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </ReasonInputContainer>
    </BoxContainer>
  );
};

export default DailyCheckList;
