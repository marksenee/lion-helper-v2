import { create } from "zustand";
import { proPage } from "../apis/api";

const useAuthStore = create((set) => ({
  username: sessionStorage.getItem("username") || null, // 🔥 sessionStorage에서 가져오기
  setUsername: (name) => {
    sessionStorage.setItem("username", name); // 🔥 로그인 시 sessionStorage에도 저장
    set({ username: name });
  },
  postLogin: async () => {
    try {
      const response = await proPage.postLogin();
      if (response?.data?.data) {
        const userName = response.data.user.username;
        sessionStorage.setItem("username", userName); // 로그인 성공 시 저장
        set({ username: userName });
      } else {
        console.error("🚨 데이터 형식 오류: 예상된 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error.response || error);
    }
  },
}));

export default useAuthStore;
