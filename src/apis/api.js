import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.10.162.13:5000",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
  //   withCredentials: true,
});

export const proPage = {
  getTasks: async () => {
    try {
      const response = await api.get("/tasks");
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  attendance: async (data) => {
    try {
      const response = await api.post("/attendance", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  getDailyCheck: async () => {
    try {
      const response = await api.get("/tasks");
      return response;
    } catch (error) {
      return error.response;
    }
  },

  postDailyCheck: async (data) => {
    try {
      const response = await api.post("tasks", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  getIssues: async () => {
    try {
      const response = await api.get("/issues");
      return response;
    } catch (error) {
      return error.response;
    }
  },

  postIssues: async (data) => {
    try {
      const response = await api.post("/issues", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  postRemarks: async (data) => {
    try {
      const response = await api.post("/remarks", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  getIssues: async () => {
    try {
      const response = await api.get("/issues");
      return response;
    } catch (error) {
      return error.response;
    }
  },

  getUnCheckedDescriptions: async () => {
    try {
      const response = await api.get("/unchecked_descriptions");
      return response;
    } catch (error) {
      return error.response;
    }
  },

  postUnCheckedDescriptions: async (data) => {
    try {
      const response = await api.get("/unchecked_descriptions", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
