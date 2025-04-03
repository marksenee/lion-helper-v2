import React from "react";
import { GuideContainer, GuideText, GuideItem } from "./styles";

const CheckListGuide = () => {
  const guideItems = [
    {
      title: "오늘 체크리스트",
      description: "매일 18시 이후 입력",
    },
    {
      title: "주간 체크리스트",
      description: "매주 금요일 18시 이후 입력",
    },
    {
      title: "개강2주 체크리스트",
      description: "개강 2주가 되는날 체크",
    },
    {
      title: "모집 체크리스트",
      description: "모집 기간 중 체크",
    },
    {
      title: "수료 체크리스트",
      description: "수료시점 부터 수료 후 1주일간 체크",
    },
  ];

  return (
    <GuideContainer>
      <GuideText>
        {guideItems.map((item, index) => (
          <GuideItem key={index}>
            <span>📌 {item.title}</span>
            <p>{item.description}</p>
          </GuideItem>
        ))}
      </GuideText>
    </GuideContainer>
  );
};

export default CheckListGuide;
