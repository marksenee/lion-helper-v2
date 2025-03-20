import React from "react";
import { GuideContainer, GuideText } from "./styles";

const CheckListGuide = () => {
  return (
    <GuideContainer>
      <GuideText>
        📌 오늘 체크리스트 : 매일 18시 이후 입력 <br></br> 📌 주간 체크리스트 :
        매주 금요일 18시 이후 입력 <br></br> 📌 개강2주 체크리스트 : 개강 2주가
        되는날 체크 <br></br> 📌 모집 체크리스트 : 모집 기간 중 체크 <br></br>{" "}
        📌 수료 체크리스트 : 수료시점 부터 수료 후 1주일간 체크
      </GuideText>
    </GuideContainer>
  );
};

export default CheckListGuide;
