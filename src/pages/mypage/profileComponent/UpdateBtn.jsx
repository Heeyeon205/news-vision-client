import { useNavigate } from "react-router-dom";
import { checkAuthAndMove } from "../../../utils/TokenCheck";

export default function EditProfile() {
  const navigate = useNavigate();
  const handleMove = () => {
    checkAuthAndMove(navigate, "/user/update");
  };
  return (
    <button
      className="bg-orange-500 hover:bg-orange-400 text-white text-sm px-3 py-1 rounded transition cursor-pointer"
      onClick={handleMove}
    >
      프로필 편집
    </button>
  );
}
