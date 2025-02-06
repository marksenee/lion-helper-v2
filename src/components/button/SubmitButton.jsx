import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: white;
  border: 1px solid #ff7710;
  color: #ff7710;
  font-size: 14px;
  font-family: "Pretandard", sans-serif;
  cursor: pointer;
  /* align-self: flex-end; */
  border-radius: 5px;
  /* margin-top: 10px; */
  &:hover {
    background-color: #ff7710;
    color: white;
  }
`;

const SubmitButtonComponents = () => {
  return (
    <SubmitWrapper>
      {" "}
      <SubmitButton>등록</SubmitButton>
    </SubmitWrapper>
  );
};

export default SubmitButtonComponents;
