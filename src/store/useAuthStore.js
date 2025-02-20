import { create } from "zustand";
import { proPage } from "../apis/api";

const useAuthStore = create((set) => ({
  username: null,
  setUsername: (name) => set({ username: name }),

  postLogin: async () => {
    try {
      const response = await proPage.postLogin();
      if (response?.data?.data) {
        const userName = response.data.user.username;
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
