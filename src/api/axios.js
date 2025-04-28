import axios from 'axios';
import ErrorAlert from '../utils/ErrorAlert';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response, // 성공 응답은 그대로 통과
  error => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400 || status === 404) {
        alert(data.message);
      } else if (status === 500) {
        alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert(data.message || "문제가 발생했습니다.");
      }
    } else if (error.request) {
      alert("서버로부터 응답이 없습니다. 네트워크를 확인하세요.");
    } else {
      console.error("Axios Error:", error.message);
      ErrorAlert(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
