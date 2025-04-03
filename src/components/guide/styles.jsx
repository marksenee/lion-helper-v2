import styled from "styled-components";

const GuideContainer = styled.div`
  width: 100%;
  max-width: 875px;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin: 1% auto;
  margin-bottom: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
`;

const GuideText = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #334155;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GuideItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }

  span {
    color: #ff7710;
    font-weight: 600;
    white-space: nowrap;
  }

  p {
    margin: 0;
    color: #64748b;
  }
`;

export { GuideContainer, GuideText, GuideItem };
