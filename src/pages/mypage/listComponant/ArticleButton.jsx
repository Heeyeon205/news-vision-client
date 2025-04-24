import axios from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { useNavigate } from "react-router-dom";

export default function ArticleButton() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await axios.get("/api/user/board");
      const result = response.data;
      if (!result.success) {
        ErrorAlert();
        return;
      }
      navigate("/api/mypage/board");
    } catch (error) {
      ErrorAlert(error);
    }
  };
  return <button onClick={handleClick}>아티클</button>;
}
