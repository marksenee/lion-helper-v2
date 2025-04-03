import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io"; // 토글 아이콘

const Wrapper = styled.div`
  width: 100%;
  max-width: 887px;
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
`;

const DropdownContainer = styled.div`
  /* width: 50%; */
  max-width: 400px; /* 드롭다운 최대 크기 */
  background-color: white;
  border: 2px solid #dcdcdc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  overflow: visible;

  /* 왼쪽 정렬 */
  justify-content: flex-start;
`;

const DropdownIcon = styled(IoIosArrowDown)`
  width: 24px;
  height: 24px;
  color: gray;
  margin-left: auto;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #dcdcdc;
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  z-index: 1000; /* 겹침 방지 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 드롭다운 강조 */
`;

const DropdownItem = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export { Wrapper, DropdownContainer, DropdownIcon, DropdownList, DropdownItem };
