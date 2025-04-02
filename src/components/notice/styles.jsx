import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
  width: calc(100% - 270px); /* 사이드바를 제외한 나머지 영역을 사용 */
  margin-left: 270px; /* 사이드바 크기만큼 여백 추가 */
  background-color: #fff;
  height: auto; /* 내용에 따라 유동적인 높이 */
  /* min-height: 1000px;  */
`;

const Title = styled.h2`
  color: #ff6600;
  margin-bottom: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 8px;
  background-color: white;
  border: none;
  cursor: pointer;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const FilterButton = styled.button`
  padding: 8px 12px;
  background-color: #ff914d;
  border: none;
  color: white;
  border-radius: 15px;
  cursor: pointer;
`;

const NoticeList = styled.div`
  margin-top: 50px;
`;

const NoticeItem = styled.div`
  /* border: 1px solid #ddd; */
  width: 600px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  cursor: pointer;
`;

const Badge = styled.span`
  background-color: white;
  border: 0.5px solid #dcdcdc; /* 연한 회색 테두리 */
  color: #ff7710;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 2%;
`;

const NoticeTitle = styled.span`
  flex: 1;
  font-weight: 500;
  margin-left: 10px;
`;

const ToggleButton = styled.span`
  font-size: 14px;
`;

const NoticeDetails = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  font-size: 14px;
`;

const RegisterButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ff6600;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;

const PaginationWrapper = styled.div`
  /* position: sticky; */
  bottom: 0;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  /* box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); */
  z-index: 10;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: transparent;
  color: #565656;
  cursor: pointer;
  border-radius: 5px;

  &:disabled {
    background-color: transparent;
    color: #d9d9d9;

    cursor: not-allowed;
  }
`;

const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 6rem;
  background-color: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  z-index: 10;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

const MenuButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Button = styled.button`
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
`;

export {
  Container,
  Title,
  SearchContainer,
  SearchInput,
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
  PaginationWrapper,
  PageButton,
  Menu,
  MenuButton,
  Button,
  MenuWrapper,
};
