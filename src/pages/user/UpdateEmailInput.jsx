import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function validateEmail(email) {
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      email
    )
  ) {
    return { valid: false, msg: "이메일 형식에 따라 입력해주세요." };
  }
  return { valid: true, msg: "" };
}

export default function MatchesEmailCode({
  email,
  setEmail,
  emailCode,
  setEmailCode,
  setValidationState,
}) {
  const [msg, setMsg] = useState("");
  const [checkMsg, setCheckMsg] = useState("");
  const [color, setColor] = useState("");
  const [checkColor, setCheckColor] = useState("");
  const [touched, setTouched] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  useEffect(() => {
    if (!touched) return;
    const { msg, valid } = validateEmail(email);
    setMsg(msg);
    setColor(valid ? "green" : "red");
  }, [email, touched]);

  const authBtn = async () => {
    const { valid } = validateEmail(email);
    if (!valid) {
      setMsg("이메일 형식에 따라 입력해주세요.");
      setColor("red");
      return;
    }
    if (email === "") {
      return;
    }
    try {
      const response = await apiClient.post("/email/update/send-code", {
        email,
      });
      const result = response.data;
      if (!result.success) {
        ErrorAlert();
        return;
      }
      toast.success("인증 메일을 발송했습니다.");
      setCodeSent(true);
    } catch (error) {
      ErrorAlert(error);
    }
  };

  const authCheckBtn = async () => {
    const { valid } = validateEmail(email);
    if (!valid) {
      setCheckMsg("이메일 인증을 먼저해주세요");
      setCheckColor("red");
      return;
    }
    if (emailCode === "") {
      return;
    }
    try {
      const response = await apiClient.post("/api/auth/email-auth", {
        email,
        emailCode,
      });
      const result = response.data;
      if (!result.success) {
        setValidationState((prev) => ({ ...prev, email: false }));
        toast.warning("이메일 인증에 실패했습니다. 다시 시도해주세요");
        return;
      }
      setReadOnly(true);
      setCheckMsg("이메일 인증에 성공했습니다.");
      setCheckColor("green");
      setValidationState(true);
      const tempToken = result.data.tempToken;
      console.log(result);
      console.log(result.data);
      console.log(tempToken);
      localStorage.setItem("tempToken", tempToken);
    } catch (error) {
      toast.warning("이메일 인증에 실패했습니다. 다시 시도해주세요");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex w-full">
        <input
          type="email"
          value={email}
          readOnly={readOnly}
          placeholder="이메일을 입력해주세요."
          onChange={(e) => {
            setEmail(e.target.value);
            setTouched(true);
          }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="button"
          onClick={authBtn}
          className="px-4 py-2 bg-orange-500 text-white text-sm rounded-r-md hover:bg-orange-400 cursor-pointer"
        >
          인증하기
        </button>
      </div>
      {msg && <p className="text-xs text-red-500">{msg}</p>}

      {codeSent && (
        <>
          <div>
            <label
              htmlFor="email-code"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              인증번호
            </label>
            <div className="flex w-full">
              <input
                id="email-code"
                type="text"
                value={emailCode}
                readOnly={readOnly}
                placeholder="인증번호를 입력해주세요."
                onChange={(e) => setEmailCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={authCheckBtn}
                className="px-4 py-2 bg-orange-500 text-white text-sm rounded-r-md hover:bg-orange-400 cursor-pointer"
              >
                인증확인
              </button>
            </div>
            {checkMsg && (
              <p className="text-xs mt-1" style={{ color: checkColor }}>
                {checkMsg}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
