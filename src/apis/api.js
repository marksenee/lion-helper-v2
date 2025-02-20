import axios from "axios";

export const api = axios.create({
  baseURL: "https://mvp-dashboard.onrender.com",
  headers: {
    "content-type": "application/json",
    accept: "application/json,",
  },
  // withCredentials: true,
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

  // 출,퇴근 기록 다운로드
  getAttendance: async () => {
    try {
      const response = await api.get("/attendance");
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

  // 주간 업무 가져오기
  getWeeklyCheck: async () => {
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

  postIrregularCheck: async (data) => {
    try {
      const response = await api.post("/irregular_tasks", data);
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
  deleteUnCheckedDescriptions: async (data) => {
    try {
      const response = await api.post("/unchecked_descriptions/resolve", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 미체크 항목 대응현황, 대응 결과 작성
  postUnCheckedComment: async (data) => {
    try {
      const response = await api.post("/unchecked_comments", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 미체크 항목 대응현황 댓글 조회
  getUnCheckComment: async (query) => {
    try {
      const response = await api.get("/unchecked_comments", query);
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

  //체크율 조회 기능
  getCheckPercent: async () => {
    try {
      const response = await api.get("/admin/task_status");
      console.log("response", response);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  //로그인
  postLogin: async (data) => {
    try {
      const response = await api.post("/login", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", response.data.user.username);

      return response;
    } catch (error) {
      console.error("로그인 오류:", error.response || error);
      return error.response;
    }
  },
};
