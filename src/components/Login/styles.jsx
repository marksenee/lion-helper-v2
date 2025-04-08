import React from "react";
import styled from "styled-components";

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
  background-color: ${({ disabled }) => (disabled ? "#ffcaa2" : "#ff7710")};
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ffcaa2" : "#ff5500")};
  }
`;

const OptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  color: #555;
`;

// 비밀번호 변경 관련 스타일 컴포넌트
const ChangePasswordLink = styled.div`
  margin-top: 15px;
  color: #ff7710;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #ff5500;
  }
`;

const PasswordChangeForm = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const PasswordChangeInput = styled(Input)`
  width: 95%;
  margin-bottom: 10px;
`;

const PasswordChangeButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #ff7710;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ff5500;
  }
`;

const PasswordChangeCancelButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #f3f4f6;
  color: #555;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const PasswordValidationMessage = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: ${(props) =>
    props.error ? "#ef4444" : props.success ? "#10b981" : "#555"};
  text-align: left;
  padding-left: 10px;
`;

export {
  Container,
  LoginBox,
  Logo,
  SubText,
  Input,
  LoginButton,
  OptionBox,
  ChangePasswordLink,
  PasswordChangeForm,
  PasswordChangeInput,
  PasswordChangeButton,
  PasswordChangeCancelButton,
  PasswordValidationMessage,
};
