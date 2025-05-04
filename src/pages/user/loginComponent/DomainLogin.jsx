import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api/axios";
import { useStore } from "../../../store/useUserStore";
import { toast } from "sonner";

function DomainLogin({ closeModal }) {
  const { setUser } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginBtn = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") return;
    try {
      const response = await apiClient.post("/api/auth/login", {
        username,
        password,
      });
      const result = response.data;
      const { accessToken, refreshToken, userId, nickname, image, role } =
        result.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(userId, nickname, image, role);
      toast.success("로그인 성공!");
      closeModal();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const goToFindPassword = () => {
    closeModal();
    navigate("/user/password");
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4">NEWSION</h3>
      <p className="text-gray-500 mb-6 text-sm">
        로그인하고 매일 나의 지식을 채워보세요
      </p>
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
