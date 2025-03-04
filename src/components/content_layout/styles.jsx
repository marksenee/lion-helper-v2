import styled from "styled-components";

const ContentContainer = styled.div`
  flex: 1;
  margin-left: 380px;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  transition: margin-left 0.3s ease; /* 사이드바 크기 조정 시 부드러운 전환 효과 */
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
