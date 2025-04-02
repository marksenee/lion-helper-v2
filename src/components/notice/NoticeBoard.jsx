import React, { useState } from "react";
import { SearchBox, SearchInput, SearchIcon } from "../notification/styles";
import { FaSearch } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi"; // 세로 점 아이콘
import { useNavigate } from "react-router-dom";

import {
  Container,
  Title,
  SearchContainer,
  SearchButton,
  FilterButtons,
  FilterButton,
  NoticeList,
  NoticeItem,
  NoticeHeader,
  Badge,
  NoticeTitle,
  ToggleButton,
  NoticeDetails,
  RegisterButton,
  PageButton,
  PaginationWrapper,
  MenuButton,
  Menu,
  Button,
  MenuWrapper,
} from "./styles";

const NoticeBoard = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenuIndex, setShowMenuIndex] = useState(null);

  const notices = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    title: `공지사항 제목 ${index + 1}`,
  }));

  const noticesPerPage = 6;
  const totalPages = Math.ceil(notices.length / noticesPerPage);
  const startIndex = (currentPage - 1) * noticesPerPage;
  const currentNotices = notices.slice(startIndex, startIndex + noticesPerPage);

  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleMenu = (index) => {
    setShowMenuIndex(showMenuIndex === index ? null : index);
  };

  const handleEdit = (id) => {
    console.log(`Edit notice with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete notice with ID: ${id}`);
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("create");
  };

  return (
    <Container>
      <Title>공지사항</Title>
      <SearchBox width="400px" height="50px">
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter"} // Enter 키 입력 처리
        />
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
      </SearchBox>{" "}
      <FilterButtons>
        <FilterButton>출결</FilterButton>
        <FilterButton>공결</FilterButton>
        <FilterButton>훈련장려금</FilterButton>
        <FilterButton>내일배움카드</FilterButton>
      </FilterButtons>
      <NoticeList>
        {currentNotices.map((notice, index) => (
          <NoticeItem key={notice.id}>
            <NoticeHeader onClick={() => toggleDetails(index)}>
              {index + 1}. <Badge>출결</Badge>
              <NoticeTitle>{notice.title}</NoticeTitle>
              <ToggleButton>{openIndex === index ? "▲" : "▼"}</ToggleButton>
              <MenuWrapper>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(index);
                  }}
                >
                  <FiMoreVertical size={24} />
                </Button>
                {showMenuIndex === index && (
                  <Menu>
                    <MenuButton onClick={() => handleEdit(notice.id)}>
                      수정
                    </MenuButton>
                    <MenuButton onClick={() => handleDelete(notice.id)}>
                      삭제
                    </MenuButton>
                  </Menu>
                )}
              </MenuWrapper>
            </NoticeHeader>
            {openIndex === index && (
              <NoticeDetails>
                공지사항에 대한 상세 내용 {notice.id}
              </NoticeDetails>
            )}
          </NoticeItem>
        ))}
      </NoticeList>
      {/* 페이지네이션 */}
      <PaginationWrapper>
        <PageButton
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ 이전
        </PageButton>
        <span>
          {currentPage} / {totalPages}
        </span>
        <PageButton
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음 ▶
        </PageButton>
      </PaginationWrapper>
      <RegisterButton onClick={handleButtonClick}>공지 등록</RegisterButton>
    </Container>
  );
};

export default NoticeBoard;
