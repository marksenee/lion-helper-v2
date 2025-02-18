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

  gerSearchData: async (query) => {
    try {
      const response = await api.get("/api/v1/faqs/search", {
        params: { query }, // ✅ params로 전달
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  //  getSearchData : async (query) => {
  //     try {
  //       const response = await api.get(`/api/v1/faqs/search?query=${query}`);
  //       return response;
  //     } catch (error) {
  //       return error.response;
  //     }
  //   };
};
