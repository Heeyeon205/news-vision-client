import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";

export default function JoinButton({
  username,
  password,
  email,
  validationState,
}) {
  const navigate = useNavigate();

  const joinBtn = async () => {
    try {
      if (
        !validationState.username ||
        !validationState.password ||
        !validationState.email
      ) {
        alert("모든 인증을 완료해 주세요.");
        return;
      }

      const response = await axios.post("/api/user/join", {
        username,
        password,
        email,
      });

      const result = response.data;
      if (!result.success) {
        ErrorAlert();
        return;
      }

      alert("회원가입 성공");
      navigate("/");
    } catch (error) {
      ErrorAlert(error);
    }
  };

  return <button onClick={joinBtn}>회원가입</button>;
}
