import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react"; // 아이콘 라이브러리 사용

const CustomAlert = ({ message, visible }) => {
  return (
    <div
      className={`fixed top-14 left-1/2 transform -translate-x-1/2 
                    w-[300px] h-[70px] flex items-center justify-center 
                    bg-white border border-[#DCDCDC] rounded-lg 
                    shadow-md transition-opacity duration-300 ${
                      visible ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
    >
      <CheckCircle size={20} color="#FF7710" className="mr-2" />
      <span className="text-[#FF7710] font-medium">{message}</span>
    </div>
  );
};

export default CustomAlert;
