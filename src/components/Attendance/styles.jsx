import styled from "styled-components";

// 전체 컨테이너
const Container = styled.div`
  width: 886px;
  height: 394px;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 20px;
`;

// 텍스트 스타일
const TitleText = styled.div`
  font-family: "Pretandard";
  font-size: 22pt;
  margin-bottom: 10px;
`;

const SubTitleText = styled.div`
  font-family: "Pretandard";
  font-size: 15pt;
  margin-bottom: 20px;
`;

const LabelText = styled.div`
  font-family: "Pretandard";
  font-size: 20pt;
  margin-right: 10px;
`;

// 입력 박스
const InputBox = styled.input`
  width: 502px;
  height: 30px;
  background-color: white;
  border: 1px solid #dcdcdc;
  margin-right: 10px;
  text-align: center;
`;

// 버튼 스타일
const InputButton = styled.div`
  width: 56px;
  height: 48px;
  background-color: #ff7710;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15pt;
  font-family: "Pretandard";
  cursor: pointer;
`;

// 경고 텍스트
const ErrorText = styled.div`
  color: red;
  font-family: "Pretandard";
  font-size: 15pt;
  margin-top: 10px;
`;

const SuccessText = styled.div`
  color: #ff7710;
  font-family: "Pretandard";
  font-size: 15pt;
  margin-top: 10px;
`;

export {
  Container,
  TitleText,
  SubTitleText,
  LabelText,
  InputBox,
  InputButton,
  ErrorText,
  SuccessText,
};
