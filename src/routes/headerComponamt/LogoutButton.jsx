import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useUserStore";
import { toast } from "sonner";

export default function LogoutButton() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const clearUser = useStore((state) => state.clearUser);
  const navigator = useNavigate();

  const handleLogout = async () => {
    const check = confirm("로그아웃 하시겠습니까?");
    if (check) {
      try {
        await apiClient.post("/api/auth/logout", {
          accessToken,
          refreshToken,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.success("로그아웃 완료");
        clearUser();
        navigator("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
