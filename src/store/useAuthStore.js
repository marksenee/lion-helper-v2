import { create } from "zustand";
import { proPage } from "../apis/api";

const useAuthStore = create((set) => ({
  username: sessionStorage.getItem("username") || null, // 세션에서 username 불러오기

  setUsername: (name) => {
    sessionStorage.setItem("username", name); // 세션에 username 저장
    set({ username: name });
  },

  postLogin: async (loginData) => {
    try {
      const response = await proPage.postLogin(loginData);
      if (response?.data?.success) {
        console.log("asddaasd", response.data);
        const userName = response.data.user.username;
        sessionStorage.setItem("username", userName); // 세션에 username 저장
        set({ username: userName });
      } else {
        console.error("🚨 데이터 형식 오류: 예상된 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error.response || error);
    }
  },

  logout: () => {
    sessionStorage.removeItem("username"); // 로그아웃 시 세션에서 삭제
    set({ username: null });
  },
}));

export default useAuthStore;
