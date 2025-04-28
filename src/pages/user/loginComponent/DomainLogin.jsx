import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { useStore } from "../../../store/useUserStore";

function DomainLogin() {
  const { setUser } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/api/auth/login", {
        username,
        password,
      });
      const result = response.data;
      const { accessToken, refreshToken, userId, nickname } = result.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(userId, nickname);
      console.log("domain login: ", userId, nickname);
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 || status === 404) {
          alert(data.message);
        } else if (status === 500) {
          alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else {
          alert(data.message || "문제가 발생했습니다.");
        }
      } else if (error.request) {
        alert("서버로부터 응답이 없습니다. 네트워크를 확인하세요.");
      } else {
        ErrorAlert(error);
        console.log("error.message: ", error.message);
      }
    }
  };

  return (
    <div>
      <h3>NEWSION</h3>
      <p>로그인하고 매일 나의 지식을 채워보세요</p>
      <form className="loginContainer" onSubmit={loginBtn}>
        <input
          className="border rounded"
          type="text"
          placeholder="아이디를 입력해 주세요."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className="border rounded"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default DomainLogin;
