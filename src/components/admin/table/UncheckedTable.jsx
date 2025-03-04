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

const UncheckedTable = () => {
  // const { courseItems } = useCourseStore();

  // const [taskData, setTaskData] = useState([]);
  const [taskData, setTaskData] = useState([
    {
      date: ["3/4", "3/4"],
      training_course: "데이터분석 부트캠프 4회차",
      manager: "박세은",
      unchecked_task: ["강사 일지 작성", "줌 기록 업로드"],
      reason: ["강사님 누락", "까먹음"],
      delay: ["+3", " +6"],
      solution: ["강사님께 작성 요청", "까먹지않도록 체크리스트 작성"],
      due_date: ["3/10", "3/10"],
    },
    // {
    //   dept: "TechSolLab",
    //   training_course: "클라우드 엔지니어링 2회차",
    //   manager: "박세은",
    //   unchecked_task: ["강사 일지 작성", "줌 기록 업로드"],
    //   reason: ["강사님 누락", "까먹음"],
    //   delay: "+3",
    //   solution: "까먹지않도록 체크리스트 작성",
    //   due_date: "3/10",
    // },
  ]);
  const [selectedCourse, setSelectedCourse] = useState("부서 선택");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // useEffect(() => {
  //   const fetchTaskData = async () => {
  //     try {
  //       const response = await proPage.getCheckPercent();
  //       console.log("asdf", response.data);

  //       if (response && response.data) {
  //         console.log("테스트", response);

  //         const data = response.data.data;
  //         setTaskData(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching checklist:", error);
  //     }
  //   };
  //   fetchTaskData();
  // }, []);

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
      {taskData.map((item, index) => (
        <h3 key={index}>
          {item.training_course}
          {":"}
          {item.manager}
        </h3>
      ))}
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>일자</TableHeader>
              <TableHeader>미체크 항목</TableHeader>
              <TableHeader>사유</TableHeader>
              <TableHeader>해결 지연</TableHeader>
              <TableHeader>해결방안</TableHeader>
              <TableHeader>해결Due</TableHeader>
              <TableHeader>해결여부</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {taskData.map((item, index) =>
              item.unchecked_task.map((task, subIndex) => (
                <TableRow key={`${index}-${subIndex}`}>
                  {/* 모든 행에 날짜 표시 */}
                  <TableCell>{item.date[subIndex]}</TableCell>
                  <TableCell>{task}</TableCell>
                  <TableCell>{item.reason[subIndex]}</TableCell>
                  <TableCell>{item.delay[subIndex]}</TableCell>
                  <TableCell>{item.solution[subIndex]}</TableCell>
                  <TableCell>{item.due_date[subIndex]}</TableCell>
                  <TableUrgencyCell>
                    <UrgencyBadge urgent={item.check_rate === "100.0%"}>
                      {item.check_rate === "100.0%" ? "완수" : "미완수"}
                    </UrgencyBadge>
                  </TableUrgencyCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default UncheckedTable;
