import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../utils/ErrorAlert";

export default function MypageBtn() {
  const navigate = useNavigate();
  const handleMove = async function MoveToMypage() {
    try {
      const response = await axios.get("/api/auth/check");
      const result = response.data;
      if (!result.success) {
        alert("로그인 후 이용해 주세요.");
        navigate("/user/login");
        return;
      }
      navigate("/user/mypage");
    } catch (error) {
      ErrorAlert(error);
    }
  };

  return (
    <button className="border rounded" onClick={handleMove}>
      마이페이지
    </button>
  );
}
