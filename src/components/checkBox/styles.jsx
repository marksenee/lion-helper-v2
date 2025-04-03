import styled from "styled-components";

const BoxContainer = styled.div`
  width: 886px;
  background-color: white;
  /* border: 1px solid #dcdcdc; */
  border-radius: 10px;
  /* padding-left: 20px; */
  padding-right: 20px;

  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  margin-top: 1%;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-top: 24px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 4px;

  &:before {
    content: "📝";
    font-size: 14px;
  }
`;

const CheckListSaveButton = styled.button`
  width: 120px;
  height: 36px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 6px;
  color: #888888;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ff7710;
    color: white;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
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
  justify-content: space-between;
  margin-bottom: 15px;
  border-bottom: 1px solid #dcdcdc;
  padding: 15px;
`;

const CategoryDiv = styled.div`
  /* width: 100px; */
  margin-top: 30px;
  margin-left: 1%;
`;

const CategoryText = styled.text`
  color: #ff7710;
  font-size: medium;
  /* flex-shrink: 0; //고정된 크기 유지 */
`;

const CheckboxLabel = styled.div`
  color: #000000;
  margin-left: 10px;
  font-size: 15px;
  /* word-break: break-all;
  white-space: normal; */
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ReasonInputContainer = styled.div`
  width: 100%;
  min-height: 70px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
    background-color: #f1f5f9;
  }
`;

const ReasonInput = styled.textarea`
  flex: 1;
  min-height: 70px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: #334155;
  resize: none;
  background-color: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ff7710;
    box-shadow: 0 0 0 2px rgba(255, 119, 16, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
    font-size: 12px;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 12px;
  bottom: 20px;
  width: 50px;
  height: 30px;
  background-color: #fff4eb;
  color: #ff7710;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ff7710;
    color: white;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
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
  font-size: 12pt;
  /* color: #000000; */
  cursor: pointer;
  /* transition: background-color 0.3s ease; */

  &:hover {
    background-color: #ff7710;
    color: white;
  }
`;

const Circle = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #888;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  position: relative;

  &:after {
    content: "";
    width: 12px;
    height: 12px;
    background-color: ${({ checked }) => (checked ? "#888" : "transparent")};
    border-radius: 50%;
    transition: background-color 0.2s ease-in-out;
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const UncheckedInputBox = styled.input`
  margin-top: 2%;
  margin-left: 10px;
  /* margin-bottom: 6px; */
  border-radius: 5px;
  padding: 5px;
  border: 1px solid #f5f5f5;
  width: 300px;
  height: 20px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1);
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const YesCount = styled.span`
  color: #888888;
  margin-right: 10px;
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
`;

const NoCount = styled.span`
  color: #ff7710;
  font-family: "Pretendard", sans-serif;
  /* font-weight: bold; */
  font-size: 18px;
`;

const CheckYesBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CheckNoBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 10px;
`;

const CheckStatusText = styled.span`
  font-size: 12px;
  color: "#888";
  margin-right: 10px;
`;

const IssueContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 5px;
  margin-top: 1px; */
`;

const IssueInputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  /* gap: 8px; */
  position: relative;
  margin-bottom: 2px;
`;

const IssueInput = styled.textarea`
  flex: 1;
  min-height: 90px;
  padding: 12px 16px;
  padding-right: 48px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: #334155;
  resize: none;
  background-color: white;
  transition: all 0.2s ease;
  width: 93%;

  &:focus {
    outline: none;
    border-color: #ff7710;
    box-shadow: 0 0 0 2px rgba(255, 119, 16, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
    font-size: 12px;
  }
`;

const IssueTextarea = styled.textarea`
  width: 100%;
  min-height: 70px;
  padding: 8px 12px;
  padding-right: 48px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: #334155;
  resize: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #94a3b8;
    font-size: 12px;
  }
`;

const IssueTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const IssueTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 4px;

  &:before {
    /* content: "📝"; */
    font-size: 14px;
  }
`;

const IssueButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-left: 8px;
`;

const AddIssueButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #fff4eb;
  color: #ff7710;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ff7710;
    color: white;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const RemoveIssueButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #ffe8e8;
  color: #ff4747;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ff4747;
    color: white;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
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
  HiddenCheckbox,
  Circle,
  CategoryText,
  UncheckedInputBox,
  StatusContainer,
  YesCount,
  NoCount,
  CheckYesBox,
  CheckNoBox,
  CheckStatusText,
  CategoryDiv,
  IssueContainer,
  IssueInputWrapper,
  IssueInput,
  IssueTextarea,
  IssueButtonGroup,
  AddIssueButton,
  RemoveIssueButton,
  IssueTitleContainer,
  IssueTitle,
};
