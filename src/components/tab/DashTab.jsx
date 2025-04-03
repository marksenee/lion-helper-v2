import React from "react";
import styled from "styled-components";

const TabWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 160px;
  z-index: 1000;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const TabButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  color: ${(props) => (props.active ? "#FF7710" : "#666")};
  border-bottom: ${(props) =>
    props.active ? "2px solid #FF7710" : "2px solid transparent"};
  transition: all 0.2s ease;

  &:hover {
    color: #ff7710;
  }
`;

const DashTab = ({ viewMode, onViewModeChange }) => {
  return (
    <TabWrapper>
      <TabContainer>
        <TabButton
          active={viewMode === "week"}
          onClick={() => onViewModeChange("week")}
        >
          주간
        </TabButton>
        <TabButton
          active={viewMode === "month"}
          onClick={() => onViewModeChange("month")}
        >
          월간
        </TabButton>
      </TabContainer>
    </TabWrapper>
  );
};

export default DashTab;
