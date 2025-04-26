import axios from "axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { useNavigate } from "react-router-dom";

export default function PasswordUpdateButton({ password, checkPassword }) {
  const navigate = useNavigate();
  console.log(localStorage.getItem("tempToken"));
  const handleClick = async () => {
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
      alert("비밀번호 재설정 성공");
      navigate("/user/domain-login");
    } catch (error) {
      ErrorAlert(error);
    }
  };

  return <button onClick={handleClick}>확인</button>;
}
