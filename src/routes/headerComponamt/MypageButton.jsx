import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function MypageBtn({ setIsOpen }) {
  const navigate = useNavigate();
  const handleMove = async function MoveToMypage() {
    setIsOpen(false);
    try {
      await apiClient.get("/api/auth/check");
      navigate("/user/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="py-3 text-sm hover:bg-gray-100 transition"
      onClick={handleMove}
    >
      마이페이지
    </button>
  );
}
