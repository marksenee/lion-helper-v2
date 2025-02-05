import React, { useState } from "react";
import styled from "styled-components";
import { FiClock } from "react-icons/fi";

const Container = styled.div`
  width: 886px;
  height: 450px;
  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 20px;
  font-family: Pretendard, sans-serif;
  margin-top: 1%;
`;

const Title = styled.div`
  font-size: 18pt;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-size: 15pt;
  margin-bottom: 3%;
`;

const Label = styled.div`
  width: 10%;
  font-size: 15pt;
  margin-right: 10px;
`;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 1%;
  margin-top: 1%;
`;

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const TimeInput = styled.input`
  width: 100px;
  height: 30px;
  border: 1px solid #dcdcdc;
  padding: 5px 10px;
  font-size: 18px;
  background: white;
  text-align: center;
  padding-right: 30px;
  border-radius: 5px;
`;

const ClockIcon = styled(FiClock)`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #888;
`;

const SubmitButton = styled.button`
  width: 56px;
  height: 40px;
  background: #ff7710;
  color: white;
  font-size: 12pt;
  border: none;
  cursor: pointer;
  border-radius: 5%;
`;

const Message = styled.div`
  font-size: 12pt;
  color: ${(props) => (props.error ? "red" : "#ff7710")};
  margin-left: 10px;
`;

const AttendanceRecord = () => {
  // 주강사 상태
  const [startTimeMain, setStartTimeMain] = useState("");
  const [endTimeMain, setEndTimeMain] = useState("");
  const [messageMain, setMessageMain] = useState("");
  const [errorMain, setErrorMain] = useState(false);

  // 보조강사 상태
  const [startTimeSub, setStartTimeSub] = useState("");
  const [endTimeSub, setEndTimeSub] = useState("");
  const [messageSub, setMessageSub] = useState("");
  const [errorSub, setErrorSub] = useState(false);

  const handleTimeChange = (setter) => (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) value = value.slice(0, 2) + ":" + value.slice(2); // ":" 자동 추가
    setter(value);
  };

  const handleSubmit = (role) => {
    const timeFormat = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

    if (role === "main") {
      if (!startTimeMain.match(timeFormat)) {
        setMessageMain(
          "출근 시간을 올바른 형식으로 입력해 주세요! (예: 09:00)"
        );
        setErrorMain(true);
        return;
      }
      if (!endTimeMain.match(timeFormat)) {
        setMessageMain(
          "퇴근 시간을 올바른 형식으로 입력해 주세요! (예: 18:00)"
        );
        setErrorMain(true);
        return;
      }
      setMessageMain("주강사 입력이 완료되었습니다.");
      setErrorMain(false);
    } else if (role === "sub") {
      if (!startTimeSub.match(timeFormat)) {
        setMessageSub("출근 시간을 올바른 형식으로 입력해 주세요! (예: 09:00)");
        setErrorSub(true);
        return;
      }
      if (!endTimeSub.match(timeFormat)) {
        setMessageSub("퇴근 시간을 올바른 형식으로 입력해 주세요! (예: 18:00)");
        setErrorSub(true);
        return;
      }
      setMessageSub("보조강사 입력이 완료되었습니다.");
      setErrorSub(false);
    }
  };

  return (
    <Container>
      <Title>🕕 강사/보조강사 출퇴근 기록</Title>
      <Subtitle>📌 출/퇴근 기록은 퇴근 후 한 번에 기록해 주세요!</Subtitle>

      {/* 주강사 입력 필드 */}
      <TimeInputContainer>
        <Label>주강사1</Label>
        <TimeInputWrapper>
          <TimeInput
            type="text"
            placeholder="출근 시간"
            value={startTimeMain}
            onChange={handleTimeChange(setStartTimeMain)}
          />
          <ClockIcon />
        </TimeInputWrapper>
        <TimeInputWrapper>
          <TimeInput
            type="text"
            placeholder="퇴근 시간"
            value={endTimeMain}
            onChange={handleTimeChange(setEndTimeMain)}
          />
          <ClockIcon />
        </TimeInputWrapper>
        <SubmitButton onClick={() => handleSubmit("main")}>입력</SubmitButton>
        {messageMain && <Message error={errorMain}>{messageMain}</Message>}
      </TimeInputContainer>

      {/* 보조강사 입력 필드 */}
      <TimeInputContainer>
        <Label>보조강사1</Label>
        <TimeInputWrapper>
          <TimeInput
            type="text"
            placeholder="출근 시간"
            value={startTimeSub}
            onChange={handleTimeChange(setStartTimeSub)}
          />
          <ClockIcon />
        </TimeInputWrapper>
        <TimeInputWrapper>
          <TimeInput
            type="text"
            placeholder="퇴근 시간"
            value={endTimeSub}
            onChange={handleTimeChange(setEndTimeSub)}
          />
          <ClockIcon />
        </TimeInputWrapper>
        <SubmitButton onClick={() => handleSubmit("sub")}>입력</SubmitButton>
        {messageSub && <Message error={errorSub}>{messageSub}</Message>}
      </TimeInputContainer>
    </Container>
  );
};

export default AttendanceRecord;
