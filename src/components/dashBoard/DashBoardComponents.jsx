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
  GridContainer,
  Card,
  CardHeader,
  Tag,
  CardTitle,
  CardContent,
  CheckIcon,
  Progress,
} from "./styles";

const DashBoardComponents = ({ viewMode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("daily");

  const getWeekRange = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return `${start.getMonth() + 1}월 ${start.getDate()}일 - ${
      end.getMonth() + 1
    }월 ${end.getDate()}일`;
  };

  const getCurrentMonth = (date) => {
    return `${date.getMonth() + 1}월`;
  };

  const changeWeek = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7);
    setCurrentDate(newDate);
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const dailyTasks = [
    "강사일지 작성 여부",
    "출석체크 완료 여부",
    "과제 피드백 여부",
    "학습자료 업로드 여부",
  ];

  const monthlyTasks = [
    { title: "강사 일지 작성", tag: "강사", progress: "20/28" },
    { title: "강사 일지 작성", tag: "운영", progress: "20/28" },
    { title: "강사 일지 작성", progress: "20/28" },
    { title: "강사 일지 작성", progress: "20/28" },
    { title: "강사 일지 작성", progress: "20/28" },
    { title: "강사 일지 작성", progress: "20/28" },
    { title: "강사 일지 작성", progress: "20/28" },
    { title: "강사 일지 작성", progress: "20/28" },
    { title: "강사 일지 작성", progress: "20/28" },
  ];

  const days = ["월", "화", "수", "목", "금"];

  const renderWeeklyView = () => {
    return (
      <TaskTable>
        <DayContainer>
          <TaskName></TaskName>
          <CircleContainer>
            {days.map((day) => (
              <DayLabel key={day}>{day}</DayLabel>
            ))}
          </CircleContainer>
        </DayContainer>
        {dailyTasks.map((task, index) => (
          <Row key={`task-${index}`}>
            <TaskName>{task}</TaskName>
            <CircleContainer>
              {days.map((_, dayIndex) => (
                <Circle
                  key={dayIndex}
                  completed={Math.random() > 0.5}
                  onClick={() => {
                    console.log(`Clicked ${task} for ${days[dayIndex]}`);
                  }}
                />
              ))}
            </CircleContainer>
          </Row>
        ))}
      </TaskTable>
    );
  };

  const renderMonthlyView = () => {
    return (
      <GridContainer>
        {monthlyTasks.map((task, index) => (
          <Card key={index}>
            <CardHeader>
              {task.tag && <Tag>{task.tag}</Tag>}
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckIcon>✓</CheckIcon>
              <Progress>{task.progress}</Progress>
            </CardContent>
          </Card>
        ))}
      </GridContainer>
    );
  };

  return (
    <div style={{ marginLeft: "120px", paddingTop: "20px" }}>
      <CalendarContainer>
        <Button
          onClick={() =>
            viewMode === "week" ? changeWeek(-1) : changeMonth(-1)
          }
        >
          &lt;
        </Button>
        <WeekDisplay>
          {viewMode === "week"
            ? getWeekRange(currentDate)
            : getCurrentMonth(currentDate)}
        </WeekDisplay>
        <Button
          onClick={() => (viewMode === "week" ? changeWeek(1) : changeMonth(1))}
        >
          &gt;
        </Button>
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
      {viewMode === "week" ? renderWeeklyView() : renderMonthlyView()}
    </div>
  );
};

export default DashBoardComponents;
