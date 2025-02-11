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
  width: 95%;
  background: #fff;
  border: 1px solid #ccc;
  padding: 24px;
  border-radius: 10px;
`;

const NoticeTitle = styled.h2`
  font-size: 18pt;
  font-weight: semibold;
  font-family: pretandard;
  margin-bottom: 16px;
`;

const NoticeList = styled.ul`
  /* list-style-type: none; */
  padding: 0;
  margin-bottom: 2%;
`;

const CommentButton = styled.span`
  color: #ff914d;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 8px 12px;
  background-color: #ff7f50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14pt;
`;

const CommentBox = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 50px;
  margin-top: 5px;
  padding: 5px;
  border: 1px solid #ccc;
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
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
  /* display: flex; */ // 해당 부분 설정 시, 댓글 박스가 아래가 아닌 옆으로 됨
  justify-content: space-between;
  align-items: center;
  font-size: 14pt;
  position: relative;
  padding-bottom: ${(props) => (props.hasMemoVisible ? "140px" : "12px")};
`;

const CommentText = styled.div`
  font-size: 13pt;
  padding: 10px;
`;

const DropdownContainer = styled.div`
  width: 25%;
  height: 40px;
  background-color: white;
  border: 2px solid #dcdcdc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
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
  width: 100%;
  background: white;
  border: 1px solid #dcdcdc;
  list-style: none;
  padding: 0;
  margin: 0;
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
  width: 100%;
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
};
