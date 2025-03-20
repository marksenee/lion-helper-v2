import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  /* min-height: 100vh; */
  position: relative; /* 레이아웃 컨테이너는 상대 위치 */
`;

const Sidebar = styled.div`
  width: 270px;
  height: 100vh;
  background-color: #fffaf5;
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  /* display: flex; */
  /* flex-direction: column; */
  padding: 20px;
  z-index: 5;
`;

const Content = styled.div`
  flex: 1;
  margin-left: 400px;
  padding: 20px;
  overflow-x: hidden; /* 가로 스크롤 방지 */
`;

const Logo = styled.img`
  width: 161px;
  margin-bottom: 20px;
  margin-top: 10px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 20px;
  color: #3f3f3f;
  margin-top: 30px;
  font-family: "suite";
  /* margin-bottom: 30px; */
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 50px;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  width: 220px;
  height: 30px;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  font-family: "Suite";
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 5%;
  color: ${(props) =>
    props.active ? "#FF7710" : "#3f3f3f"}; /* 선택 시 색상 변경 */
  background-color: ${(props) =>
    props.active ? "rgba(255, 202, 162, 0.47)" : "transparent"};

  &:hover {
    background-color: rgba(255, 202, 162, 0.2);
  }
`;

const Icon = styled.div`
  font-size: 24px;
  margin-right: 12px;
  color: ${(props) =>
    props.active ? "#FF7710" : "#3f3f3f"}; /* 아이콘 색상 변경 */
`;

export { Layout, Sidebar, Content, Logo, Title, NavList, NavItem, Icon };
