import React, { useState } from "react";
import {
  CalendarContainer,
  Button,
  WeekDisplay,
  TaskTable,
  Tab,
  TabContainer,
  Row,
  TaskName,
  CircleContainer,
  Circle,
} from "./styles";

const DashBoardComponents = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("daily");

  const getWeekRange = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Monday start
    const end = new Date(start);
    end.setDate(end.getDate() + 6); // Sunday end
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

  const tasks = ["강사일지 작성 여부", "과제 제출 여부", "출석 체크 여부"];
  const days = ["월", "화", "수", "목", "금"];

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
          데일리
        </Tab>
        <Tab
          active={activeTab === "weekly"}
          onClick={() => setActiveTab("weekly")}
        >
          위클리
        </Tab>
      </TabContainer>
      <TaskTable>
        <Row>
          <TaskName></TaskName>
          {days.map((day) => (
            <TaskName key={day} style={{ textAlign: "center" }}>
              {day}
            </TaskName>
          ))}
        </Row>
        {tasks.map((task, index) => (
          <>
            <Row key={`task-${index}`}>
              <TaskName>{task}</TaskName>
            </Row>
            <Row key={`circles-${index}`}>
              <CircleContainer
                style={{ justifyContent: "center", width: "100%" }}
              >
                {days.map((_, dayIndex) => (
                  <Circle key={dayIndex} completed={Math.random() > 0.5} />
                ))}
              </CircleContainer>
            </Row>
          </>
        ))}
      </TaskTable>
    </div>
  );
};

export default DashBoardComponents;
