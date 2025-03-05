import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: calc(100vw - 250px); /* 사이드바 크기만큼 빼줌 */
  margin-left: 250px; /* 사이드바가 fixed라면 필요 */
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    /* 태블릿 이하에서는 자동 조정 */
    width: 100vw;
    margin-left: 0;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-height: 100vh; */
  /* justify-content: flex-start; 헤더 공간을 확보하기 위해 변경 */
  /* height: 100vh; */
  background-color: #fff;
  /* position: relative; */
  /* padding-top: 1%; */
  /* overflow: auto; 내용이 길어질 경우 스크롤 가능하도록 설정 */
  padding-bottom: 90px; /* 푸터 공간을 위해 여백 추가 */
`;

export { ContentContainer, PageContainer };
