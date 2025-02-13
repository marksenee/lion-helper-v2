import axios from "axios";

export const api = axios.create({
  baseURL: "https://mvp-dashboard.onrender.com",
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

  // 출,퇴근 기록 저장
  attendance: async (data) => {
    try {
      const response = await api.post("/attendance", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 일일 업무 가져오기
  getDailyCheck: async () => {
    try {
      const response = await api.get("/tasks");
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 일일 업무 전송하기
  postDailyCheck: async (data) => {
    try {
      const response = await api.post("/tasks", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 비정기 업무 가져오기
  getIrregularCheck: async () => {
    try {
      const response = await api.get("/irregular_tasks");
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 이슈 사항 데이터 불러오기
  getIssues: async () => {
    try {
      const response = await api.get("/issues");
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 이슈 데이터 보내기
  postIssues: async (data) => {
    try {
      const response = await api.post("/issues", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 이슈 해결
  deleteIssues: async (data) => {
    try {
      const response = await api.post("/issues/resolve", data);
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

  // 미체크 항목 데이터 불러오기
  getUnCheckedDescriptions: async () => {
    try {
      const response = await api.get("/unchecked_descriptions");
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 미체크 항목 데이터 전송
  postUnCheckedDescriptions: async (data) => {
    console.log("uncheck", data);
    try {
      const response = await api.post("/unchecked_descriptions", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 미체크 항목 데이터 전송
  postUnCheckedDescriptionsComment: async (data) => {
    try {
      const response = await api.post("/unchecked_comments", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 미체크 항목 해결
  deleteUnCheckedDescriptions: async (id) => {
    try {
      const response = await api.post("/unchecked_descriptions/resolve", {
        unchecked_id: id,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 이슈사항 댓글 조회
  getComments: async (data) => {
    try {
      const response = await api.get("/issues/comments", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 댓글 작성
  postComments: async (data) => {
    try {
      const response = await api.post("/issues/comments", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 과정 데이터 API
  getCourse: async () => {
    try {
      const response = await api.get("/training_courses");
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 미체크 항목 내용 입력
  postUncheckedComments: async (data) => {
    try {
      const response = await api.post("/unchecked_comments", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
