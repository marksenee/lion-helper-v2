import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: calc(100% - 270px);
  position: fixed;
  right: 0;
  top: 0;
  background-color: white;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 40px;
  font-size: 28px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background-color: #fff4eb;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  height: 100px;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const IconWrapper = styled.div`
  font-size: 24px;
  color: #ff7710;
`;

export const ButtonText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #ff7710;
`;
