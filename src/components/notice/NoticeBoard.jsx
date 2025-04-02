import React, { useState, useEffect } from "react";
import { SearchBox, SearchInput, SearchIcon } from "../notification/styles";
import { FaSearch } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi"; // 세로 점 아이콘
import { IoMdAdd } from "react-icons/io"; // 추가 아이콘
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

// 모달 관련 스타일 컴포넌트 추가
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const ModalText = styled.p`
  margin: 20px 0;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  background-color: ${(props) => (props.confirm ? "#FF7710" : "#FFFAF5")};
  color: ${(props) => (props.confirm ? "white" : "#FF7710")};
`;

// 삭제 확인 모달 컴포넌트
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalText>정말 삭제하시겠습니까?</ModalText>
        <ButtonGroup>
          <ModalButton confirm onClick={onConfirm}>
            예
          </ModalButton>
          <ModalButton onClick={onClose}>아니오</ModalButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

const NoticeBoard = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState("전체");

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

  // 메뉴 외부 클릭 시 닫기 처리
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-wrapper")) {
        setShowMenuIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = (index, e) => {
    e.stopPropagation();
    setShowMenuIndex(showMenuIndex === index ? null : index);
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    const notice = currentNotices.find((notice) => notice.id === id);
    navigate("create", {
      state: {
        isEdit: true,
        noticeData: {
          id: notice.id,
          title: notice.title,
          content:
            openIndex === id
              ? document.querySelector(".notice-details-content").textContent
              : "",
          category: "출결", // 현재는 하드코딩되어 있으므로 실제 카테고리 데이터로 변경 필요
        },
      },
    });
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const handleDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
    setShowMenuIndex(null);
  };

  const handleDeleteConfirm = () => {
    // 여기에 삭제 API 호출 로직 구현
    console.log(`Delete notice with ID: ${deleteTargetId}`);
    alert("삭제되었습니다.");
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  const handleButtonClick = () => {
    navigate("create");
  };

  return (
    <Container>
      <Title>
        공지사항
        <RegisterButton onClick={handleButtonClick}>
          <IoMdAdd />
          공지 등록
        </RegisterButton>
      </Title>
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
        <FilterButton
          active={activeFilter === "전체"}
          onClick={() => setActiveFilter("전체")}
        >
          전체
        </FilterButton>
        <FilterButton
          active={activeFilter === "출결"}
          onClick={() => setActiveFilter("출결")}
        >
          출결
        </FilterButton>
        <FilterButton
          active={activeFilter === "공결"}
          onClick={() => setActiveFilter("공결")}
        >
          공결
        </FilterButton>
        <FilterButton
          active={activeFilter === "훈련장려금"}
          onClick={() => setActiveFilter("훈련장려금")}
        >
          훈련장려금
        </FilterButton>
        <FilterButton
          active={activeFilter === "내일배움카드"}
          onClick={() => setActiveFilter("내일배움카드")}
        >
          내일배움카드
        </FilterButton>
      </FilterButtons>
      <NoticeList>
        {currentNotices.map((notice, index) => (
          <NoticeItem key={notice.id} active={showMenuIndex === index}>
            <NoticeHeader onClick={() => toggleDetails(index)}>
              {index + 1}. <Badge>출결</Badge>
              <NoticeTitle>{notice.title}</NoticeTitle>
              <ToggleButton>{openIndex === index ? "▲" : "▼"}</ToggleButton>
              <MenuWrapper>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(index, e);
                  }}
                >
                  <FiMoreVertical size={24} />
                </Button>
                {showMenuIndex === index && (
                  <Menu>
                    <MenuButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(notice.id);
                      }}
                    >
                      수정
                    </MenuButton>
                    <MenuButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notice.id);
                      }}
                    >
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
      {/* 모달 추가 */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};

export default NoticeBoard;
