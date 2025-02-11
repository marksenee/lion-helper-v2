import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/header/Header";
import { FiCalendar } from "react-icons/fi"; // 달력 아이콘
import { IoIosArrowDown } from "react-icons/io"; // 토글 아이콘
import ProPageWithNotice from "../components/Notice/ProPageWithNotice";
import AttendancePage from "../components/Attendance/Attendance";
import DailyCheckList from "../components/checkBox/DailyCheckList";
import SaveButtonComponent from "../components/button/SaveButton";
import Issues from "../components/issue/Issue";
import IrregularCheckList from "../components/checkBox/IrregularCheckList";

const ProPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 헤더 공간을 확보하기 위해 변경 */
  height: 100vh;
  background-color: #fff;
  position: relative;
  padding-top: 1%; /* 헤더 높이만큼 패딩 추가 */
  overflow: auto; /* 내용이 길어질 경우 스크롤 가능하도록 설정 */
  padding-bottom: 90px; /* 푸터 공간을 위해 여백 추가 */
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 886px;
  margin-top: 5%;
  gap: 30px; /* 간격을 30px로 설정 */
`;

const Label = styled.label`
  font-family: "Pretandard", sans-serif;
  font-size: 15pt;
  color: #000000;
  width: 30%;
  margin-right: 20px; /* 레이블과 입력 상자 사이의 간격 추가 */
`;

const InputBox = styled.div`
  width: 60%;
  height: 50px;
  background-color: white;
  border: 2px solid #dcdcdc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
  border-radius: 10px;
`;

const DateInput = styled(DatePicker)`
  width: 70%;
  border: none;
  outline: none;
  font-size: 16px;
`;

const CalendarIcon = styled(FiCalendar)`
  width: 24px;
  height: 24px;
  color: gray;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  width: 60%;
  height: 50px;
  background-color: white;
  border: 2px solid #dcdcdc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
`;

const DropdownIcon = styled(IoIosArrowDown)`
  width: 24px;
  height: 24px;
  color: gray;
  margin-left: auto;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #dcdcdc;
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DropdownItem = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const SaveButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 18%;
`;

const ProPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState("과정 선택");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const formattedDate = selectedDate.toISOString().split("T")[0];

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setDropdownOpen(false);
  };

  const formattedDate = useMemo(() => {
    return selectedDate ? selectedDate.toISOString().split("T")[0] : "";
  }, [selectedDate]);

  useEffect(() => {
    console.log("formattedDate:", formattedDate);
  }, [formattedDate]);

  return (
    <>
      <Header />
      <ProPageContainer>
        <InputContainer>
          {/* 날짜 입력 */}
          <Label>날짜 입력</Label>
          <InputBox>
            <DateInput
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
            />
            <CalendarIcon />
          </InputBox>

          {/* 과정 선택 */}
          <Label>담당 과정 선택</Label>
          <DropdownContainer onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selectedCourse}
            <DropdownIcon />
            <DropdownList isOpen={dropdownOpen}>
              {[
                "클라우드 엔지니어링 1기",
                "데이터분석1",
                "프론트엔드스쿨 1기",
              ].map((course) => (
                <DropdownItem
                  key={course}
                  onClick={() => handleCourseSelect(course)}
                >
                  {course}
                </DropdownItem>
              ))}
            </DropdownList>
          </DropdownContainer>
        </InputContainer>
        <ProPageWithNotice />
        <AttendancePage
          selectedDate={formattedDate}
          selectedCourse={selectedCourse}
        />
        <DailyCheckList />
        <IrregularCheckList />

        {/* 버튼을 오른쪽 아래에 배치 */}
        <Issues formattedDate={formattedDate} selectedCourse={selectedCourse} />
      </ProPageContainer>
      {/* <SaveButtonContainer>
        {" "}
        <SaveButtonComponent />
      </SaveButtonContainer> */}
    </>
  );
};

export default ProPage;
