import apiClient from "../../../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/useUserStore";

export default function UpdateSubmitButton({
  image,
  nickname,
  email,
  introduce,
}) {
  const userId = useStore((state) => state.userId);
  const navigate = useNavigate();
  const { setUser } = useStore();

  const formData = new FormData();
  formData.append("image", image);
  formData.append("nickname", nickname);
  formData.append("email", email);
  formData.append("introduce", introduce);

  const HandleSubmit = async () => {
    try {
      const res = await apiClient.put(`/api/user/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = res.data;
      const updatedUser = result.data;
      setUser(
        userId,
        updatedUser.nickname,
        updatedUser.image,
        updatedUser.role
      );
      toast.success("프로필 수정 완료!");
      navigate("/user/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={HandleSubmit}
      className="px-4 py-2 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-400 cursor-pointer"
    >
      완료
    </button>
  );
}
