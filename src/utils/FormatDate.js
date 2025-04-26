const today = new Date();
const weekdays = ["일", "월", "화", "수", "목", "금", "토", "일"];
const dayOfWeek = weekdays[today.getDay()];
export const formatDate = `${today.getFullYear()}년 ${
  today.getMonth() + 1
}월 ${today.getDate()}일 (${dayOfWeek})`;
