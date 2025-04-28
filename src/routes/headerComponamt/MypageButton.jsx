import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../utils/ErrorAlert";

export default function MypageBtn() {
  const navigate = useNavigate();
  const handleMove = async function MoveToMypage() {
    try {
      const response = await apiClient.get("/api/auth/check");
      const result = response.data;
      navigate("/user/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="border rounded mx-5" onClick={handleMove}>
      마이페이지
    </button>
  );
}
