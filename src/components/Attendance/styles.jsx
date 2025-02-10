import styled from "styled-components";
import { FiClock } from "react-icons/fi";

const Container = styled.div`
  width: 886px;
  height: 450px;
  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 20px;
  font-family: Pretendard, sans-serif;
  margin-top: 1%;
`;

const Title = styled.div`
  font-size: 18pt;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-size: 15pt;
  margin-bottom: 3%;
`;

const Label = styled.div`
  width: 10%;
  font-size: 15pt;
  margin-right: 10px;
`;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 1%;
  margin-top: 1%;
`;

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const TimeInput = styled.input`
  width: 100px;
  height: 30px;
  border: 1px solid #dcdcdc;
  padding: 5px 10px;
  font-size: 18px;
  background: white;
  text-align: center;
  padding-right: 30px;
  border-radius: 5px;
`;

const ClockIcon = styled(FiClock)`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #888;
`;

const SubmitButton = styled.button`
  width: 56px;
  height: 40px;
  background: #ff7710;
  color: white;
  font-size: 12pt;
  border: none;
  cursor: pointer;
  border-radius: 5%;
`;

const Message = styled.div`
  font-size: 12pt;
  color: ${(props) => (props.error ? "red" : "#ff7710")};
  margin-left: 10px;
`;

export {
  Container,
  Title,
  Subtitle,
  Label,
  TimeInputContainer,
  TimeInputWrapper,
  TimeInput,
  ClockIcon,
  SubmitButton,
  Message,
};
