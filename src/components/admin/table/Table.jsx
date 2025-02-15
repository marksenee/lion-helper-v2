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
import { proPage } from "../../../apis/api";

const TableComponents = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await proPage.getCheckPercent();

        if (response && response.data) {
          console.log("asdf", response.data.data[0].check_rate);

          const data = response.data.data;
          setTaskData(data);
        }
      } catch (error) {
        console.error("Error fetching checklist:", error);
      }
    };
    fetchTaskData();
  }, []);

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
            {taskData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.training_course}</TableCell>
                <TableCell>{item.check_rate}</TableCell>
                <TableUrgencyCell>
                  <UrgencyBadge urgent={item.check_rate === "100.0%"}>
                    {item.check_rate === "100.0%" ? "완수" : "미완수"}
                  </UrgencyBadge>
                </TableUrgencyCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default TableComponents;
