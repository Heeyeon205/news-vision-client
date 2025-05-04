import { useCallback, useState, useEffect } from "react";
import { debounce } from "lodash";
import apiClient from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { validatePassword } from "../../../utils/validatePassword";

export default function PasswordInput({
  password,
  setPassword,
  checkPassword,
  setCheckPassword,
  setValidationState,
}) {
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
        if (!validPassword || password === "" || checkPassword === "") return;
        const response = await apiClient.get("/api/user/match-password", {
          params: { password, checkPassword },
        });
        const result = response.data;
        if (!result.data.exists) {
          setValidationState((prev) => ({ ...prev, password: false }));
          setCheckMsg("비밀번호 인증 실패");
          setCheckColor("red");
        } else {
          setCheckMsg("비밀번호 인증 완료");
          setCheckColor("green");
          setReadOnly(true);
          setValidationState((prev) => ({ ...prev, password: true }));
        }
      } catch (error) {
        ErrorAlert(error);
      }
    }, 500),
    []
  );

  return (
    <>
      <label for="password" class="block text-sm font-medium text-gray-700"
      >비밀번호</label
      >
      <input
        type="password"
        className="mt-1 block w-80 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="8자 이상 영문 대문자 특수문자를 포함"
        value={password}
        readOnly={readOnly}
        onChange={(e) => {
          setPassword(e.target.value);
          setTouched(true);
        }}
      />
      <p className="text-sm mt-1" style={{ color }}>{msg}</p>

      <label for="password" class="block text-sm font-medium mt-5 text-gray-700"
      >비밀번호 확인</label
      >
      <input
        type="password"
        className="mt-1 block w-80 px-3 py-2  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="비밀번호를 다시 입력하세요"
        value={checkPassword}
        readOnly={readOnly}
        onChange={(e) => {
          setCheckPassword(e.target.value);
          debounceCheck(password, e.target.value, validPassword);
        }}
      />
      <p className="text-sm mt-1" style={{ color: checkColor }}>{checkMsg}</p>
    </>
  );
}
