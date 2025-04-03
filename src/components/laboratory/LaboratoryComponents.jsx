import React from "react";
import { FaGraduationCap, FaFileAlt } from "react-icons/fa";
import {
  PageContainer,
  Title,
  Container,
  Button,
  IconWrapper,
  ButtonText,
} from "./styles";

const LaboratoryComponents = () => {
  const handleResumeClick = () => {
    window.open("https://bootcamp-3hm5.onrender.com", "_blank");
  };

  return (
    <PageContainer>
      {/* <Title>AI 실험실</Title> */}
      <Container>
        <Button>
          <IconWrapper>
            <FaGraduationCap />
          </IconWrapper>
          <ButtonText>AI 강의 분석기</ButtonText>
        </Button>
        <Button onClick={handleResumeClick}>
          <IconWrapper>
            <FaFileAlt />
          </IconWrapper>
          <ButtonText>지원서 평가</ButtonText>
        </Button>
      </Container>
    </PageContainer>
  );
};

export default LaboratoryComponents;
