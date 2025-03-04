import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io"; // 토글 아이콘

const DropdownContainer = styled.div`
  width: 25%;
  height: 30px;
  background-color: white;
  border: 2px solid #dcdcdc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
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
`;

const DropdownItem = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export { DropdownContainer, DropdownIcon, DropdownList, DropdownItem };
