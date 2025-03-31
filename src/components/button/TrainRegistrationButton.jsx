import React from "react";
import styled from "styled-components";

const TrainRegisButton = styled.button`
  background: #fff4eb;
  color: #ff7710;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #ffcaa2;
    color: #fff;
  }
`;

const TrainRegistrationButton = () => {
  return <TrainRegisButton>훈련과정 등록</TrainRegisButton>;
};

export default TrainRegistrationButton;
