import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: calc(100% - 270px); /* 사이드바를 제외한 나머지 영역을 사용 */
  margin-left: 270px; /* 사이드바 크기만큼 여백 추가 */
  background-color: #fff;
`;

const Title = styled.h2`
  color: #f08c45;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.p`
  color: #444;
  font-size: 1rem;
  margin-bottom: 24px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 320px;
`;

const InputField = styled.input`
  background: #fdf6f0;
  border-color: transparent;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  padding: 0;
  list-style: none;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 12px;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background: #fdf6f0;
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  background: #fdf6f0;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
  border: none;
  cursor: pointer;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DateInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 93%;
  background: #fdf6f0;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;
  border: none;
  text-align: left;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background: #f8f8f8;
  color: #f08c45;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #f4e5d4;
  }

  &:disabled {
    background: #f4f4f4;
    color: #ccc;
    cursor: not-allowed;
  }
`;

export {
  Container,
  Title,
  Description,
  FormContainer,
  InputField,
  SubmitButton,
  DropdownList,
  DropdownItem,
  DropdownWrapper,
  DropdownButton,
  DateInputWrapper,
  StyledDatePicker,
};
