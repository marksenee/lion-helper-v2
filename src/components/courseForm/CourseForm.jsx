import React, { useState } from "react";
import {
  Container,
  Title,
  Description,
  InputField,
  SubmitButton,
  FormContainer,
  DropdownWrapper,
  DropdownButton,
  DropdownList,
  DropdownItem,
  DateInputWrapper,
  StyledDatePicker,
} from "./styles";
import { proPage } from "../../apis/api";

const CourseForm = () => {
  const [selectedCourse, setSelectedCourse] =
    useState("📑 담당 과정을 선택해 주세요");

  const [selectedBatch, setSelectedBatch] = useState("📑 기수를 선택해 주세요");
  const [selectDept, setSelectDept] = useState("📑 부서를 선택해 주세요");

  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isNumberOpen, setIsNumberOpen] = useState(false);
  const [name, setName] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dept = ["교육기획1팀", "교육기획2팀", "교육기획3팀", "교육기획4팀"];

  const courses = [
    "데이터 분석",
    "클라우드 엔지니어링",
    "프론트엔드",
    "백엔드:Python",
    "백엔드:JAVA",
    "그로스 마케팅",
    "앱 개발 : Android",
    "UI/UX 디자인",
    "유니티 게임 개발",
    "AI Web 서비스 기획",
  ];

  // 1기부터 10기까지 배열 생성 (원하는 숫자만큼 확장 가능)
  const batches = Array.from({ length: 30 }, (_, i) => `${i + 1}기`);

  const isFormValid =
    selectedCourse && selectedBatch && selectDept && startDate && endDate;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    const data = {
      dept: selectDept.replace("📑 ", ""), // 앞의 아이콘 제거
      training_course: `${selectedCourse.replace(
        "📑 ",
        ""
      )} ${selectedBatch.replace("📑 ", "")}`,
      start_date: startDate.toISOString().split("T")[0], // yyyy-mm-dd 포맷
      end_date: endDate.toISOString().split("T")[0],
      manager_name: name,
    };

    try {
      const response = await proPage.postCourse(data);
      if (response.status === 200 || response.status === 201) {
        alert("과정이 성공적으로 등록되었습니다!");
      }
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Title>담당 과정 정보 입력</Title>
      <Description>
        과정 정보 입력을 마치면 체크리스트가 보여집니다!
      </Description>
      <FormContainer>
        {/* 드롭다운 버튼 */}
        <DropdownWrapper>
          <DropdownButton onClick={() => setIsDeptOpen(!isDeptOpen)}>
            {selectDept} ▼
          </DropdownButton>
          {isDeptOpen && (
            <DropdownList>
              {dept.map((course, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => {
                    setSelectDept(`📑 ${course}`);
                    setIsDeptOpen(false);
                  }}
                >
                  {course}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownWrapper>
        <DropdownWrapper>
          <DropdownButton onClick={() => setIsCourseOpen(!isCourseOpen)}>
            {selectedCourse} ▼
          </DropdownButton>
          {isCourseOpen && (
            <DropdownList>
              {courses.map((course, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => {
                    setSelectedCourse(`📑 ${course}`);
                    setIsCourseOpen(false);
                  }}
                >
                  {course}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownWrapper>
        {/* 기수 선택 드롭다운 */}
        <DropdownWrapper>
          <DropdownButton onClick={() => setIsNumberOpen(!isNumberOpen)}>
            {selectedBatch} ▼
          </DropdownButton>
          {isNumberOpen && (
            <DropdownList>
              {batches.map((batch, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => {
                    setSelectedBatch(`📑 ${batch}`);
                    setIsNumberOpen(false);
                  }}
                >
                  {batch}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownWrapper>
        <InputField
          placeholder="🧑🏻 담당자명을 작성해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* 날짜 입력 필드 */}
        <StyledDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="📅 과정 시작일을 선택해 주세요"
        />
        <StyledDatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="📅 과정 종료일을 선택해 주세요"
        />{" "}
        {/* 입력 완료 버튼 */}
        <SubmitButton onClick={handleSubmit} disabled={!isFormValid}>
          입력 완료
        </SubmitButton>{" "}
      </FormContainer>
    </Container>
  );
};

export default CourseForm;
