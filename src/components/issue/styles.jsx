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
  font-family: "Pretandard", sans-serif;
  font-size: 18pt;
  font-weight: bold;
  color: #000000;
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
  font-size: 15pt;
  color: #000000;
  resize: none;
  font-family: "Pretandard", sans-serif;
  &::placeholder {
    color: #adabab;
  }
`;

const SubmitButton = styled.button`
  width: 70px;
  height: 52px;
  background-color: white;
  border-color: transparent;
  font-size: 15px;
  font-family: "Pretandard", sans-serif;
  cursor: pointer;
  align-self: flex-end;
  border-radius: 5px;
  margin-top: 10px;
  &:hover {
    background-color: #fffaf5;
    color: #ff7710;
  }
`;

export { BoxContainer, Title, ReasonInputContainer, ReasonInput, SubmitButton };
