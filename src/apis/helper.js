import axios from "axios";

export const api = axios.create({
  baseURL: "https://llfaq.onrender.com",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
  //   withCredentials: true,
});
//api/v1/faqs/search?
export const helper = {
  getNotice: async () => {
    try {
      const response = await api.get("/api/v1/notices");
      console.log(response);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  // const getSearchData = async (query) => {
  //   try {
  //     const response = await api.get(`https://llfaq.onrender.com/api/v1/faqs/search?query=${query}`);
  //     return response;
  //   } catch (error) {
  //     console.error("API 호출 오류:", error);
  //     return { data: [] }; // 오류 발생 시 빈 배열 반환
  //   }
  // };
};
