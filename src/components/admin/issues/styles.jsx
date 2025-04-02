import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io"; // 토글 아이콘

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  min-height: 250px;
  background: #fff;
  border-radius: 16px;
  font-family: Pretendard, sans-serif;
  margin-top: 2%;
  flex-grow: 1;
  padding: 24px;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const NoticeBox = styled.div`
  width: 100%;
`;

const NoticeList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentButton = styled.button`
  background: #fff4eb;
  color: #ff7710;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #ff7710;
    color: #fff;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SubmitButton = styled.button`
  background: #ff7710;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #e66a0d;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CommentBox = styled.div`
  margin-top: 16px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 12px;
  border: 1px solid #eee;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ff7710;
  }

  &::placeholder {
    color: #999;
  }
`;

const NoticeItem = styled.li`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  strong {
    color: #ff7710;
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
  }

  span {
    display: block;
    line-height: 1.6;
    color: #444;
  }
`;

const NoticeContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

const NoticeText = styled.div`
  flex: 1;
`;

const CommentText = styled.p`
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #eee;
`;

const DropdownContainer = styled.div`
  width: 200px;
  height: 40px;
  background-color: white;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff7710;
  }
`;

const DropdownIcon = styled(IoIosArrowDown)`
  width: 20px;
  height: 20px;
  color: #666;
  margin-left: auto;
  transition: transform 0.2s ease;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  list-style: none;
  padding: 8px 0;
  margin: 0;
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fff4eb;
    color: #ff7710;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContentWrapper = styled.div`
  margin: 12px 0;
`;

const ContentLine = styled.span`
  display: block;
  line-height: 1.6;
  color: #444;
  margin-bottom: 4px;
  padding-left: ${(props) => (props.isBullet ? "16px" : "0")};
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #ff7710;
    display: ${(props) => (props.isBullet ? "block" : "none")};
  }
`;

const DateText = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ff7710;
  font-size: 13px;
  font-weight: 500;
`;

export {
  Container,
  Title,
  NoticeBox,
  TextArea,
  CommentBox,
  NoticeItem,
  CommentText,
  DropdownContainer,
  DropdownIcon,
  DropdownList,
  DropdownItem,
  TitleWrapper,
  ButtonWrapper,
  TextAreaContainer,
  SubmitButton,
  CommentButton,
  NoticeList,
  NoticeContent,
  NoticeText,
  ContentWrapper,
  ContentLine,
  DateText,
};
