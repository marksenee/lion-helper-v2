import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../\bstore/useAuthStore";
import {
  Container,
  LoginBox,
  Logo,
  SubText,
  Input,
  LoginButton,
} from "./styles";
import { proPage } from "../../apis/api";
// import { proPage } from "/Users/parkseeun/Projects/lion-helper-v2/src/apis/api";

const LoginComponent = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const { postLogin } = useAuthStore(); // Zustand에서 postLogin 가져오기
  const isFormValid = id.trim() !== "" && pw.trim() !== "";

  const handleLogin = async () => {
    if (!isFormValid) {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    const loginData = {
      username: id,
      password: pw,
    };

    try {
      const response = await proPage.postLogin(loginData); // Zustand의 postLogin 호출
      if (response) {
        // const { username } = response.data;
        // useAuthStore.getState().setUsername(username);
        navigate("/app/checklist/today");
        return response;
      }
      // alert("로그인 완료!");
      // navigate("/app/checklist/today");
    } catch (error) {
      console.error("로그인 오류:", error);
      //   alert("로그인 실패. 다시 시도해주세요.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isFormValid) {
      handleLogin();
    }
  };

  return (
    <Container>
      <LoginBox onKeyDown={handleKeyDown}>
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
        <LoginButton onClick={handleLogin} disabled={!isFormValid}>
          로그인
        </LoginButton>
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

export default LoginComponent;
