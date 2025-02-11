import React, { useEffect, useState } from "react";
import {
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
} from "./styles";

const TableComponents = () => {
  const data = [
    {
      course: "데이터분석 1회차",
      completion: "100%",
      urgency: "완수",
    },
    {
      course: "클라우드 엔지니어링 1회차",
      completion: "80%",
      urgency: "미완수",
    },
    {
      course: "프론트엔드 개발 1회차",
      completion: "90%",
      urgency: "미완수",
    },
    {
      course: "백엔드 개발 1회차",
      completion: "85%",
      urgency: "미완수",
    },
    {
      course: "AI 모델링 1회차",
      completion: "100%",
      urgency: "완수",
    },
  ];

  return (
    <Container>
      <Title>✍🏻 업무 현황</Title>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>과정</TableHeader>
              <TableHeader>체크율</TableHeader>
              <TableHeader>완수여부</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.course}</TableCell>
                <TableCell>{row.completion}</TableCell>
                <TableUrgencyCell>
                  <UrgencyBadge urgent={row.urgency === "미완수"}>
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
  );
};

export default TableComponents;
