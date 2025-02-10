import React, { useState } from "react";
import { proPage } from "../../apis/api";
import {
  Container,
  Title,
  Subtitle,
  Label,
  TimeInputContainer,
  TimeInputWrapper,
  TimeInput,
  ClockIcon,
  SubmitButton,
  Message,
} from "./styles";

const AttendanceRecord = ({ selectedDate, selectedCourse }) => {
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

  const handleSubmit = async (role) => {
    const timeFormat = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    let checkIn, checkOut, setMessage, setError;

    if (role === "main") {
      checkIn = startTimeMain;
      checkOut = endTimeMain;
      setMessage = setMessageMain;
      setError = setErrorMain;
    } else {
      checkIn = startTimeSub;
      checkOut = endTimeSub;
      setMessage = setMessageSub;
      setError = setErrorSub;
    }

    if (!checkIn.match(timeFormat)) {
      setMessage("출근 시간을 올바른 형식으로 입력해 주세요! (예: 09:00)");
      setError(true);
      return;
    }
    if (!checkOut.match(timeFormat)) {
      setMessage("퇴근 시간을 올바른 형식으로 입력해 주세요! (예: 18:00)");
      setError(true);
      return;
    }

    // 백엔드로 전송할 데이터
    const requestData = {
      check_in: checkIn,
      check_out: checkOut,
      daily_log: false, // 필요에 따라 수정 가능
      date: selectedDate, // YYYY-MM-DD 형식
      instructor: role === "main" ? "1" : "2", // 예제: 주강사(1), 보조강사(2)
      training_course: selectedCourse,
    };

    try {
      const response = await proPage.attendance(requestData);
      if (response.status === 201) {
        setMessage("출퇴근 기록이 정상적으로 제출되었습니다.");
        setError(false);
      } else {
        setMessage("제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
        setError(true);
      }
    } catch (error) {
      setMessage("서버와의 연결에 문제가 발생했습니다.");
      setError(true);
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
