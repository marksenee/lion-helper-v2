import styled from "styled-components";
import { FiClock, FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const Container = styled.div`
  width: 880px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  font-family: Pretendard, sans-serif;
  margin-top: 1%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
`;

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  margin-bottom: 24px;
  color: #ff7710;
  font-weight: 500;
`;

const Label = styled.div`
  width: 80px;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
`;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 95%;
  margin-bottom: 16px;
  padding: 13px;
  /* background: #f8fafc; */
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const TimeInput = styled.input`
  width: 120px;
  height: 36px;
  border: 1px solid #e2e8f0;
  padding: 0 12px;
  font-size: 14px;
  background: white;
  text-align: center;
  padding-right: 32px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ff7710;
    box-shadow: 0 0 0 2px rgba(255, 119, 16, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const ClockIcon = styled(FiClock)`
  position: absolute;
  right: 10px;
  color: #94a3b8;
`;

const SubmitButton = styled.button`
  width: 64px;
  height: 36px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  background: #ff7710;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background: #e66a0d;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Message = styled.div`
  font-size: 13px;
  color: ${(props) => (props.error ? "#ef4444" : "#ff7710")};
  margin-left: 12px;
  font-weight: 500;
`;

const PlusIcon = styled(FiPlusCircle)`
  font-size: 20px;
  color: #ff7710;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const MinusIcon = styled(FiMinusCircle)`
  font-size: 20px;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const DownloadButton = styled.button`
  background: none;
  border: none;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px 16px;
  border-radius: 8px;

  &:hover {
    color: #ff7710;
    background: #fff7ed;
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
