import axios from "../../../api/axios";
import ErrorAlert from "../../../utils/ErrorAlert";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/useUserStore";

export default function UpdateSubmitButton({
  image,
  nickname,
  email,
  introduce,
}) {
  const userId = useStore((state) => state.user.id);
  const navigate = useNavigate();
  const formData = new FormData();
  formData.append("image", image);
  formData.append("nickname", nickname);
  formData.append("email", email);
  formData.append("introduce", introduce);

  const HandleSubmit = async () => {
    try {
      const response = await axios.put(`/api/user/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = response.data;
      toast.success("프로필 수정 완료!");
      navigate("/user/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={HandleSubmit}>완료</button>;
}
