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
  width: 60%;
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  width: 60%;
  margin: 0 auto;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  background: #fff3ec;
  color: #ff7710;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffe5d6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff7710;
`;

const Progress = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const ViewModeContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  width: 200px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
  z-index: 1000;
`;

const ViewModeButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => (props.active ? "#FF7710" : "#666")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  width: 100px;
  text-align: center;
  border-bottom: ${(props) =>
    props.active ? "2px solid #FF7710" : "2px solid transparent"};

  &:hover {
    color: #ff7710;
  }
`;

const MainContent = styled.div`
  margin-top: 60px; // ViewModeContainer의 높이만큼 여백 추가
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
  GridContainer,
  Card,
  CardHeader,
  Tag,
  CardTitle,
  CardContent,
  CheckIcon,
  Progress,
  ViewModeContainer,
  ViewModeButton,
  MainContent,
};
