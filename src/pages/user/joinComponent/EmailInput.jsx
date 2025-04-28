import apiClient from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { useState, useEffect } from "react";

export function EmailInput(email) {
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

  useEffect(() => {
    if (!touched) return;
    const { msg, valid } = EmailInput(email);
    setMsg(msg);
    setColor(valid ? "green" : "red");
  }, [email, touched]);

  const authBtn = async () => {
    const { valid } = EmailInput(email);
    if (!valid) {
      setMsg("이메일 형식에 따라 입력해주세요.");
      setColor("red");
      return;
    }
    if (email === "") return;
    try {
      const response = await apiClient.post("/email/send-code", { email });
      const result = response.data;
      if (result.data.exists) {
        setMsg("이미 사용중인 이메일입니다.");
        setColor("red");
        return;
      }
      if (!result.success) {
        ErrorAlert();
        return;
      }
      alert("인증 메일을 발송했습니다.");
    } catch (error) {
      ErrorAlert(error);
    }
  };

  const authCheckBtn = async () => {
    const { valid } = EmailInput(email);
    if (!valid) {
      setCheckMsg("이메일 인증을 먼저 해주세요.");
      setCheckColor("red");
      return;
    }
    if (emailCode === "") return;
    try {
      const response = await apiClient.post("/email/verify", {
        email,
        emailCode,
      });
      const result = response.data;
      if (!result.success) {
        setValidationState((prev) => ({ ...prev, email: false }));
        alert("이메일 인증에 실패했습니다. 다시 시도해주세요.");
        return;
      }
      setReadOnly(true);
      setCheckMsg("이메일 인증에 성공했습니다.");
      setCheckColor("green");
      setValidationState((prev) => ({ ...prev, email: true }));
    } catch (error) {
      alert("이메일 인증에 실패했습니다. 다시 시도해주세요.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col space-y-1 w-80">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        이메일
      </label>
      <div className="flex w-full">
        <input
          id="email"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:ring-orange-500 focus:border-orange-500"
          type="email"
          value={email}
          readOnly={readOnly}
          placeholder="이메일을 입력해주세요."
          onChange={(e) => {
            setEmail(e.target.value);
            setTouched(true);
          }}
        />
        <button
          type="button"
          onClick={authBtn}
          className="px-4 py-2 bg-orange-500 text-white text-sm rounded-r-md hover:bg-orange-600"
        >
          인증하기
        </button>
      </div>
      <p className="text-sm" style={{ color }}>
        {msg}
      </p>

      <label
        htmlFor="email-code"
        className="block text-sm mt-3 font-medium text-gray-700"
      >
        인증번호
      </label>
      <div className="flex w-full">
        <input
          id="email-code"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:ring-orange-500 focus:border-orange-500"
          type="text"
          value={emailCode}
          readOnly={readOnly}
          placeholder="인증번호를 입력해주세요."
          onChange={(e) => setEmailCode(e.target.value)}
        />
        <button
          type="button"
          onClick={authCheckBtn}
          className="px-4 py-2 bg-orange-500 text-white text-sm rounded-r-md hover:bg-orange-600"
        >
          인증확인
        </button>
      </div>
      <p className="text-sm" style={{ color: checkColor }}>
        {checkMsg}
      </p>
    </div>
  );
}
