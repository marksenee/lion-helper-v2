import React, { useState } from "react";
import styled from "styled-components";
import { FiClock } from "react-icons/fi";

const Container = styled.div`
  width: 886px;
  height: 394px;
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
  margin-right: 10px; /* 레이블과 다른 항목 사이에 간격 추가 */
`;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 항목을 왼쪽 정렬 */
  gap: 20px; /* 각 항목 간 간격 설정 */
  width: 100%; /* 전체 너비를 꽉 채우도록 설정 */
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
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleTimeChange = (setter) => (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length > 4) value = value.slice(0, 4); // 최대 4자리 제한
    if (value.length >= 3) value = value.slice(0, 2) + ":" + value.slice(2); // 자동으로 ":" 추가
    setter(value);
  };

  const handleSubmit = () => {
    const timeFormat = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    if (!startTime.match(timeFormat)) {
      setMessage("출근 시간을 올바른 형식으로 입력해 주세요! (예: 09:00)");
      setError(true);
      return;
    }
    if (!endTime.match(timeFormat)) {
      setMessage("퇴근 시간을 올바른 형식으로 입력해 주세요! (예: 18:00)");
      setError(true);
      return;
    }
    setMessage("입력이 완료되었습니다.");
    setError(false);
  };

  return (
    <Container>
      <Title>🕕 강사/보조강사 출퇴근 기록</Title>
      <Subtitle>📌 출/퇴근 기록은 퇴근 후 한 번에 기록해 주세요!</Subtitle>
      <TimeInputContainer>
        <Label>주강사1</Label>
        <TimeInputWrapper>
          <TimeInput
            type="text"
            placeholder="출근 시간"
            value={startTime}
            onChange={handleTimeChange(setStartTime)}
          />
          <ClockIcon />
        </TimeInputWrapper>
        <TimeInputWrapper>
          <TimeInput
            type="text"
            placeholder="퇴근 시간"
            value={endTime}
            onChange={handleTimeChange(setEndTime)}
          />
          <ClockIcon />
        </TimeInputWrapper>
        <SubmitButton onClick={handleSubmit}>입력</SubmitButton>
        {message && <Message error={error}>{message}</Message>}
      </TimeInputContainer>
      <TimeInputContainer>
        <Label>보조강사1</Label>
        <TimeInputWrapper>
          <TimeInput
            type="text"
            placeholder="출근 시간"
            value={startTime}
            onChange={handleTimeChange(setStartTime)}
          />
          <ClockIcon />
        </TimeInputWrapper>
        <TimeInputWrapper>
          <TimeInput
            type="text"
            placeholder="퇴근 시간"
            value={endTime}
            onChange={handleTimeChange(setEndTime)}
          />
          <ClockIcon />
        </TimeInputWrapper>
        <SubmitButton onClick={handleSubmit}>입력</SubmitButton>
        {message && <Message error={error}>{message}</Message>}
      </TimeInputContainer>
    </Container>
  );
};

export default AttendanceRecord;
