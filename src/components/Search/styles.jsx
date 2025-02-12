import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
`;

const Title = styled.h1`
  color: #ff7710;
  font-size: 100px;
  font-family: "Suite", sans-serif;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 730px;
  height: 69px;
  background-color: white;
  border: 1px solid #d3d3d3; /* 연한 회색 테두리 */
  border-radius: 30px;
  padding: 0 30px;
  margin-top: 30px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    width: 90%; /* 태블릿에서 넓이 유동적으로 조정 */
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 18px;
  color: #9e9e9e;
  background: none;

  &::placeholder {
    color: #9e9e9e;
  }
`;

const SearchIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #9e9e9e;
  font-size: 24px;

  &:hover {
    color: #ff7710;
  }
`;

const ResultsContainer = styled.div`
  width: 750px;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const QuestionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #d9d9d9;
  cursor: pointer;
`;

const QuestionText = styled.div`
  font-size: 22px;
  font-family: "Suite", sans-serif;
  color: #000;
`;

const ToggleIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnswerBox = styled.div`
  width: 715px;
  height: 100%;
  border-radius: 5px;
  background-color: #f8f8f8;
  margin: 10px 0 20px;
  padding: 15px;
  font-size: 16px;
  font-family: "Pretandard", sans-serif;
  color: #000;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  padding: 10px;
  margin: 0 5px;
  border: 1px solid #fff;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  font-family: "Pretandard", sans-serif;

  &:hover {
    background-color: #f0f0f0;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const KeywordsWrapper = styled.div`
  display: flex;
  gap: 10px;
  font-size: 22px;

  @media (max-width: 768px) {
    font-size: 20px; /* 태블릿에서 글씨 크기 조정 */
  }

  @media (max-width: 480px) {
    font-size: 18px; /* 모바일에서 글씨 크기 조정 */
  }
`;

const Keyword = styled.span`
  color: ${(props) => (props.highlight ? "#ff7710" : "#676767")};
  cursor: pointer;

  &:hover {
    text-decoration: underline; /* 마우스 오버 시 강조 */
  }
`;

export {
  Wrapper,
  Title,
  SearchBox,
  SearchInput,
  SearchIcon,
  ResultsContainer,
  QuestionBox,
  QuestionText,
  ToggleIcon,
  AnswerBox,
  PaginationContainer,
  PageButton,
  KeywordsWrapper,
  Keyword,
};
