import { useCallback, useState, useEffect } from "react";
import axios from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { debounce } from "lodash";
import { validatePassword } from "../../../utils/validatePassword";

export default function PasswordInput({
  password,
  setPassword,
  checkPassword,
  setCheckPassword,
  setValidationState,
}) {
  console.log("PasswordInput 컴포넌트 로드");
  console.log("1= ", typeof setPassword);
  const [msg, setMsg] = useState("");
  const [checkMsg, setCheckMsg] = useState("");
  const [color, setColor] = useState("");
  const [checkColor, setCheckColor] = useState("");
  const [touched, setTouched] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    if (touched) {
      const { valid, msg } = validatePassword(password);
      setMsg(msg);
      setColor(valid ? "green" : "red");
      setValidPassword(valid);
    }
  }, [password, touched]);

  const debounceCheck = useCallback(
    debounce(async (password, checkPassword, validPassword) => {
      try {
        if (!validPassword || password === "" || checkPassword === "") {
          return;
        }
        const response = await axios.get("/api/user/match-password", {
          params: { password, checkPassword },
        });
        const result = response.data;
        if (!result.data.exists) {
          setValidationState((prev) => ({ ...prev, password: false }));
          setCheckMsg("비밀번호 인증 실패");
          setCheckColor("red");
          return;
        }
        setCheckMsg("비밀번호 인증 완료");
        setCheckColor("green");
        setReadOnly(true);
        setValidationState((prev) => ({ ...prev, password: true }));
      } catch (error) {
        ErrorAlert(error);
      }
    }, 500),
    []
  );

  return (
    <>
      <label>
        비밀번호 (8자 이상, 특수문자 및 영문 대문자를 포함해 주세요.)
      </label>
      <br />
      <input
        type="password"
        value={password}
        placeholder="비밀번호를 입력해주세요."
        readOnly={readOnly}
        onChange={(e) => {
          setPassword(e.target.value);
          setTouched(true);
        }}
      />
      <span style={{ color }}>{msg}</span>
      <br />

      <label>비밀번호 확인</label>
      <br />
      <input
        type="password"
        value={checkPassword}
        placeholder="비밀번호를 한번 더 입력해주세요."
        readOnly={readOnly}
        onChange={(e) => {
          setCheckPassword(e.target.value);
          debounceCheck(password, e.target.value, validPassword);
        }}
      />
      <span style={{ color: checkColor }}>{checkMsg}</span>
      <br />
    </>
  );
}
