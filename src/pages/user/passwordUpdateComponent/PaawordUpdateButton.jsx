import axios from "axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { useNavigate } from "react-router-dom";

export default function PasswordUpdateButton({ password, checkPassword, validationState }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!validationState.password) {
      toast.warning("비밀번호가 유효하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/new-password",
        { password, checkPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("tempToken")}`,
          },
        }
      );
      const result = response.data;
      if (!result.success) {
        ErrorAlert();
        return;
      }
      toast.warning("비밀번호 재설정 성공");
      navigate("/");
    } catch (error) {
      ErrorAlert(error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-orange-500 hover:bg-orange-400 text-white text-sm px-5 py-2 rounded cursor-pointer"
    >
      확인
    </button>
  );
}

