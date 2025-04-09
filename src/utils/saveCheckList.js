const RESET_HOUR = 23; // 리셋할 시간 (14:00)

/**
 * ✅ 매일 오후 2시(14:00)에 localStorage 데이터 삭제
 */
const resetLocalStorageAtTwoPM = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  // 현재 날짜를 가져옴
  const today = new Date().toDateString();
  const lastReset = localStorage.getItem("lastReset");

  // 마지막 리셋 날짜가 오늘이 아니고, 현재 시간이 14:00이면 localStorage 초기화
  if (
    lastReset !== today &&
    currentHour === RESET_HOUR &&
    currentMinutes === 0
  ) {
    localStorage.clear(); // 모든 데이터 삭제
    localStorage.setItem("lastReset", today); // 마지막 리셋 날짜 저장
    console.log("🔄 localStorage가 오후 2시(14:00)에 리셋되었습니다.");
  }
};

// 1분마다 실행하여 14:00 감지
setInterval(resetLocalStorageAtTwoPM, 60 * 1000);

/**
 * ✅ localStorage에 데이터 저장 (만료 시간 포함)
 * @param {string} key 저장할 key 값
 * @param {any} data 저장할 데이터
 */
export const saveToLocalStorage = (key, data) => {
  const username = sessionStorage.getItem("username"); // 사용자별 데이터 분리
  if (!username) return;

  const now = new Date();
  // 다음 오후 2시 시간 계산
  const nextReset = new Date(now);
  if (now.getHours() >= RESET_HOUR) {
    // 현재 시간이 오후 2시 이후면 다음 날 오후 2시로 설정
    nextReset.setDate(nextReset.getDate() + 1);
  }
  nextReset.setHours(RESET_HOUR, 0, 0, 0);

  const expirationTime = nextReset.getTime();

  localStorage.setItem(
    `${key}_${username}`,
    JSON.stringify({ data, expirationTime })
  );
};

/**
 * ✅ localStorage에서 데이터 불러오기 (만료 검사 포함)
 * @param {string} key 가져올 key 값
 * @returns {any | null} 만료되지 않은 데이터 반환, 만료되었으면 null
 */
export const loadFromLocalStorage = (key) => {
  const username = sessionStorage.getItem("username");
  if (!username) return null;

  const storedData = localStorage.getItem(`${key}_${username}`);
  if (!storedData) return null;

  const { data, expirationTime } = JSON.parse(storedData);
  const now = new Date().getTime();

  if (now > expirationTime) {
    localStorage.removeItem(`${key}_${username}`); // 만료된 데이터 삭제
    return null;
  }

  return data;
};
