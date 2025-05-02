import axios from 'axios';
import ErrorAlert from '../utils/ErrorAlert';
import { useGlobalStore } from '../store/useGlobalStore';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const { setLoading } = useGlobalStore.getState();

instance.interceptors.request.use(
  config => {
    setLoading(true);
    const token = localStorage.getItem('accessToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  error => {
    setLoading(false);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    setLoading(false); 
    return response;
  },
  async error => {
    setLoading(false);
    const originalRequest = error.config;

    if (error.response) {
      const { status, data } = error.response;

      if (status === 401 && !originalRequest._retry) {
        console.log("현재 엑세스 토큰 만료");
        originalRequest._retry = true;
        try {
          console.log("새로운 엑세스 토큰 서버에 요청");
          const refreshToken = localStorage.getItem('refreshToken');
          const res = await axios.post('http://localhost:8080/api/auth/refresh', {}, {
            headers: { refreshToken: refreshToken }
          });

          const newAccessToken = res.data.data; 
          console.log("다시 받은 엑세스 토큰: ", newAccessToken);
          localStorage.setItem('accessToken', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance(originalRequest);
        } catch (refreshError) {
          alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href="/user/login"
          return Promise.reject(refreshError);
        }
      }

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
