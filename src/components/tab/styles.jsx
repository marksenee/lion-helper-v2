import styled from "styled-components";

const Content = styled.div`
  /* margin-top: 30px; */
  font-size: 20px;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
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
  font-family: "Suite";

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

export { Content, Wrapper, TabContainer, TabItem };
