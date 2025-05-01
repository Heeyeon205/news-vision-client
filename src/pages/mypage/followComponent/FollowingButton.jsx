import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../../utils/ErrorAlert";
import apiClient from "../../../api/axios";

export default function FollorwerButton({ following }) {
  const navigate = useNavigate();
  const hadleMove = async () => {
    try {
      await apiClient.get("/api/auth/check");
      navigate("/api/mypage/following");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="border rounded" onClick={hadleMove}>
      팔로잉 <span>{following}</span>
    </button>
  );
}
