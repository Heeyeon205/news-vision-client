import UpdateEmailInput from "../user/UpdateEmailInput";
import { useState } from "react";
import axios from "axios";
import ErrorAlert from "../../utils/ErrorAlert";
import UpdatePasswordModal from "./UpdatePasswordModal";

export default function FindPassword() {
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [validationState, setValidationState] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    if (!validationState) {
      toast.warning("이메일 인증을 먼저 해주세요.");
      return;
    }
    try {
      const response = await axios.get("http://localhost:8080/api/auth/temp-check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tempToken")}`,
        },
      });
      const result = response.data;
      if (!result.success) {
        ErrorAlert();
        return;
      }
      setShowModal(true);
    } catch (error) {
      ErrorAlert(error);
    }
  };

  return (
    <div className="flex justify-center items-center py-16 bg-white px-4">
      <div className="w-full max-w-sm bg-white p-6 border border-gray-300 rounded-lg shadow-sm h-fit">
        <h3 className="text-2xl font-bold text-center mb-3 text-gray-800">
          비밀번호 찾기
        </h3>
        <p className="text-sm text-center text-gray-500 mb-6">
          비밀번호를 재설정할 수 있는 인증번호를 보내드려요.
        </p>

        <UpdateEmailInput
          email={email}
          setEmail={setEmail}
          emailCode={emailCode}
          setEmailCode={setEmailCode}
          setValidationState={setValidationState}
        />

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-400 text-white text-sm px-5 py-2 rounded cursor-pointer"
          >
            비밀번호 재설정
          </button>
        </div>
      </div>

      {showModal && <UpdatePasswordModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
