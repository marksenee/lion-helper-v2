import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    const getNoticeData = async () => {
      try {
        const response = await helper.getNotice();
        if (response?.data?.data && Array.isArray(response.data.data)) {
          console.log(response.data.data);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [openAnswers, setOpenAnswers] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const noticeData = [
    "(행정 지침 변경건) 훈련생 외출,조퇴 시 줌캡쳐 증빙 요청건",
  ];
  const noticeDetail = [
    "앞으로 훈련생들이 외출 또는 조퇴 시에도 해당 시간까지 훈련에 참여하고 있었다는 증빙으로 줌캡쳐본도 남겨주시길 부탁드립니다! \n 훈련생들에게 큐알 제공 전 꼭 줌캡쳐본을 남겨야 한다고 말씀해주시고, 줌캡쳐 후 큐알을 찍을 수 있도록 해주세요. \n 금일부터 꼭 지켜야 하는 필수 사항 입니다! \n 보조강사님들에게도 해당 내용 필수적으로 공유 부탁드립니다! 특히 본인이 급하다고 줌캡쳐(필수, 훈련생이 캡쳐해도 됩니다)도 안하고 큐알도 안찍고 그냥 퇴실한다면 앞으로는 무조건 결석 처리 진행될 예정입니다.자료 없으면 출석입력요청 불가하오니 이점 꼭 주의바랍니다.",
  ];

  useEffect(() => {
    setNotiDatas(
      noticeData.map((item, index) => ({
        question: item,
        answer: noticeDetail[index] || "",
      }))
    );
  }, []);

  const handleSearchDatas = () => {
    const searchDataResults = Array(5)
      .fill(null)
      .map((_, index) => ({
        question: `${index + 1}. 관련질문 ${index + 1}`,
        answer: `A. 이 질문에 대한 답변 내용 ${index + 1}`,
      }));

    setSearchDatas(searchDataResults);
    setCurrentPage(1);
    setIsSearched(true);
  };

  const toggleAnswer = (index) => {
    setOpenAnswers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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
        {(isSearched ? paginatedSearchData : paginatedNotiData).map(
          (data, index) => (
            <div key={index}>
              <QuestionBox onClick={() => toggleAnswer(index)}>
                <QuestionText>
                  {index + 1}. {""}
                  {data.question}
                </QuestionText>
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
          )
        )}
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
