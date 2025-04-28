import { useNavigate } from "react-router-dom";
import apiClient from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";

export default function JoinButton({ username, password, email, validationState }) {
  const navigate = useNavigate();

  const joinBtn = async () => {
    try {
      if (!validationState.username || !validationState.password || !validationState.email) {
        alert("모든 인증을 완료해 주세요.");
        return;
      }
      const response = await apiClient.post("/api/user/join", { username, password, email });
      if (!response.data.success) {
        ErrorAlert();
        return;
      }
      alert("회원가입 성공");
      navigate("/");
    } catch (error) {
      ErrorAlert(error);
    }
  };

  return (
    <button
      type="button"
      className="w-full py-3 bg-orange-500 text-white text-sm font-bold rounded-md hover:bg-orange-600"
      onClick={joinBtn}
    >
      회원가입 완료
    </button>
  );
}
