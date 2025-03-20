import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io"; // 토글 아이콘

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

const NoticeBox = styled.div`
  width: 100%;
  /* background: #fff; */
  /* border: 1px solid #ccc; */
  /* padding: 24px; */
  /* border-radius: 10px; */
`;

const NoticeTitle = styled.h2`
  font-size: 18pt;
  font-weight: semibold;
  font-family: pretandard;
  margin-bottom: 16px;
`;

const NoticeList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none; /* 목록 불릿 제거 */
`;

const CommentButton = styled.button`
  background: #fff4eb;
  color: #ff7710;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #ffcaa2;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  background: transparent;
  color: #ff7710;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;

  /* &:hover {
    background: #ffcaa2;
  } */
`;

const CommentBox = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #f9f9f9;
  background-color: #f9f9f9;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  padding: 8px;
  border: transparent;
  border-radius: 8px;
  resize: none;
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
  background: #fff;
  border: 1px solid #ffcaa2;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding-right: 160px; /* 버튼 영역 확보 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CommentText = styled.p`
  background: #fff;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const DropdownContainer = styled.div`
  width: 27%;
  height: 30px;
  background-color: white;
  border: 2px solid #dcdcdc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 1%;
  margin-bottom: 3%;
`;

const DropdownIcon = styled(IoIosArrowDown)`
  width: 24px;
  height: 24px;
  color: gray;
  margin-left: auto;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 95%;
  background: white;
  border: 1px solid #dcdcdc;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 1%;
  z-index: 10; /* 댓글보다 위에 배치 */
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DropdownItem = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; /* 제목과 드롭다운 사이 간격 */
  justify-content: space-between;
  width: 900px;
`;

const ButtonContainer = styled.div`
  /* display: flex; */
  gap: 10px; /* 버튼 간격 */
  margin-left: auto; /* 오른쪽 정렬 */
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  display: flex;
  transform: translateY(-50%);
  gap: 8px;
  width: 150px; /* 버튼 영역 고정 */
`;

const TextAreaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export {
  Container,
  Title,
  NoticeBox,
  TextArea,
  CommentBox,
  NoticeItem,
  MemoInput,
  MemoBox,
  SubmitButton,
  NoticeList,
  CommentButton,
  CommentText,
  DropdownContainer,
  DropdownIcon,
  DropdownList,
  DropdownItem,
  TitleWrapper,
  ButtonContainer,
  ButtonWrapper,
  TextAreaContainer,
};
