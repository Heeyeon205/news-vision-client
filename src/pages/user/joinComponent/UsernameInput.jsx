import { useCallback, useState, useEffect } from "react";
import { debounce } from "lodash";
import apiClient from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";

export default function UsernameInput({
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
        if (input.trim() === "") return;
        const response = await apiClient.get("/api/user/check-username", {
          params: { username: input },
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
    if (!touched) setTouched(true);
  };

  return (
    <>
      <label for="id" className="block text-sm font-medium text-gray-700">
        아이디
      </label>
      <input
        type="text"
        className="mt-1 block w-80 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="아이디를 입력하세요"
        value={username}
        onChange={handleChange}
      />
      <p className="text-sm mt-1" style={{ color }}>
        {msg}
      </p>
    </>
  );
}
