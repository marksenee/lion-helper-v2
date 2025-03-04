import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  /* min-height: 100vh; */
  position: relative; /* 레이아웃 컨테이너는 상대 위치 */
`;

const Sidebar = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #fffaf5;
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  /* display: flex; */
  /* flex-direction: column; */
  padding: 20px;
  z-index: 10; /* 본문보다 위로 오도록 설정 */
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
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #3f3f3f;
  margin-bottom: 30px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  width: 220px;
  height: 30px;
  padding: 10px;
  color: #3f3f3f;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "rgba(255, 202, 162, 0.47)" : "transparent"};
  border-radius: 8px;
  margin-bottom: 1%;
  /* transition: background-color 0.3s ease; */

  &:hover {
    background-color: rgba(255, 202, 162, 0.2);
  }
`;

const Icon = styled.div`
  font-size: 24px;
  margin-right: 12px;
`;

export { Layout, Sidebar, Content, Logo, Title, NavList, NavItem, Icon };
