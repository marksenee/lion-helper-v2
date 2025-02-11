import styled from "styled-components";

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
  /* background-color: #f3f3f3; */
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

export {
  TableWrapper,
  Title,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableUrgencyCell,
  UrgencyBadge,
};
