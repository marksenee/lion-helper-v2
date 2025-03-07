import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { proPage } from "../apis/api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../\bstore/useAuthStore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9fafb;
`;

const LoginBox = styled.div`
  width: 450px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #ff7710;
  margin-bottom: 10px;
  font-family: "suite";
`;

const SubText = styled.p`
  color: #555;
  font-size: 14px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 95%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    border-color: #ffcaa2;
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ffcaa2;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #ff7710;
  }
`;

const OptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  color: #555;
`;

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const { postLogin } = useAuthStore(); // Zustand에서 postLogin 가져오기

  useEffect(() => {
    // 스타일 로드가 지연될 경우 강제로 업데이트 (스타일 지연 문제 해결)
  }, []);

  const handleLogin = async () => {
    if (!id || !pw) {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    const loginData = {
      username: id,
      password: pw,
    };

    try {
      await postLogin(loginData); // Zustand의 postLogin 호출
      alert("로그인 완료!");
      navigate("/checklist/today");
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 실패. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <LoginBox>
        <Logo>멋쟁이사자처럼 라이언헬퍼</Logo>
        <SubText>아이디와 비밀번호를 입력해주세요</SubText>
        <Input
          type="text"
          placeholder="아이디 입력"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 입력"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        {/* <OptionBox>
          <label>
            <input type="checkbox" /> 로그인 유지
          </label>
          <a href="/find-password">비밀번호 찾기</a>
        </OptionBox> */}
      </LoginBox>
    </Container>
  );
};

export default Login;
