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
    const fetchTaskData = async () => {
      try {
        const response = await proPage.getCheckPercent();

        if (response && response.data) {
          const data = response.data.data;
          setTaskData(data);
        }
      } catch (error) {
        console.error("Error fetching checklist:", error);
      }
    };

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

    fetchTaskData();
    fetchAllCheckRate();
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setDropdownOpen(false);
  };

  return (
    <Container>
      <TitleWrapper>
        {/* <Title>✍🏻 업무 현황</Title> */}
        <DropdownContainer onClick={() => setDropdownOpen(!dropdownOpen)}>
          {selectedCourse || "부서 선택"}
          <DropdownIcon />
          <DropdownList isOpen={dropdownOpen}>
            {taskData.map((item) => (
              <DropdownItem
                key={item.dept} // Use the dept as the key
                onClick={() => handleCourseSelect(item.dept)}
              >
                {item.dept}
              </DropdownItem>
            ))}
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
            {taskData.map((item, index) => {
              // allCheckRate에서 해당 항목 찾기
              const matchingCheckRate = allCheckRate.find(
                (rate) => rate.training_course === item.training_course
              );

              return (
                <TableRow key={index}>
                  <TableCell>{item.training_course}</TableCell>
                  <TableCell>{item.manager}</TableCell>
                  <TableCell>{item.check_rate}</TableCell>

                  {/* `matchingCheckRate`가 있으면 해당 `check_rate`를 보여주고, 없으면 기본값 표시 */}
                  <TableCell>
                    {matchingCheckRate ? matchingCheckRate.check_rate : "0%"}
                  </TableCell>

                  <TableUrgencyCell>
                    <UrgencyBadge
                      urgent={matchingCheckRate?.check_rate === "100.0%"}
                    >
                      {matchingCheckRate?.check_rate === "100.0%"
                        ? "완수"
                        : "미완수"}
                    </UrgencyBadge>
                  </TableUrgencyCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default TableComponents;
