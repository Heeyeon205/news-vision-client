import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";

export default function InfoPage() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await apiClient.get("/api/auth/check");
      navigate("/gpt-news");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>시간 없으신가요?</h3>
      <h3>오늘 딱 이것만 보세요!</h3>
      <p>매일 업데이트되는 주요 뉴스 브리핑</p>
      <button className="border" onClick={handleClick}>
        지금 시작하기
      </button>
    </div>
  );
}
