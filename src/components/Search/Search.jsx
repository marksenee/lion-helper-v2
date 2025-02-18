import React, { useState } from "react";
import { MdContentCopy, MdEdit, MdCheck } from "react-icons/md";

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
import { proPage } from "../../apis/api";
import { helper } from "../../apis/helper";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // 검색 결과 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [openAnswers, setOpenAnswers] = useState([]); // 열린 답변의 인덱스 배열
  const [isSearched, setIsSearched] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null); // 복사된 항목 추적

  const [openVersions, setOpenVersions] = useState({}); // 각 질문의 버전 열림 여부
  const [editingIndex, setEditingIndex] = useState(null); // 현재 수정 중인 답변 인덱스
  const [editedText, setEditedText] = useState(""); // 수정 중인 답변 내용

  const versionHistory = {
    0: [
      {
        date: "1월 23일 오후 00:00",
        user: "박세은",
        text: "답변을 작성해 주세요",
      },
      {
        date: "1월 22일 오후 00:00",
        user: "박세은",
        text: "답변을 작성해 주세요",
      },
      {
        date: "1월 21일 오후 00:00",
        user: "박세은",
        text: "답변을 작성해 주세요",
      },
    ],
    1: [
      {
        date: "1월 20일 오후 00:00",
        user: "박세은",
        text: "답변을 작성해 주세요",
      },
      {
        date: "1월 19일 오후 00:00",
        user: "박세은",
        text: "답변을 작성해 주세요",
      },
    ],
  };

  const toggleVersionHistory = (index) => {
    setOpenVersions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSearch = async () => {
    setOpenAnswers([]);
    setOpenVersions({});
    setEditingIndex(null);
    setCopiedIndex(null);

    try {
      const response = await helper.gerSearchData(query);

      const formattedResults = response.map((item) => ({
        question: `Q. ${item.question}`,
        answer: `A. ${item.answer}`,
      }));

      setResults(formattedResults);
      setCurrentPage(1);
      setIsSearched(true);
    } catch (error) {
      console.error("검색 요청 실패:", error);
    }
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // 엔터 키를 누르면 검색 실행 + UI 초기화
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch((err) => console.error("복사 실패:", err));
  };

  const handleEditClick = (index, currentText) => {
    setEditingIndex(index); // 수정 모드로 변경
    setEditedText(currentText); // 기존 답변을 입력창에 미리 입력
  };

  const handleSaveEdit = (index) => {
    setResults((prevResults) =>
      prevResults.map((item, i) =>
        i === index ? { ...item, answer: editedText } : item
      )
    );
    setEditingIndex(null); // 수정 모드 해제
  };

  const handlePageChange = (newPage) => {
    // 페이지 이동 시 UI 상태 초기화
    setOpenAnswers([]);
    setOpenVersions({});
    setEditingIndex(null);
    setCopiedIndex(null);

    // 페이지 업데이트
    setCurrentPage(newPage);
  };

  return (
    <Wrapper>
      <Title>라이언 헬퍼</Title>
      <SearchBox>
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter 키 입력 처리
        />

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
                <>
                  <AnswerBox>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        style={{
                          width: "600px",
                          height: "30px",
                          fontSize: "16px",
                          borderColor: "#ddd", // 연한 회색 (#ddd 또는 #ccc)
                          borderWidth: "1px", // 두께 얇게 (1px)
                          borderStyle: "solid", // 선 스타일 추가
                          borderRadius: "5px", // 모서리를 부드럽게
                          padding: "10px", // 내부 여백 추가
                          outline: "none", // 포커스 시 기본 테두리 제거
                        }}
                        placeholder="수정 내용을 입력해주세요"
                      />
                    ) : (
                      item.answer
                    )}
                    {/* 복사 아이콘 */}
                    <MdContentCopy
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        color: "#666",
                      }}
                      onClick={() => handleCopy(item.answer, index)}
                    />

                    {/* 수정/체크 아이콘 */}
                    {editingIndex === index ? (
                      <MdCheck
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          color: "green",
                        }}
                        onClick={() => handleSaveEdit(index)}
                      />
                    ) : (
                      <MdEdit
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          color: "#666",
                        }}
                        onClick={() => handleEditClick(index, item.answer)}
                      />
                    )}
                    {copiedIndex === index && (
                      <div style={{ color: "green" }}>복사 되었습니다!</div>
                    )}
                  </AnswerBox>
                  {/* 버전 기록 버튼 */}
                  <div
                    onClick={() => toggleVersionHistory(index)}
                    style={{
                      cursor: "pointer",
                      color: "orange",
                      // marginBottom: "5%",
                      marginLeft: "auto", // 오른쪽 정렬
                      display: "flex", // flex로 설정
                      alignItems: "center", // 수직 중앙 정렬
                      fontSize: "14px",
                    }}
                  >
                    버전 기록
                  </div>

                  {/* 버전 기록 리스트 */}
                  {openVersions[index] && versionHistory[index] && (
                    <div
                      style={{
                        background: "#f8f8f8",
                        padding: "10px",
                        borderRadius: "5px",
                        marginTop: "5px",
                        marginBottom: "3%",
                        borderRadius: "3%",
                      }}
                    >
                      {versionHistory[index].map((history, vIndex) => (
                        <div
                          key={vIndex}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          {/* 원형 프로필 아이콘 */}
                          <div
                            style={{
                              width: "37px",
                              height: "37px",
                              borderRadius: "50%",
                              backgroundColor: "#555",
                              color: "#fff",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "12px",
                              fontWeight: "bold",
                              marginRight: "2%",
                              marginLeft: "1%",
                            }}
                          >
                            {history.user.charAt(0)}
                          </div>

                          {/* 버전 히스토리 텍스트 */}
                          <div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#666",
                                marginTop: "7%",
                                marginBottom: "2%",
                              }}
                            >
                              {history.date} ({history.user})
                            </div>
                            <div style={{ marginBottom: "5%" }}>
                              {history.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </ResultsContainer>
      )}

      {results.length > 0 && (
        <PaginationContainer>
          <PageButton
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            이전
          </PageButton>
          <PageButton
            disabled={currentPage * resultsPerPage >= results.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            다음
          </PageButton>
        </PaginationContainer>
      )}
    </Wrapper>
  );
};

export default Search;
