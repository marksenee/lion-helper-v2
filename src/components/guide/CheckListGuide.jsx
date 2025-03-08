import React from "react";
import { GuideContainer, GuideText } from "./styles";

const CheckListGuide = () => {
  return (
    <GuideContainer>
      <GuideText>
        📌 오늘 체크리스트 : 매일 18시 이후 입력 <br></br> 📌 주간 체크리스트 :
        매주 금요일 18시 이후 입력
      </GuideText>
    </GuideContainer>
  );
};

export default CheckListGuide;
