import React from "react";
import styled from "styled-components";

// 전체 화면 중앙 정렬
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

// 로그인 박스
const LoginBox = styled.div`
  width: 704px;
  height: 586px;
  border: 2px solid #dcdcdc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// 로그인 텍스트
const LoginTitle = styled.h1`
  font-family: "SUITE", sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: #ff7710;
  margin-bottom: 20px;
`;

// 입력창 스타일
const Input = styled.input`
  width: 506px;
  height: 93px;
  border: 2px solid #ff7710;
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  outline: none;

  &::placeholder {
    color: gray;
  }
`;

// 로그인 버튼
const LoginButton = styled.button`
  width: 506px;
  height: 93px;
  background-color: #ff7710;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e0660d;
  }
`;

const Login = () => {
  return (
    <Container>
      <LoginBox>
        {/* 로고 */}
        <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
          멋쟁이사자처럼
        </h1>

        {/* 로그인 제목 */}
        <LoginTitle>로그인</LoginTitle>

        {/* ID 입력창 */}
        <Input type="text" placeholder="ID를 입력해주세요(사번)" />

        {/* 비밀번호 입력창 */}
        <Input type="password" placeholder="비밀번호를 입력해주세요" />

        {/* 로그인 버튼 */}
        <LoginButton>로그인</LoginButton>
      </LoginBox>
    </Container>
  );
};

export default Login;
