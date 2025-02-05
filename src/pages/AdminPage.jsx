import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import FooterComponent from "../components/\bfooter/footer";
import { proPage } from "../apis/api";

const AdminPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh; /* 높이를 최소화하여 콘텐츠에 맞춰 자동으로 늘어날 수 있게 */
  background-color: #fff;
  position: relative;
  padding-top: 1%;
  overflow: auto;
  padding-bottom: 90px; //푸터 공간을 위해 여백 추가
`;

const Container = styled.div`
  width: 886px;
  min-height: 250px; /* 최소 높이를 지정하여, 콘텐츠가 많으면 늘어날 수 있도록 */
  background: #fff;
  border-radius: 10px;
  /* padding: 20px; */
  font-family: Pretendard, sans-serif;
  margin-top: 1%;
  flex-grow: 1; //데이터가 많을 때 자동으로 공간을 차지하도록 함
`;

const Title = styled.h2`
  font-size: 20pt;
  font-weight: semibold;
  font-family: pretandard;
  margin-bottom: 16px;
`;

const TableWrapper = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f3f3f3;
  color: #444;
  text-align: center;
`;

const TableRow = styled.tr`
  border-top: 1px solid #ccc;
  text-align: center;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: center;
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
`;

// 테이블 셀 스타일 추가
const TableUrgencyCell = styled.td`
  /* text-align: center;  */
  /* vertical-align: middle; //세로 정렬  */
  padding: 10px;

  /* flex를 사용하여 완전히 중앙 정렬 */
  display: flex;
  justify-content: center;
`;

const UrgencyBadge = styled.span`
  display: inline-block;
  width: 70px;
  height: 30px;
  border-radius: 20px;
  font-size: 13pt;
  font-family: pretandard;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.urgent ? "#FF6767" : "#8BD96C")};
`;

const NoticeBox = styled.div`
  width: 95%;
  background: #fff;
  border: 1px solid #ccc;
  padding: 24px;
  border-radius: 10px;
`;

const NoticeTitle = styled.h2`
  font-size: 18pt;
  font-weight: semibold;
  font-family: pretandard;
  margin-bottom: 16px;
`;

const NoticeList = styled.ul`
  /* list-style-type: none; */
  padding: 0;
  margin-bottom: 2%;
`;

const CommentButton = styled.span`
  color: #ff914d;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 8px 12px;
  background-color: #ff7f50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14pt;
`;

const MemoBox = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  margin-top: 8px;
  display: ${(props) => (props.visible ? "block" : "none")};
  box-sizing: border-box;
`;

const MemoInput = styled.textarea`
  width: 100%;
  height: ${(props) =>
    props.visible ? "70px" : "0px"}; /* 높이가 visible 상태에 따라 변화 */
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14pt;
  font-family: pretandard;
  resize: none;
  margin-bottom: 8px;
  &::placeholder {
    color: #bbb;
  }
`;

const NoticeItem = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14pt;
  position: relative;
  padding-bottom: ${(props) =>
    props.hasMemoVisible
      ? "140px"
      : "12px"}; /* 댓글 박스가 열리면 패딩을 추가 */
`;

