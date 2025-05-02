import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Notice() {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await apiClient.get("/api/auth/check");
      navigate("/user/notice");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleClick}>알림</button>;
}
