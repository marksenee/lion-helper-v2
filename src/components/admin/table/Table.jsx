import React, { useEffect, useState } from "react";
import {
  TableWrapper,
  Title,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableUrgencyCell,
  UrgencyBadge,
} from "./styles";
import { proPage } from "../../../apis/api";
import {
  DropdownContainer,
  DropdownIcon,
  DropdownItem,
  DropdownList,
  TitleWrapper,
} from "../issues/styles";
import useCourseStore from "../../../\bstore/useCourseStore";
import GetIssuesComponent from "../issues/GetIssuesComponent";

const TableComponents = () => {
  // const { courseItems } = useCourseStore();

  const [taskData, setTaskData] = useState([]);
  const [allCheckRate, setAllCheckRate] = useState([]);
  // const [taskData, setTaskData] = useState([
  //   {
  //     dept: "TechSolLab",
  //     training_course: "데이터분석 부트캠프 4회차",
  //     manager: "최갑주",
  //     today_check_rate: "80.0%",
  //     check_rate: "80.0%",
  //   },
  //   {
  //     dept: "TechSolLab",
  //     training_course: "클라우드 엔지니어링 2회차",
  //     manager: "박세은",
  //     today_check_rate: "80.0%",
  //     check_rate: "80.0%",
  //   },
  //   {
  //     dept: "TechSolLab",
  //     training_course: "그로스마케팅 1회차",
  //     manager: "이채안",
  //     today_check_rate: "90.0%",
  //     check_rate: "80.0%",
  //   },
  //   {
  //     dept: "DevLab",
  //     training_course: "Android 부트캠프 3회차",
  //     manager: "이도현",
  //     today_check_rate: "100.0%",
  //     check_rate: "100.0%",
  //   },
  //   {
  //     dept: "PilotTeam",
  //     training_course: "유니티 게임 부트캠프 3회차",
  //     manager: "전승목",
  //     today_check_rate: "70.0%",
  //     check_rate: "80.0%",
  //   },
  // ]);
  const [selectedCourse, setSelectedCourse] = useState("과정 선택");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchAllCheckRate = async () => {
      try {
        const response = await proPage.getAllCheckRate();

        if (response && response.data) {
          const data = response.data.data;
          setAllCheckRate(data);
        }
      } catch (error) {
        console.error("Error fetching checklist:", error);
      }
    };

    fetchAllCheckRate();
  }, []);

  // useEffect(() => {
  //   // ✅ 선택된 부서에 따라 필터링된 데이터 설정
  //   const filteredData =
  //     selectedCourse === "부서 선택"
  //       ? allCheckRate
  //       : allCheckRate.filter(
  //           (item) => item.training_course === selectedCourse
  //         );

  //   setTaskData(filteredData);
  // }, [selectedCourse, allCheckRate]); // ✅ allTaskData가 바뀌면 다시 반영

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setDropdownOpen(false);
  };

  const filteredCheckRate =
    selectedCourse !== "과정 선택"
      ? allCheckRate.filter((item) => item.training_course === selectedCourse)
      : allCheckRate;

  return (
    <Container>
      <TitleWrapper>
        {/* <Title>✍🏻 업무 현황</Title> */}
        <DropdownContainer onClick={() => setDropdownOpen(!dropdownOpen)}>
          {selectedCourse || "부서 선택"}
          <DropdownIcon />

          <DropdownList isOpen={dropdownOpen}>
            {[...new Set(allCheckRate.map((item) => item.training_course))].map(
              (course) => (
                <DropdownItem
                  key={course}
                  onClick={() => handleCourseSelect(course)}
                >
                  {course}
                </DropdownItem>
              )
            )}
          </DropdownList>
        </DropdownContainer>
      </TitleWrapper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>과정</TableHeader>
              <TableHeader>담당자</TableHeader>
              <TableHeader>오늘 체크율</TableHeader>
              <TableHeader>월별 누적 체크율</TableHeader>
              <TableHeader>완수여부</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {filteredCheckRate.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.training_course}</TableCell>
                  <TableCell>{item.manager}</TableCell>
                  {/* `matchingCheckRate`가 있으면 해당 `check_rate`를 보여주고, 없으면 기본값 표시 */}
                  <TableCell>{item.daily_check_rate}</TableCell>
                  <TableCell>{item.overall_check_rate}</TableCell>

                  <TableUrgencyCell>
                    <UrgencyBadge urgent={item.overall_check_rate === "100.0%"}>
                      {item.overall_check_rate === "100.0%" ? "완수" : "미완수"}
                    </UrgencyBadge>
                  </TableUrgencyCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
      <GetIssuesComponent />
    </Container>
  );
};

export default TableComponents;
