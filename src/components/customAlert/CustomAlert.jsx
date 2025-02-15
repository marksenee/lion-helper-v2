import React, { useEffect } from "react";
import styled from "styled-components";
import { CheckCircle } from "lucide-react"; // 아이콘 추가

const AlertContainer = styled.div`
  position: fixed;
  top: 60px; /* 헤더 아래 배치 */
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 70px;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 최상단 배치 */
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const AlertText = styled.div`
  color: #ff7710;
  font-size: 14pt;
  margin-left: 10px;
  font-weight: bold;
`;

const CustomAlert = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000); // 3초 후 자동 닫기
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <AlertContainer visible={visible}>
      <CheckCircle size={20} color="#ff7710" />
      <AlertText>{message}</AlertText>
    </AlertContainer>
  );
};

export default CustomAlert;
