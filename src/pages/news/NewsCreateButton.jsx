import ErrorAlert from "../../utils/ErrorAlert";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function NewsCreateButton() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await apiClient.get("/api/user/check-role");
      navigate("/news/create-form");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="border rounded" onClick={handleClick}>
      글쓰기
    </button>
  );
}
