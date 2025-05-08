import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../../utils/ErrorAlert";
import apiClient from "../../../api/axios";
import { toast } from "sonner";

export default function FollorwerButton({ follower }) {
  const navigate = useNavigate();
  const hadleMove = async () => {
    try {
      const response = await apiClient.get("/api/auth/check");
      const result = response.data;
      if (!result.success) {
        toast.error("로그인 후 이용해주세요.");
        navigate("/user/login");
        return;
      }
      navigate("/api/mypage/follower");
    } catch (error) {
      ErrorAlert(error);
    }
  };

  return (
    <button className="border rounded" onClick={hadleMove}>
      팔로워 <span>{follower}</span>
    </button>
  );
}
