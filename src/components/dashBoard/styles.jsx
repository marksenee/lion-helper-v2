import styled from "styled-components";

const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const WeekDisplay = styled.div`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${(props) => (props.active ? "#FFCAA2" : "#D9D9D9")};
  cursor: pointer;
  margin: 0 5px;
  border-radius: 5px;
`;

const TaskTable = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

const TaskName = styled.div`
  flex: 1;
  text-align: left;
`;

const CircleContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props) => (props.completed ? "#FFCAA2" : "#D9D9D9")};
`;

export {
  CalendarContainer,
  Button,
  WeekDisplay,
  TabContainer,
  Tab,
  TaskTable,
  Row,
  TaskName,
  CircleContainer,
  Circle,
};
