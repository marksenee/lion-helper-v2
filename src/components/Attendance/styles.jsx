import styled from "styled-components";
import { FiClock, FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const Container = styled.div`
  width: 886px;
  /* height: 450px; */
  background: #fff;
  /* border: 1px solid #dcdcdc; */
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
  font-size: 13pt;
`;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  width: 65px;
  height: 30px;
  border: 1px solid #dcdcdc;
  padding: 5px 20px;
  font-size: 13px;
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
  font-size: 12pt;
  border: none;
  cursor: pointer;
  border-radius: 5%;

  &:hover {
    background-color: #ff7710;
    color: white;
  }
`;

const Message = styled.div`
  font-size: 12pt;
  color: ${(props) => (props.error ? "red" : "#ff7710")};
  margin-left: 10px;
`;

const PlusIcon = styled(FiPlusCircle)`
  font-size: 20px;
  color: #ff7710;
  cursor: pointer;
`;

const MinusIcon = styled(FiMinusCircle)`
  font-size: 20px;
  color: #ff0000;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DownloadButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff7710;
  }
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
  PlusIcon,
  MinusIcon,
  IconContainer,
  TitleContainer,
  DownloadButton,
};
