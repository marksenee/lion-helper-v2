import React from "react";
import { useState, useEffect } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  AnswerBox,
  NotiText,
  PageButton,
  PaginationContainer,
  QuestionBox,
  QuestionText,
  ResultsContainer,
  SearchBox,
  SearchIcon,
  SearchInput,
  Title,
  ToggleIcon,
  Wrapper,
} from "./styles";
import { helper } from "../../apis/helper";

const Notification = () => {
  // // 클릭했을 때 결과 기대값
  // const handleSearch = () => {
  //   // 예시 데이터 생성 (실제 API 연동 시 fetch로 대체)
  //   const dummyResults = Array(30)
  //     .fill(null)
  //     .map((_, index) => ({
  //       question: `Q. 관련질문 ${index + 1}`,
  //       answer: `A. 이 질문에 대한 답변 내용 ${index + 1}`,
  //     }));

  //   setResults(dummyResults);
  //   setCurrentPage(1);
  //   setIsSearched(true); // 검색 버튼을 눌렀으면 상태값 변경
  // };

  useEffect(() => {
    const getNoticeData = async () => {
      try {
        const response = await helper.getNotice();
        if (response?.data?.data && Array.isArray(response.data.data)) {
          console.log(response.data.data);
          if (response.data.data.length > 0) {
          }
        } else {
          console.error("데이터 형식 오류: 예상된 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };
    getNoticeData();
  }, []);

  const [notiDatas, setNotiDatas] = useState([]);
  const [searchDatas, setSearchDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [openAnswers, setOpenAnswers] = useState([]); // 열린 답변의 인덱스 배열
  const [isSearched, setIsSearched] = useState(false);

  // 공지사항 더미데이터 생성
  const handleNotiDatas = () => {
    // 예시 데이터 생성 (실제 API 연동 시 fetch로 대체)
    const notiDatasResults = Array(30)
      .fill(null)
      .map((_, index) => ({
        question: `${index + 1}. 관련질문 ${index + 1}`,
        answer: `A. 이 질문에 대한 답변 내용 ${index + 1}`,
      }));

    setNotiDatas(notiDatasResults);
    setCurrentPage(1);
    setIsSearched(false);
  };

  const handleSearchDatas = () => {
    const searchDataResults = Array(30)
      .fill(null)
      .map((_, index) => ({
        question: `${index + 1}. 관련질문dd ${index + 1}`,
        answer: `A. 이 질문에 대한 답변 내용 ${index + 1}`,
      }));

    setSearchDatas(searchDataResults);
    setCurrentPage(1);
    setIsSearched(true);
    console.log(isSearched);
  };

  const toggleAnswer = (index) => {
    if (openAnswers.includes(index)) {
      setOpenAnswers(openAnswers.filter((i) => i !== index)); // 닫기
    } else {
      setOpenAnswers([...openAnswers, index]); // 열기
    }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터 설정
  useEffect(() => {
    handleNotiDatas();
    console.log("hello");
  }, []); // 빈 배열: 컴포넌트가 마운트될 때 한 번만 실행

  // 페이지네이션 데이터
  // 페이지네이션 데이터
  const resultsPerPage = 10;
  const paginatedSearchData = searchDatas.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const paginatedNotiData = notiDatas.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <Wrapper>
      <Title>라이언 헬퍼</Title>
      <SearchBox>
        <SearchInput placeholder="라이언 헬퍼에게 무엇이든 물어보세요" />
        <SearchIcon onClick={handleSearchDatas}>
          <FaSearch />
        </SearchIcon>
      </SearchBox>

      <ResultsContainer>
        <NotiText>공지사항</NotiText>
        {isSearched
          ? paginatedSearchData.map((data, index) => (
              <div key={index}>
                <QuestionBox onClick={() => toggleAnswer(index)}>
                  <QuestionText>{data.question}</QuestionText>
                  <ToggleIcon>
                    {openAnswers.includes(index) ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </ToggleIcon>
                </QuestionBox>
                {openAnswers.includes(index) && (
                  <AnswerBox>{data.answer}</AnswerBox>
                )}
              </div>
            ))
          : paginatedNotiData.map((data, index) => (
              <div key={index}>
                <QuestionBox onClick={() => toggleAnswer(index)}>
                  <QuestionText>{data.question}</QuestionText>
                  <ToggleIcon>
                    {openAnswers.includes(index) ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </ToggleIcon>
                </QuestionBox>
                {openAnswers.includes(index) && (
                  <AnswerBox>{data.answer}</AnswerBox>
                )}
              </div>
            ))}
      </ResultsContainer>
      <PaginationContainer>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          이전
        </PageButton>
        <PageButton
          disabled={
            isSearched
              ? currentPage * resultsPerPage >= searchDatas.length
              : currentPage * resultsPerPage >= notiDatas.length
          }
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          다음
        </PageButton>
      </PaginationContainer>
    </Wrapper>
  );
};

export default Notification;
