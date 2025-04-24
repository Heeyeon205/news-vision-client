import axios from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UpdateSubmitButton({
  image,
  nickname,
  email,
  introduce,
}) {
  const navigate = useNavigate();
  const formData = new FormData();
  formData.append("image", image);
  formData.append("nickname", nickname);
  formData.append("email", email);
  formData.append("introduce", introduce);

  const HandleSubmit = async () => {
    const response = await axios.post("/api/user/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const result = response.data;
    if (!result.success) {
      ErrorAlert();
      return;
    }
    toast.success("프로필 수정 완료!");
    navigate("/user/mypage");
  };

  return <button onClick={HandleSubmit}>완료</button>;
}
