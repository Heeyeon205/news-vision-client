import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";

export default function InfoPage() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await apiClient.get("/api/auth/check");
      const result = response.data;
      if (!result.success) {
        alert("로그인 후 이용해 주세요.");
        navigate("/");
      }
      navigate("/gpt-news");
    } catch (error) {
      ErrorAlert(error);
    }
  };

  return (
    <div>
      <h3>시간 없으신가요?</h3>
      <h3>오늘 딱 이것만 보세요!</h3>
      <p>매일 업데이트되는 주요 뉴스 브리핑</p>
      <button onClick={handleClick}>지금 시작하기</button>
    </div>
  );
}
