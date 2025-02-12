import axios from "axios";

export const api = axios.create({
  baseURL: "https://llfaq.onrender.com",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
  //   withCredentials: true,
});

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
};
