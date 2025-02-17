import styled from "styled-components";

const BoxContainer = styled.div`
  width: 886px;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;

  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  margin-top: 1%;
`;

const Title = styled.div`
  font-size: 18pt;
  font-weight: bold;
  color: #000000;
  margin-top: 2%;
`;

const CheckListSaveButton = styled.button`
  font-size: 13pt;
  margin-left: 1%;
  margin-top: 2%;
  background-color: transparent;
  border: 1px solid transparent;
  color: gray;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #ff7710;
  }
`;

const ChecklistContainer = styled.div`
  margin-top: 20px;
  max-height: ${(props) => (props.itemCount > 5 ? "250px" : "auto")};
  overflow-y: ${(props) => (props.itemCount > 5 ? "auto" : "visible")};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CheckboxLabel = styled.div`
  color: #000000;
  margin-left: 10px;
  font-size: large;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ReasonInputContainer = styled.div`
  width: 95%;
  height: 190px;
  background-color: #ffffff;
  border: 1px solid #ecebeb;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ReasonInput = styled.textarea`
  width: 800px;
  min-height: 20px;
  padding: 7px;
  border: none;
  outline: none;
  font-size: 13pt;
  color: #000000;
  resize: none;
  margin-left: 5%;
  margin-right: 1%;
  white-space: pre-line;
  border-radius: 5px;
  background-color: #f5f5f5;

  &::placeholder {
    color: #adabab;
  }
`;

const SubmitButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: white;
  border: 1px solid #ff7710;
  color: #ff7710;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-end;
  border-radius: 5px;

  &:hover {
    background-color: #ff7710;
    color: white;
  }
`;

const UncheckedListContainer = styled.div`
  max-height: 250px;
  overflow-y: auto;
  padding-right: 5px;
  margin-top: 2%;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between; /* 양쪽 끝까지 배치 */
  align-items: center;
  /* background-color: #f8f9fa; */
  border-radius: 8px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  margin-bottom: 20px;
  margin-left: 2%;
  margin-right: 2%;
`;

const Tab = styled.button`
  flex: 1;
  height: 100%;
  margin-top: 2%;
  background: ${({ active }) => (active ? "#ff7710" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  border-radius: 8px;

  &:hover {
    background: ${({ active }) => (active ? "#e0660f" : "#ddd")};
  }
`;

const TabWrapper = styled.div`
  width: calc(100% + 40px); /* BoxContainer의 padding(20px * 2) 고려 */
  margin-left: -20px; /* 왼쪽 패딩만큼 빼줌 */
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 5px 0;
`;

const SaveButton = styled.button`
  width: 100px;
  height: 52px;
  background-color: #f5f5f5;
  border-color: transparent;
  border-radius: 5px;
  font-family: "Pretandard", sans-serif;
  font-weight: semibold;
  font-size: 13pt;
  /* color: #000000; */
  cursor: pointer;
  /* transition: background-color 0.3s ease; */

  &:hover {
    background-color: #ff7710;
    color: white;
  }
`;

export {
  BoxContainer,
  Title,
  CheckListSaveButton,
  ChecklistContainer,
  CheckboxContainer,
  CheckboxLabel,
  Checkbox,
  ReasonInputContainer,
  ReasonInput,
  SubmitButton,
  UncheckedListContainer,
  TabContainer,
  Tab,
  TabWrapper,
  SaveButton,
};
