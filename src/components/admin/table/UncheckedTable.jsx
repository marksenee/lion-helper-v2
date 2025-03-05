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

const UncheckedTable = () => {
  const [taskData, setTaskData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("부서 선택");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [solutions, setSolutions] = useState({});
  const [activeInput, setActiveInput] = useState(null);
  const [allTaskData, setAllTaskData] = useState([]); // 원본 데이터 저장

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", dateString);
      return dateString;
    }

    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const calculateDelay = (createdAt) => {
    if (!createdAt) return "-";

    const createdDate = new Date(createdAt);
    if (isNaN(createdDate.getTime())) {
      console.error("Invalid date format for delay calculation:", createdAt);
      return "-";
    }

    const today = new Date();
    const diffTime = today.getTime() - createdDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? `+${diffDays}` : "오늘";
  };

  const calculateDueDate = (createdAt) => {
    if (!createdAt) return "-";

    const createdDate = new Date(createdAt);
    if (isNaN(createdDate.getTime())) {
      console.error("Invalid date format for due date calculation:", createdAt);
      return "-";
    }

    createdDate.setDate(createdDate.getDate() + 7);

    const month = createdDate.getMonth() + 1;
    const day = createdDate.getDate();
    return `${month}/${day}`;
  };

  const cleanContent = (text) => {
    if (!text) return "";
    return text.replace("에 대한 미체크 사유", "").trim();
  };
  const handleSolutionSubmit = async (id) => {
    if (!solutions[id]) return;

    const requestData = {
      comment: solutions[id],
      unchecked_id: id,
    };

    try {
      const response = await proPage.postUnCheckedDescriptionsComment(
        requestData
      );
      console.log("POST Response:", response);

      if (response.status === 201) {
        alert("해결 방안이 성공적으로 전송되었습니다.");

        console.log("Fetching comments for ID:", id); // ID가 제대로 찍히는지 확인

        const updatedComments = await proPage.getUnCheckComment({
          unchecked_id: id,
        });

        console.log("Full GET Response:", updatedComments);

        const newComment = updatedComments.data.data.comment; // 이 부분은 구조 확인 후 수정 필요
        console.log("New Comment:", newComment);

        setTaskData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, action_plan: newComment } : item
          )
        );

        setSolutions((prev) => ({
          ...prev,
          [id]: "",
        }));
      }
    } catch (error) {
      console.error("해결 방안 전송 실패:", error);
      alert("전송 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await proPage.getUnCheckedDescriptions();
        const data = response.data?.data;
        const formattedData = Array.isArray(data) ? data : [data];

        const processedData = formattedData.map((item) => ({
          ...item,
          content: cleanContent(item.content),
          created_at: formatDate(item.created_at),
          delay: calculateDelay(item.created_at),
          due_date: calculateDueDate(item.created_at),
        }));

        setAllTaskData(processedData); // ✅ 원본 데이터 저장
        setTaskData(processedData); // ✅ 기본적으로 전체 데이터 표시
      } catch (error) {
        console.error("Error fetching checklist:", error);
        setAllTaskData([]);
        setTaskData([]);
      }
    };

    fetchTaskData();
  }, []);

  useEffect(() => {
    // ✅ 선택된 부서에 따라 필터링된 데이터 설정
    const filteredData =
      selectedCourse === "부서 선택"
        ? allTaskData
        : allTaskData.filter((item) => item.training_course === selectedCourse);

    setTaskData(filteredData);
  }, [selectedCourse, allTaskData]); // ✅ allTaskData가 바뀌면 다시 반영

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setDropdownOpen(false);
  };

  const handleDeleteIssue = async (id) => {
    try {
      const requestData = { unchecked_id: id }; // 올바른 데이터 형식으로 수정
      const response = await proPage.deleteUnCheckedDescriptions(requestData);

      if (response.status === 200) {
        alert("이슈가 성공적으로 삭제되었습니다.");
        setTaskData((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("이슈 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("이슈 삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <TitleWrapper>
        <DropdownContainer onClick={() => setDropdownOpen(!dropdownOpen)}>
          {selectedCourse || "코스 선택"}
          <DropdownIcon />
          <DropdownList isOpen={dropdownOpen}>
            {[...new Set(allTaskData.map((item) => item.training_course))].map(
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
              <TableHeader>일자</TableHeader>
              <TableHeader>미체크 항목</TableHeader>
              <TableHeader>사유</TableHeader>
              <TableHeader>해결 지연</TableHeader>
              <TableHeader>해결Due</TableHeader>
              <TableHeader>해결방안</TableHeader>
              <TableHeader>해결여부</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {taskData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.created_at}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>{item.action_plan}</TableCell>
                <TableCell>{item.delay}</TableCell>
                <TableCell>{item.due_date}</TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={solutions[item.id] || ""}
                    onChange={(e) =>
                      setSolutions((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    onFocus={() => setActiveInput(item.id)}
                    onBlur={() => setActiveInput(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && activeInput === item.id) {
                        handleSolutionSubmit(item.id);
                      }
                    }}
                    placeholder="해결 방안을 입력하세요"
                    style={{ width: "100%", padding: "4px" }}
                  />
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDeleteIssue(item.id)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    해결
                  </button>
                </TableCell>
                {/* <TableUrgencyCell>
                  <UrgencyBadge urgent={item.resolved}>
                    {item.resolved ? "완수" : "미완수"}
                  </UrgencyBadge>
                </TableUrgencyCell> */}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default UncheckedTable;
