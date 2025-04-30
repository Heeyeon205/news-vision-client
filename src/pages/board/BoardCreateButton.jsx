import { useStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";

export default function BoardCreateButton() {
  const logProfile = useStore((state) => state.image);
  const logNickname = useStore((state) => state.nickname);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await apiClient.get("/api/auth/check");
      navigate("/board/create-form");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="writeBox border">
      <img src={logProfile} alt="프로필이미지"></img>
      <input
        type="text"
        placeholder={`${logNickname}님의 생각을 나누며 지식을 넓혀보세요.`}
        onClick={handleClick}
      />
    </div>
  );
}
