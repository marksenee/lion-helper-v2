import styled from "styled-components";

const Content = styled.div`
  /* margin-top: 30px; */
  font-size: 20px;
  text-align: center;
`;

// 네비게이션 탭 스타일
const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  /* margin-top: 50px; */
  margin-left: 10px; //사이드바 너비만큼 여백을 줌
  margin-bottom: 50px;
`;

const TabItem = styled.div`
  font-size: 22px;
  color: ${(props) => (props.active ? "#FF7710" : "#888888")};
  cursor: pointer;
  position: relative;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:after {
    content: "";
    display: ${(props) => (props.active ? "block" : "none")};
    width: 100%;
    height: 3px;
    background-color: #ff7710;
    position: absolute;
    bottom: -5px;
    left: 0;
  }
`;

export { Content, TabContainer, TabItem };
