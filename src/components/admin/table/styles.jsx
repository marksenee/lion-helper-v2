import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: 300px;
  border-radius: 16px;
  padding: 24px;
  font-family: Pretendard, sans-serif;
  margin: 2% auto;
  flex-grow: 1;
`;

const UncheckedContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  max-width: 1200px;
  padding: 24px;
  font-family: Pretendard, sans-serif;
  margin-top: 2%;
  margin-bottom: 2%;
  flex-grow: 1;
`;

const Title = styled.h2`
  font-size: 24pt;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
`;

const TableWrapper = styled.div`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  background: #ffffff;
`;

const TableHead = styled.thead`
  background-color: #f3f4f6;
  color: #111827;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }
  &:hover {
    background-color: #eef2ff;
    transition: background-color 0.2s ease-in-out;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: center;
  font-size: 14pt;
  font-weight: 500;
  border-bottom: 2px solid #e5e7eb;
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  font-size: 12pt;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`;

const TableUrgencyCell = styled.td`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UrgencyBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 32px;
  border-radius: 16px;
  font-size: 12pt;
  font-weight: 500;
  color: white;
  background-color: ${({ urgent }) => (urgent ? "#FF6767" : "#8BD96C")};
`;

const SolveBox = styled.div`
  cursor: pointer;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  background: #ffffff;
  &:hover {
    background: #f3f4f6;
  }
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #ffedd5;
  color: #f97316;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #f97316;
    color: #ffffff;
  }
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
  UncheckedContainer,
  SubmitButton,
  SolveBox,
};
