import React, { useEffect, useMemo, useState } from "react";
import {
  TableWrapper,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
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
  const [selectedDept, setSelectedDept] = useState("전체 보기");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [solutions, setSolutions] = useState({});
  const [activeInput, setActiveInput] = useState(null);
  const [allTaskData, setAllTaskData] = useState([]); // 원본 데이터 저장

  // ✅ 날짜 형식 변환 함수 (중복 제거)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // ✅ 지연일 계산 (불필요한 today 재생성 방지)
  const calculateDelay = (createdAt) => {
    const createdDate = new Date(createdAt);
    return isNaN(createdDate.getTime())
      ? "-"
      : `+${Math.floor(
          (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
        )}`;
  };

  // ✅ 해결 Due 계산 (월별 마지막 날 반영)
  const calculateDueDate = (createdAt) => {
    const createdDate = new Date(createdAt);
    if (isNaN(createdDate.getTime())) return "-";

    const year = createdDate.getFullYear();
    const month = createdDate.getMonth();

    // 월별 마지막 날짜 계산 (예: 2월은 28일 또는 29일, 4월은 30일)
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    // 7일 후 날짜 계산 (기존 날짜 + 7일)
    const dueDate = new Date(createdDate);
    dueDate.setDate(createdDate.getDate() + 7);

    // 만약 dueDate가 해당 월의 마지막 날짜를 넘으면 마지막 날짜로 설정
    if (dueDate.getDate() > lastDayOfMonth) {
      dueDate.setDate(lastDayOfMonth);
    }

    return `${dueDate.getMonth() + 1}/${dueDate.getDate()}`;
  };

  const cleanContent = (text) => {
    if (!text) return "";
    return text.replace("에 대한 미체크 사유", "").trim();
  };

  // ✅ 해결 방안 전송
  const handleSolutionSubmit = async (id) => {
    if (!solutions[id]) return;

    try {
      const response = await proPage.postUnCheckedDescriptionsComment({
        comment: solutions[id],
        unchecked_id: id,
      });

      if (response.status === 201) {
        alert("해결 방안이 성공적으로 전송되었습니다.");
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
        processedData.forEach((item) => fetchComments(item.id));
      } catch (error) {
        console.error("Error fetching checklist:", error);
        setAllTaskData([]);
        setTaskData([]);
      }
    };

    setSolutions(
      taskData.reduce((acc, item) => {
        acc[item.id] = item.solution || ""; // 기존 해결 방안이 있으면 반영
        return acc;
      }, {})
    );

    fetchTaskData();
  }, []);

  // useEffect(() => {
  //   // ✅ 선택된 부서에 따라 필터링된 데이터 설정
  //   const filteredData =
  //     selectedCourse === "부서 선택"
  //       ? allTaskData
  //       : allTaskData.filter((item) => item.training_course === selectedCourse);

  //   setTaskData(filteredData);
  // }, [selectedCourse, allTaskData]); // ✅ allTaskData가 바뀌면 다시 반영

  const fetchComments = async (unchecked_id) => {
    try {
      const response = await proPage.getUnCheckComment({ unchecked_id });

      if (response.status === 200) {
        // 🔹 최신 comment 가져오기 (created_at 기준 정렬 후 최신 데이터 1개 선택)
        const latestComment = response.data.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )[0];

        // 🔹 solutions 상태 업데이트
        setSolutions((prev) => ({
          ...prev,
          [unchecked_id]: latestComment?.comment || "",
        }));
      }
    } catch (error) {
      console.error("🚨 API 호출 오류:", error);
    }
  };

  const handleDeptSelect = (dept) => {
    setSelectedDept(dept);
    setDropdownOpen(false);
  };

  const uniqueDepts = [
    "전체 보기",
    ...new Set(allTaskData.map((item) => item.dept)),
  ];

  const filteredCheckRate =
    selectedDept !== "전체 보기"
      ? allTaskData.filter((item) => item.dept === selectedDept)
      : allTaskData;

  // ✅ 미체크 이슈 삭제
  const handleDeleteIssue = async (id) => {
    try {
      const response = await proPage.deleteUnCheckedDescriptions({
        unchecked_id: id,
      });

      if (response.status === 200) {
        alert("삭제되었습니다.");
        setTaskData((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("삭제에 실패했습니다.");
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
          {selectedDept}
          <DropdownIcon />
          <DropdownList isOpen={dropdownOpen}>
            {uniqueDepts.map((dept) => (
              <DropdownItem key={dept} onClick={() => handleDeptSelect(dept)}>
                {dept}
              </DropdownItem>
            ))}
          </DropdownList>
        </DropdownContainer>
      </TitleWrapper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>일자</TableHeader>
              <TableHeader>과정명</TableHeader>
              <TableHeader>미체크 항목</TableHeader>
              <TableHeader>사유</TableHeader>
              <TableHeader>해결 지연</TableHeader>
              <TableHeader>해결Due</TableHeader>
              <TableHeader>해결방안</TableHeader>
              <TableHeader>해결여부</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {filteredCheckRate.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.created_at}</TableCell>
                <TableCell>{item.training_course}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>{item.action_plan}</TableCell>
                <TableCell>{item.delay}</TableCell>
                <TableCell>{item.due_date}</TableCell>
                <TableCell>
                  {activeInput === item.id ? (
                    <input
                      type="text"
                      value={solutions[item.id] || ""}
                      onChange={(e) =>
                        setSolutions((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                      onBlur={() => setActiveInput(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSolutionSubmit(item.id);
                          setActiveInput(null);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <div
                      onClick={() => setActiveInput(item.id)}
                      style={{
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        width: "200px",
                      }}
                    >
                      {solutions[item.id] || "해결 방안을 입력하세요"}
                    </div>
                  )}
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
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default UncheckedTable;
