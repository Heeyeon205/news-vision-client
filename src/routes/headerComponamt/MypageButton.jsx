import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../utils/ErrorAlert";

export default function MypageBtn() {
  const navigate = useNavigate();
  const handleMove = async function MoveToMypage() {
    try {
      await apiClient.get("/api/auth/check");
      navigate("/user/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleMove}>마이페이지</button>;
}
