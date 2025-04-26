import { useNavigate } from "react-router-dom";
import { checkAuthAndMove } from "../../../utils/TokenCheck";

export default function EditProfile() {
  const navigate = useNavigate();
  const handleMove = () => {
    checkAuthAndMove(navigate, "/user/update");
  };
  return (
    <button className="border rounded" onClick={handleMove}>
      프로필 편집
    </button>
  );
}
