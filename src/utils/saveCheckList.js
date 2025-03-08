const EXPIRATION_HOURS = 24; // ⏳ 만료 시간 (24시간)

/**
 * ✅ localStorage에 데이터 저장 (만료 시간 포함)
 * @param {string} key 저장할 key 값
 * @param {any} data 저장할 데이터
 */
export const saveToLocalStorage = (key, data) => {
  const now = new Date().getTime();
  const expirationTime = now + EXPIRATION_HOURS * 60 * 60 * 1000; // 24시간 후

  localStorage.setItem(key, JSON.stringify({ data, expirationTime }));
};

/**
 * ✅ localStorage에서 데이터 불러오기 (만료 검사 포함)
 * @param {string} key 가져올 key 값
 * @returns {any | null} 만료되지 않은 데이터 반환, 만료되었으면 null
 */
export const loadFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  if (!storedData) return null;

  const { data, expirationTime } = JSON.parse(storedData);
  const now = new Date().getTime();

  if (now > expirationTime) {
    localStorage.removeItem(key); // 만료된 데이터 삭제
    return null;
  }

  return data;
};

/**
 * ✅ localStorage에서 특정 key의 데이터 삭제
 * @param {string} key 삭제할 key 값
 */
export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