const AdminPage = () => {
  const [memoVisible, setMemoVisible] = useState(Array(5).fill(false));
  const [memoContent, setMemoContent] = useState(Array(5).fill(""));
  const [uncheckedItems, setUncheckedItems] = useState([]); // 미체크 항목 상태
  const [issues, setIssues] = useState([]); // issues 상태 추가

  // 미체크 항목 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchUncheckedItems = async () => {
      try {
        const response = await proPage.getUnCheckedDescriptions();

        // API 응답 구조가 예상과 다를 수 있으므로 확인
        if (response && response.data && response.data.data) {
          setUncheckedItems(response.data.data); // API 응답을 상태에 저장
        } else {
          console.error("데이터 형식 오류: 예상된 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    const fetchIssues = async () => {
      // issues 데이터 가져오는 함수
      try {
        const response = await proPage.getIssues();
        if (response && response.data && response.data.data) {
          setIssues(response.data.data); // issues 상태 업데이트
        } else {
          console.error("이슈 데이터 형식 오류");
        }
      } catch (error) {
        console.error("이슈 API 호출 오류:", error);
      }
    };

    fetchUncheckedItems();
    fetchIssues();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const toggleMemo = (index) => {
    setMemoVisible((prev) => {
      const newMemo = [...prev];
      newMemo[index] = !newMemo[index];
      return newMemo;
    });
  };

  const handleMemoChange = (e, index) => {
    const newContent = [...memoContent];
    newContent[index] = e.target.value;
    setMemoContent(newContent);
  };

  const handleSubmitMemo = (index) => {
    console.log(`댓글이 저장되었습니다: ${memoContent[index]}`);
    // 댓글을 저장하는 로직을 여기에 추가하면 됩니다.
    // 예: 서버로 데이터를 전송하거나 상태 관리 등을 활용.
    toggleMemo(index); // 댓글 박스 닫기
  };

  const data = [
    {
      course: "데이터분석 1회차",
      completion: "80%",
      urgency: "긴급",
      status: "진행 중",
    },
    {
      course: "클라우드 엔지니어링 1회차",
      completion: "80%",
      urgency: "일반",
      status: "진행 중",
    },
    {
      course: "프론트엔드 개발 1회차",
      completion: "90%",
      urgency: "일반",
      status: "완료",
    },
    {
      course: "백엔드 개발 1회차",
      completion: "85%",
      urgency: "긴급",
      status: "진행 중",
    },
    {
      course: "AI 모델링 1회차",
      completion: "75%",
      urgency: "일반",
      status: "대기",
    },
  ];

  const notices = [
    "[클라우드 엔지니어링 1회차] 교강사 일지 미작성",
    "[클라우드 엔지니어링 1회차] 줌 업로드 2/4 기록 누락",
    "[데이터분석 1회차] 훈련평가 70점 미만 : 김멋사, 최멋사",
    "[데이터분석 1회차] 훈련평가 70점 미만 : 김멋사, 최멋사",
    "[데이터분석 1회차] 훈련평가 70점 미만 : 김멋사, 최멋사",
  ];

  return (
    <>
      <Header />
      <AdminPageContainer>
        <Container>
          <Title>✍🏻 업무 현황</Title>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>과정</TableHeader>
                  <TableHeader>업무 완료율</TableHeader>
                  <TableHeader>긴급 여부</TableHeader>
                  <TableHeader>상태</TableHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.course}</TableCell>
                    <TableCell>{row.completion}</TableCell>
                    <TableUrgencyCell>
                      <UrgencyBadge urgent={row.urgency === "긴급"}>
                        {row.urgency}
                      </UrgencyBadge>
                    </TableUrgencyCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </Container>
        <Container>
          <Title>📌 이슈 사항</Title>
          <NoticeBox>
            <NoticeList>
              {issues.length > 0 ? (
                issues.map((issue, index) => (
                  <NoticeItem key={index}>
                    {issue.content} {/* API 응답에 맞게 필드 사용 */}
                    <CommentButton onClick={() => toggleMemo(index)}>
                      {memoVisible[index] ? "- 닫기" : "+ 댓글"}
                    </CommentButton>
                  </NoticeItem>
                ))
              ) : (
                <NoticeItem>이슈 사항이 없습니다.</NoticeItem>
              )}
            </NoticeList>
          </NoticeBox>
        </Container>
        <Container>
          <Title>📌 미체크 항목</Title>
          <NoticeBox>
            <NoticeList>
              {uncheckedItems.length > 0 ? (
                uncheckedItems.map((item, index) => (
                  <NoticeItem key={index}>
                    {item} {/* API 응답에서 맞는 필드 사용 */}
                    <CommentButton onClick={() => toggleMemo(index)}>
                      {memoVisible[index] ? "- 닫기" : "+ 댓글"}
                    </CommentButton>
                    {/* {memoVisible[index] && (
                      <MemoSection>
                        <p>댓글 내용</p>
                      </MemoSection>
                    )} */}
                  </NoticeItem>
                ))
              ) : (
                <NoticeItem>미체크 항목이 없습니다.</NoticeItem>
              )}
            </NoticeList>
          </NoticeBox>
        </Container>
      </AdminPageContainer>
      {/* <FooterComponent /> */}
    </>
  );
};

export default AdminPage;
