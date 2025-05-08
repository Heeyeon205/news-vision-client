import PasswordInput from "./joinComponent/PasswordInput";
import { useState, useEffect } from "react";
import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";
import PasswordUpdateButton from "./passwordUpdateComponent/PaawordUpdateButton";

export default function UpdatePassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [validationState, setValidationState] = useState({
    password: false,
  });

  useEffect(() => {
    const loadUpdateProcess = async () => {
      try {
        const response = await apiClient.get(`/api/user/password-load`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("tempToken")}`,
          },
        });
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        setUsername(result.data.username);
      } catch (error) {
        ErrorAlert(error);
      }
    };
    loadUpdateProcess();
  }, []);

  return (
    <div className="updateContaincer">
      <h3>비밀번호 재설정</h3>
      <p>{username}</p>
      <PasswordInput
        password={password}
        setPassword={setPassword}
        checkPassword={checkPassword}
        setCheckPassword={setCheckPassword}
        setValidationState={setValidationState}
      />
      <PasswordUpdateButton password={password} checkPassword={checkPassword} />
    </div>
  );
}
