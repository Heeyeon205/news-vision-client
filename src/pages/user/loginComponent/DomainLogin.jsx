import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { useStore } from "../../../store/useUserStore";

function DomainLogin({ closeModal }) {
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
      closeModal();
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

  const goToFindPassword = () => {
    closeModal();
    navigate("/user/password"); // 비밀번호 찾기 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4">NEWSION</h3>
      <p className="text-gray-500 mb-6 text-sm">로그인하고 매일 나의 지식을 채워보세요</p>
      <form className="flex flex-col w-72 space-y-4" onSubmit={loginBtn}>
        <input
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          type="text"
          placeholder="아이디를 입력해 주세요."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="py-3 bg-orange-500 text-white text-sm font-bold rounded-md hover:bg-orange-600"
        >
          로그인
        </button>
      </form>

      {/* 비밀번호 찾기 버튼 */}
      <button
        onClick={goToFindPassword}
        className="mt-4 text-sm text-orange-500 hover:underline"
      >
        비밀번호를 잊으셨나요?
      </button>
    </div>
  );
}

export default DomainLogin;
