import axios from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { useState, useEffect } from "react";

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
      const response = await axios.post("/email/send-code", { email });
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
      const response = await axios.post("/email/verify", { email, emailCode });
      const result = response.data;
      if (!result.success) {
        setValidationState((prev) => ({ ...prev, email: false }));
        alert("이메일 인증에 실패했습니다. 다시 시도해주세요");
        return;
      }
      setReadOnly(true);
      setCheckMsg("이메일 인증에 성공했습니다.");
      setCheckColor("green");
      setValidationState((prev) => ({ ...prev, email: true }));
    } catch (error) {
      alert("이메일 인증에 실패했습니다. 다시 시도해주세요");
      // ErrorAlert();
      console.log(error);
    }
  };

  return (
    <>
      <label>이메일</label>
      <br />
      <input
        className="border rounded"
        type="email"
        value={email}
        placeholder="이메일을 입력해주세요."
        readOnly={readOnly}
        onChange={(e) => {
          setEmail(e.target.value);
          setTouched(true);
        }}
      />
      <button onClick={authBtn}>인증하기 </button>
      <br />
      <label style={{ color }}>{msg}</label> <br />
      <label>인증번호</label>
      <br />
      <input
        className="border rounded"
        type="text"
        value={emailCode}
        placeholder="인증번호를 입력해주세요."
        onChange={(e) => setEmailCode(e.target.value)}
        readOnly={readOnly}
      />
      <button onClick={authCheckBtn}>인증확인 </button>
      <label style={{ color: checkColor }}>{checkMsg}</label> <br />
      <br />
    </>
  );
}
