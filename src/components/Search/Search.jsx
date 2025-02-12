import React, { useState } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
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
} from "./styles";

const Search = () => {
  console.log("asdfasdfadfs");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // 검색 결과 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [openAnswers, setOpenAnswers] = useState([]); // 열린 답변의 인덱스 배열
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = () => {
    // 예시 데이터 생성 (실제 API 연동 시 fetch로 대체)
    const dummyResults = Array(30)
      .fill(null)
      .map((_, index) => ({
        question: `Q. 관련질문 ${index + 1}`,
        answer: `A. 이 질문에 대한 답변 내용 ${index + 1}`,
      }));

    setResults(dummyResults);
    setCurrentPage(1);
    setIsSearched(true); // 검색 버튼을 눌렀으면 상태값 변경
  };

  const toggleAnswer = (index) => {
    if (openAnswers.includes(index)) {
      setOpenAnswers(openAnswers.filter((i) => i !== index)); // 닫기
    } else {
      setOpenAnswers([...openAnswers, index]); // 열기
    }
  };

  // 페이지네이션 데이터
  const resultsPerPage = 10;
  const paginatedResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleKeywordClick = (keyword) => {
    alert(`${keyword} 키워드를 검색합니다.`);
  };

  return (
    <Wrapper>
      <Title>라이언 헬퍼</Title>
      <SearchBox>
        <SearchInput placeholder="라이언 헬퍼에게 무엇이든 물어보세요" />
        <SearchIcon onClick={handleSearch}>
          <FaSearch />
        </SearchIcon>
      </SearchBox>
      {!isSearched && (
        <KeywordsWrapper>
          <Keyword highlight>많이 찾는 키워드</Keyword>
          <Keyword onClick={() => handleKeywordClick("키워드 1")}>
            | 키워드 1
          </Keyword>
          <Keyword onClick={() => handleKeywordClick("키워드 2")}>
            | 키워드 2
          </Keyword>
          <Keyword onClick={() => handleKeywordClick("키워드 3")}>
            | 키워드 3
          </Keyword>
        </KeywordsWrapper>
      )}

      {isSearched && (
        <ResultsContainer>
          {paginatedResults.map((item, index) => (
            <div key={index}>
              <QuestionBox onClick={() => toggleAnswer(index)}>
                <QuestionText>{item.question}</QuestionText>
                <ToggleIcon>
                  {openAnswers.includes(index) ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </ToggleIcon>
              </QuestionBox>
              {openAnswers.includes(index) && (
                <AnswerBox>{item.answer}</AnswerBox>
              )}
            </div>
          ))}
        </ResultsContainer>
      )}

      {results.length > 0 && (
        <PaginationContainer>
          <PageButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            이전
          </PageButton>
          <PageButton
            disabled={currentPage * resultsPerPage >= results.length}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            다음
          </PageButton>
        </PaginationContainer>
      )}
    </Wrapper>
  );
};

export default Search;
