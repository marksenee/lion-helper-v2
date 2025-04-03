import React, { useState } from "react";
import {
  CalendarContainer,
  Button,
  WeekDisplay,
  TaskTable,
  Row,
  TaskName,
  CircleContainer,
  Circle,
  DayLabel,
  DayContainer,
  TabContainer,
  Tab,
} from "./styles";

const DashBoardComponents = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("daily"); // daily 또는 weekly

  const getWeekRange = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // 일요일부터 시작
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return `${start.getMonth() + 1}월 ${start.getDate()}일 - ${
      end.getMonth() + 1
    }월 ${end.getDate()}일`;
  };

  const changeWeek = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + direction * 7);
      return newDate;
    });
  };

  // 데일리와 위클리 데이터 분리
  const dailyTasks = [
    "강사일지 작성 여부",
    "출석체크 완료 여부",
    "과제 피드백 여부",
    "학습자료 업로드 여부",
  ];

  const weeklyTasks = [
    "주간 보고서 작성",
    "주간 미팅 참석",
    "주간 과제 검토",
    "주간 커리큘럼 검토",
    "주간 학습 진도 확인",
  ];

  const days = ["월", "화", "수", "목", "금"];

  // 현재 활성화된 탭에 따라 표시할 태스크 선택
  const currentTasks = activeTab === "daily" ? dailyTasks : weeklyTasks;

  return (
    <div>
      <CalendarContainer>
        <Button onClick={() => changeWeek(-1)}>&lt;</Button>
        <WeekDisplay>{getWeekRange(currentDate)}</WeekDisplay>
        <Button onClick={() => changeWeek(1)}>&gt;</Button>
      </CalendarContainer>
      <TabContainer>
        <Tab
          active={activeTab === "daily"}
          onClick={() => setActiveTab("daily")}
        >
          데일리 업무 현황
        </Tab>
        <Tab
          active={activeTab === "weekly"}
          onClick={() => setActiveTab("weekly")}
        >
          위클리 업무 현황
        </Tab>
      </TabContainer>
      <TaskTable>
        <DayContainer>
          <TaskName></TaskName>
          <CircleContainer>
            {days.map((day) => (
              <DayLabel key={day}>{day}</DayLabel>
            ))}
          </CircleContainer>
        </DayContainer>
        {currentTasks.map((task, index) => (
          <Row key={`task-${index}`}>
            <TaskName>{task}</TaskName>
            <CircleContainer>
              {days.map((_, dayIndex) => (
                <Circle
                  key={dayIndex}
                  completed={Math.random() > 0.5}
                  onClick={() => {
                    // 여기에 상태 토글 로직 추가 가능
                    console.log(`Clicked ${task} for ${days[dayIndex]}`);
                  }}
                />
              ))}
            </CircleContainer>
          </Row>
        ))}
      </TaskTable>
    </div>
  );
};

export default DashBoardComponents;
