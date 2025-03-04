import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/header/Header";
import { FiCalendar } from "react-icons/fi"; // 달력 아이콘
import { IoIosArrowDown } from "react-icons/io"; // 토글 아이콘
import AttendancePage from "../components/Attendance/Attendance";
import DailyCheckList from "../components/checkBox/DailyCheckList";
import Issues from "../components/issue/Issue";
import { proPage } from "../apis/api";
import NavigationTabs from "../components/tab/Tab";

const LayoutContainer = styled.div`
  display: flex;
  /* min-height: 100vh; */
`;

const SidebarContainer = styled.div`
  width: 250px; /* 사이드바 너비 설정 */
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f4f4f4; /* 배경색 */
  z-index: 1000; /* 다른 요소보다 위에 표시 */
`;

const ContentContainer = styled.div`
  flex: 1;
  margin-left: 250px; //사이드바 너비만큼 여백을 줌
  padding: 20px;
  background-color: #fff;
`;

const ProPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-height: 100vh; */
  /* justify-content: flex-start; 헤더 공간을 확보하기 위해 변경 */
  /* height: 100vh; */
  background-color: #fff;
  /* position: relative; */
  /* padding-top: 1%; */
  /* overflow: auto; 내용이 길어질 경우 스크롤 가능하도록 설정 */
  padding-bottom: 90px; /* 푸터 공간을 위해 여백 추가 */
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 900px;
  margin-top: 3%;
  margin-bottom: 1%;
  gap: 30px; /* 간격을 30px로 설정 */
`;

const Label = styled.label`
  font-family: "Pretandard", sans-serif;
  font-size: 15pt;
  color: #000000;
  width: 15%;
  margin-right: 15px; /* 레이블과 입력 상자 사이의 간격 추가 */
`;

const InputBox = styled.div`
  width: 25%;
  height: 50px;
  background-color: white;
  border: 2px solid #dcdcdc;
  display: flex;
  align-items: center;
  /* padding: 0 10px; */
  position: relative;
  border-radius: 10px;
`;

const DateInput = styled(DatePicker)`
  width: 70%;
  border: none;
  outline: none;
  font-size: 16px;
  margin-left: 7%;
`;

const CalendarIcon = styled(FiCalendar)`
  width: 24px;
  height: 24px;
  color: gray;
  /* cursor: pointer; */
`;

const DropdownContainer = styled.div`
  width: 25%;
  height: 30px;
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
  const [courseItem, setCourseItem] = useState([]);
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
    const fetchItems = async () => {
      try {
        const response = await proPage.getCourse(); // ✅ props로 받은 API 함수 실행
        if (response && response.data && response.data.data) {
          // uncheckedItems가 업데이트된 후, comments와 memoVisible 초기화
          setCourseItem(response.data.data);
        } else {
          console.error("데이터 형식 오류: 예상된 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <LayoutContainer>
        {/* <SidebarContainer></SidebarContainer> */}
        <Header />
        <ContentContainer>
          <NavigationTabs />

          <ProPageContainer>
            <InputContainer>
              {/* 날짜 입력 */}
              {/* <Label>날짜 입력</Label>
              <InputBox>
                <DateInput
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
                <CalendarIcon />
              </InputBox> */}

              {/* 과정 선택 */}
              {/* <Label>담당 과정 선택</Label> */}
              <DropdownContainer onClick={() => setDropdownOpen(!dropdownOpen)}>
                {selectedCourse}
                <DropdownIcon />
                <DropdownList isOpen={dropdownOpen}>
                  {courseItem.map((course) => (
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
            {/* <ProPageWithNotice /> */}
            <AttendancePage
              selectedDate={formattedDate}
              selectedCourse={selectedCourse}
            />
            <DailyCheckList selectedCourse={selectedCourse} />
            {/* <IrregularCheckList selectedCourse={selectedCourse} /> */}

            {/* 버튼을 오른쪽 아래에 배치 */}
            {/* <Issues
              formattedDate={formattedDate}
              selectedCourse={selectedCourse}
            /> */}
          </ProPageContainer>
        </ContentContainer>
      </LayoutContainer>
      {/* <SaveButtonContainer>
        {" "}
        <SaveButtonComponent />
      </SaveButtonContainer> */}
    </>
  );
};

export default ProPage;
