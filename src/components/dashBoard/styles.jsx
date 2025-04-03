import styled from "styled-components";

const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  /* background: #ffffff; */
  border-radius: 12px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); */
  margin-bottom: 24px;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

const WeekDisplay = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding: 8px 16px;
  /* background: #f8f9fa; */
  border-radius: 8px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 24px auto;
  padding: 0 4px;
  /* border-bottom: 1px solid #e0e0e0; */
  padding-bottom: 2px;
  justify-content: center;
  width: fit-content;
  min-width: 400px;
`;

const Tab = styled.button`
  padding: 12px 32px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 15px;
  color: ${(props) => (props.active ? "#FF7710" : "#666")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  position: relative;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${(props) => (props.active ? "#FF7710" : "transparent")};
    transition: all 0.2s ease;
  }

  &:hover {
    color: #ff7710;
  }
`;

const TaskTable = styled.div`
  width: 90%;
  margin: 20px auto;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const DayContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0 24px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 8px;
`;

const DayLabel = styled.div`
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #fafafa;
  }
`;

const TaskName = styled.div`
  flex: 2;
  text-align: left;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  padding-left: 8px;
`;

const CircleContainer = styled.div`
  display: flex;
  gap: 24px;
  flex: 3;
  justify-content: space-around;
  padding: 0 16px;
`;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(props) => (props.completed ? "#FFE5D6" : "#f0f0f0")};
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid ${(props) => (props.completed ? "#FFD4BC" : "#e5e5e5")};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
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
  DayLabel,
  DayContainer,
};
