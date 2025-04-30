import { useEffect, useState } from "react";
import PasswordInput from "./joinComponent/PasswordInput";
import PasswordUpdateButton from "./passwordUpdateComponent/PaawordUpdateButton";
import ErrorAlert from "../../utils/ErrorAlert";
import axios from "axios";

export default function UpdatePasswordModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [validationState, setValidationState] = useState({ password: false });

  const [visible, setVisible] = useState(false); // mount 후 보여줄지 여부
  const [closing, setClosing] = useState(false); // unmount 애니메이션

  useEffect(() => {
    // mount 후 바로 fade-in 시작
    setTimeout(() => setVisible(true), 10);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user/password-load", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tempToken")}`,
          },
        });
        const result = res.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        setUsername(result.data.username);
      } catch (err) {
        ErrorAlert(err);
      }
    };
    loadUser();
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40
        transition-opacity duration-300 ${visible && !closing ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white p-6 rounded-lg w-[360px] max-w-sm shadow-lg relative transform
        transition-all duration-300 
        ${visible && !closing ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
        >
          ✕
        </button>
        <h3 className="text-xl font-bold text-center mb-2">비밀번호 재설정</h3>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          checkPassword={checkPassword}
          setCheckPassword={setCheckPassword}
          setValidationState={setValidationState}
        />

        <div className="mt-4 flex justify-center">
        <PasswordUpdateButton
  password={password}
  checkPassword={checkPassword}
  validationState={validationState}
/>

        </div>
      </div>
    </div>
  );
}
