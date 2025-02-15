import styled from "styled-components";

const BoxContainer = styled.div`
  width: 886px;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 1%;
`;

const Title = styled.div`
  font-size: 18pt;
  font-weight: bold;
  color: #000000;
`;

const CheckListSaveButton = styled.button`
  font-size: 13pt;
  margin-left: 1%;
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
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 13pt;
  color: #000000;
  resize: none;
  margin-left: 5%;
  white-space: pre-line;
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
};
