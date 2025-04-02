import React from "react";
import styled from "styled-components";

const TrainRegisButton = styled.button`
  background: #fff4eb;
  color: #ff7710;
  border: none;
  padding: 10px 20px;
  width: 180px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #ff7710;
    color: #fff;
  }
`;

const TrainRegistrationButton = ({ onClick }) => {
  return <TrainRegisButton onClick={onClick}>+ 훈련과정 등록</TrainRegisButton>;
};

export default TrainRegistrationButton;
