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
  margin-bottom: 50px;
  width: 77%; /* 필요 시 추가 */
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
