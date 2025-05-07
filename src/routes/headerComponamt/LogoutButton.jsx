import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { useStore } from "../../store/useUserStore";
import { toast } from "sonner";
import ConfirmModal from "../../utils/ConfirmModal"; // 위치에 맞게 import

export default function LogoutButton() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const clearUser = useStore((state) => state.clearUser);
  const navigator = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
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
      toast.error("로그아웃에 실패했습니다.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        className="py-3 text-sm hover:bg-gray-100 transition"
        onClick={() => setIsModalOpen(true)}
      >
        로그아웃
      </button>

      <ConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        title="로그아웃 확인"
        description="정말로 로그아웃 하시겠습니까?"
        confirmText="로그아웃"
        cancelText="취소"
      />
    </>
  );
}
