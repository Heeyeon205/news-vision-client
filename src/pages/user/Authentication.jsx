import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useStore } from "../../store/useUserStore";

export default function Authentication() {
  const { setUser } = useStore();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const userId = params.get("userId");
    const nickname = params.get("nickname");
    const image = params.get("image");
    const role = params.get("role");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(userId, nickname, image, role);
      alert("로그인 성공");
      navigate("/");
    } else {
      alert("로그인 실패");
      navigate("/");
    }
  }, [navigate, setUser]);

  return <p>로그인 중...</p>;
}
