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
    <button className="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded hover:bg-orange-600 transition-colors shadow-sm cursor-pointer" onClick={handleClick}>
      글쓰기
    </button>
  );
}
