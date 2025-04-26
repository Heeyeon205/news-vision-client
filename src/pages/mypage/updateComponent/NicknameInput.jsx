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
      if (nickname === "") {
        return;
      }
      const response = await axios.get("/api/user/check-nickname", {
        params: { nickname },
      });
      const result = response.data;
      console.log(result);
      console.log(result.data);
      console.log(result.data.exists);

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

  const handleChange = (e) => {
    const value = e.target.value;
    setNickname(value);
  };

  return (
    <>
      <label>닉네임</label> <br />
      <input
        style={{ borderColor: color }}
        type="text"
        value={nickname}
        readOnly={readOnly}
        placeholder="닉네임을 입력해주세요."
        onChange={handleChange}
      />
      <button onClick={checkBtn}>중복확인</button> <br />
      <label style={{ color }}>{msg}</label>
      <br />
    </>
  );
}
