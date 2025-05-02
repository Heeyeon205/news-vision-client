import ErrorAlert from "../../utils/ErrorAlert";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function PollCteateButton() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await apiClient.get("/api/user/check-role");
      navigate("/poll/create-form");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="bg-orange-500 text-white text-sm font-bold px-4 py-2 mt-5 rounded hover:bg-orange-400 transition-colors shadow-sm cursor-pointer"
      onClick={handleClick}
    >
      투표 만들기
    </button>
  );
}
