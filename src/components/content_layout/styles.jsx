import styled from "styled-components";

const ContentContainer = styled.div`
  width: 100%;
  min-height: 100vh; /* 화면 높이 채우기 */
  display: flex;
  flex-direction: column; /* 세로 방향 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  padding: 20px;
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
