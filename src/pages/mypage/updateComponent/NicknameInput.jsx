import axios from "../../../api/axios";
import { useState } from "react";
import ErrorAlert from "../../../utils/ErrorAlert";

export default function ValidateNickname({
  nickname,
  setNickname,
  setValidationState,
}) {
  const [color, setColor] = useState("");
  const [msg, setMsg] = useState("");
  const [readOnly, setReadOnly] = useState(false);

  const checkBtn = async () => {
    try {
      if (nickname === "") return;
      const response = await axios.get("/api/user/check-nickname", {
        params: { nickname },
      });
      const result = response.data;

      if (result.data.exists) {
        setValidationState((prev) => ({ ...prev, nickname: false }));
        setMsg("중복된 닉네임입니다.");
        setColor("red");
        return;
      }
      setMsg("");
      setColor("green");
      setReadOnly(true);
      setValidationState((prev) => ({ ...prev, nickname: true }));
    } catch (error) {
      ErrorAlert(error);
    }
  };

  return (
    <>
      <div className="flex">
        <input
          type="text"
          value={nickname}
          readOnly={readOnly}
          placeholder="닉네임을 입력해주세요."
          onChange={(e) => {
            const trimmed = e.target.value.slice(0, 20);
            setNickname(trimmed);
          }}
          style={{ borderColor: color }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="button"
          onClick={checkBtn}
          className="px-4  bg-orange-500 text-white text-sm rounded-r-md  hover:bg-orange-600"
        >
          중복확인
        </button>
      </div>
      <p className="text-sm mt-1" style={{ color }}>
        {msg}
      </p>
    </>
  );
}
