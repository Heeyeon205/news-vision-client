import { useCallback, useState, useEffect } from "react";
import apiClient from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { debounce } from "lodash";

export default function UsernameCheck({
  username,
  setUsername,
  setValidationState,
}) {
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched && username === "") {
      setMsg("아이디를 입력해 주세요.");
      setColor("red");
    }
  }, [username, touched]);

  const debounceCheck = useCallback(
    debounce(async (input) => {
      try {
        const id = input.trim();
        if (id === "") {
          return;
        }
        const response = await apiClient.get("/api/user/check-username", {
          params: { username: id },
        });
        const result = response.data;
        if (result.data.exists) {
          setMsg("이미 사용중인 아이디입니다.");
          setColor("red");
          setValidationState((prev) => ({ ...prev, username: false }));
        } else {
          setMsg("사용 가능한 아이디입니다.");
          setColor("green");
          setValidationState((prev) => ({ ...prev, username: true }));
        }
      } catch (error) {
        ErrorAlert(error);
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    debounceCheck(value);
    if (!touched) {
      setTouched(true);
    }
  };

  return (
    <>
      <label>아이디</label> <br />
      <input
        className="border rounded"
        type="text"
        value={username}
        placeholder="아이디를 입력해주세요."
        onChange={handleChange}
      />
      <span style={{ color }}>{msg}</span>
      <br />
    </>
  );
}
