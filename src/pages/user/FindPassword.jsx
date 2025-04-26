import UpdateEmailInput from "../user/UpdateEmailInput";
import { useState } from "react";
import axios from "axios";
import ErrorAlert from "../../utils/ErrorAlert";
import { useNavigate } from "react-router-dom";

export default function FindPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [validationState, setValidationState] = useState(false);

  const handleSubmit = async () => {
    if (!validationState) {
      alert("이메일 인증을 먼저해 주세요");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/auth/temp-check",
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
      navigate("/user/update-password");
    } catch (error) {
      ErrorAlert(error);
    }
  };

  return (
    <div className="findContainer">
      <h3>비밀번호 찾기</h3>
      <p>비밀번호를 재설정할 수 있는 인증번호를 보내드려요.</p>
      <UpdateEmailInput
        email={email}
        setEmail={setEmail}
        emailCode={emailCode}
        setEmailCode={setEmailCode}
        setValidationState={setValidationState}
      />
      <button onClick={handleSubmit}>비밀번호 재설정</button>
    </div>
  );
}
