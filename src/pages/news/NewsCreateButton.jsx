import ErrorAlert from "../../utils/ErrorAlert";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function NewsCreateButton() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await apiClient.get("/api/user/check-role");
      const result = response.data;
      if (!result.success) {
        alert("접근 권한이 없습니다.");
        return;
      }
      navigate("/news/create-form");
    } catch (error) {
      ErrorAlert(error);
    }
  };
  return (
    <button className="border rounded" onClick={handleClick}>
      글쓰기
    </button>
  );
}
