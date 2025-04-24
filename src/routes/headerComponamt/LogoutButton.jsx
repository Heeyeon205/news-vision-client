import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../utils/ErrorAlert";
import { useUser } from "../../utils/UserContext";

export default function LogoutButton() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const { setUser } = useUser();
  const navigator = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout", {
        accessToken,
        refreshToken,
      });
      const result = response.data;
      if (!result.success) {
        alert("로그인 후 이용해 주세요.");
        return;
      }
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("로그아웃 완료");
      setUser(null);
      navigator("/");
    } catch (error) {
      ErrorAlert(error);
    }
  };
  return <button onClick={handleLogout}>로그아웃</button>;
}
