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
  IconContainer,
  PlusIcon,
  MinusIcon,
} from "./styles";

const AttendanceRecord = ({ selectedDate, selectedCourse }) => {
  const [dateInputError, setDateInputError] = useState();
  const [courseInputMessage, setCouresInputMessage] = useState();
  const [courseInputError, setCouresInputError] = useState();

  // 주강사 상태
  const [mainInstructors, setMainInstructors] = useState([
    { startTime: "", endTime: "" },
  ]);
  const [mainMessages, setMainMessages] = useState([]);
  const [mainErrors, setMainErrors] = useState([]);

  // 보조강사 상태
  const [subInstructors, setSubInstructors] = useState([
    { startTime: "", endTime: "" },
  ]);
  const [subMessages, setSubMessages] = useState([]);
  const [subErrors, setSubErrors] = useState([]);

  const handleTimeChange = (index, role, field, value) => {
    const updateList =
      role === "main" ? [...mainInstructors] : [...subInstructors];
    const cleanedValue = value.replace(/[^0-9]/g, "").slice(0, 4);
    if (cleanedValue.length === 4) {
      updateList[index][field] = cleanedValue.replace(
        /(\d{2})(\d{2})/,
        "$1:$2"
      );
    } else {
      updateList[index][field] = cleanedValue;
    }
    role === "main"
      ? setMainInstructors(updateList)
      : setSubInstructors(updateList);
  };

  const addInstructor = (role) => {
    if (role === "main") {
      setMainInstructors([...mainInstructors, { startTime: "", endTime: "" }]);
      setMainMessages([...mainMessages, ""]);
      setMainErrors([...mainErrors, false]);
    } else {
      setSubInstructors([...subInstructors, { startTime: "", endTime: "" }]);
      setSubMessages([...subMessages, ""]);
      setSubErrors([...subErrors, false]);
    }
  };

  const removeInstructor = (role, index) => {
    if (role === "main") {
      setMainInstructors(mainInstructors.filter((_, i) => i !== index));
      setMainMessages(mainMessages.filter((_, i) => i !== index));
      setMainErrors(mainErrors.filter((_, i) => i !== index));
    } else {
      setSubInstructors(subInstructors.filter((_, i) => i !== index));
      setSubMessages(subMessages.filter((_, i) => i !== index));
      setSubErrors(subErrors.filter((_, i) => i !== index));
    }
  };

  // 초기 상태를 빈 배열로 명확히 설정

  const handleSubmit = async (role, index) => {
    const timeFormat = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    let instructors, setMessages, setErrors, messages, errors;

    if (role === "main") {
      instructors = mainInstructors;
      setMessages = setMainMessages;
      setErrors = setMainErrors;
      messages = [...(mainMessages ?? [])]; // null 또는 undefined 방지
      errors = [...(mainErrors ?? [])]; // null 또는 undefined 방지
    } else {
      instructors = subInstructors;
      setMessages = setSubMessages;
      setErrors = setSubErrors;
      messages = [...(subMessages ?? [])];
      errors = [...(subErrors ?? [])];
    }

    if (selectedCourse === "과정 선택") {
      messages[index] = "과정을 선택해 주세요.";
      errors[index] = true;
      setMessages([...messages]);
      setErrors([...errors]);
      return;
    }

    const checkIn = instructors[index].startTime;
    const checkOut = instructors[index].endTime;

    if (!checkIn.match(timeFormat)) {
      messages[index] = "출근 시간을 입력해주세요! (예: 09:00)";
      errors[index] = true;
      setMessages([...messages]);
      setErrors([...errors]);
      return;
    }
    if (!checkOut.match(timeFormat)) {
      messages[index] = "퇴근 시간을 입력해주세요! (예: 18:00)";
      errors[index] = true;
      setMessages([...messages]);
      setErrors([...errors]);
      return;
    }

    const requestData = {
      check_in: checkIn,
      check_out: checkOut,
      daily_log: false,
      date: selectedDate,
      instructor: role === "main" ? "1" : "2",
      training_course: selectedCourse,
    };

    try {
      const response = await proPage.attendance(requestData);
      console.log("ddd", requestData);
      if (response.status === 201) {
        messages[index] = "출퇴근 기록이 제출되었습니다.";
        errors[index] = false;
      } else {
        messages[index] = "제출 중 오류가 발생했습니다. 다시 시도해 주세요.";
        errors[index] = true;
      }
    } catch (error) {
      messages[index] = "서버와의 연결에 문제가 발생했습니다.";
      errors[index] = true;
    }

    setMessages([...messages]);
    setErrors([...errors]);
  };

  return (
    <Container>
      <Title>🕕 강사/보조강사 출퇴근 기록</Title>
      <Subtitle>📌 출/퇴근 기록은 퇴근 후 한 번에 기록해 주세요!</Subtitle>

      {/* 주강사 입력 필드 */}
      {mainInstructors.map((instructor, index) => (
        <TimeInputContainer key={`main-${index}`}>
          <PlusIcon onClick={() => addInstructor("main")} />

          <Label>주강사 {index + 1}</Label>
          <TimeInputWrapper>
            <TimeInput
              type="text"
              placeholder="출근 시간"
              value={instructor.startTime}
              onChange={(e) =>
                handleTimeChange(index, "main", "startTime", e.target.value)
              }
            />
            <ClockIcon />
          </TimeInputWrapper>
          <TimeInputWrapper>
            <TimeInput
              type="text"
              placeholder="퇴근 시간"
              value={instructor.endTime}
              onChange={(e) =>
                handleTimeChange(index, "main", "endTime", e.target.value)
              }
            />
            <ClockIcon />
          </TimeInputWrapper>
          <SubmitButton onClick={() => handleSubmit("main", index)}>
            입력
          </SubmitButton>
          <IconContainer>
            <MinusIcon onClick={() => removeInstructor("main", index)} />
          </IconContainer>
          {mainMessages[index] && (
            <Message error={mainErrors[index]}>{mainMessages[index]}</Message>
          )}
        </TimeInputContainer>
      ))}

      {/* 보조강사 입력 필드 */}
      {subInstructors.map((instructor, index) => (
        <TimeInputContainer key={`sub-${index}`}>
          <PlusIcon onClick={() => addInstructor("sub")} />
          <Label>보조강사 {index + 1}</Label>
          <TimeInputWrapper>
            <TimeInput
              type="text"
              placeholder="출근 시간"
              value={instructor.startTime}
              onChange={(e) =>
                handleTimeChange(index, "sub", "startTime", e.target.value)
              }
            />
            <ClockIcon />
          </TimeInputWrapper>
          <TimeInputWrapper>
            <TimeInput
              type="text"
              placeholder="퇴근 시간"
              value={instructor.endTime}
              onChange={(e) =>
                handleTimeChange(index, "sub", "endTime", e.target.value)
              }
            />
            <ClockIcon />
          </TimeInputWrapper>
          <SubmitButton onClick={() => handleSubmit("sub", index)}>
            입력
          </SubmitButton>
          <IconContainer>
            <MinusIcon onClick={() => removeInstructor("sub", index)} />
          </IconContainer>
          {subMessages[index] && (
            <Message error={subErrors[index]}>{subMessages[index]}</Message>
          )}
        </TimeInputContainer>
      ))}
    </Container>
  );
};

export default AttendanceRecord;
