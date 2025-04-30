import apiClient from "../../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function BoardCreateSubmit({ image, content, categoryId }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (categoryId < 2) {
      toast.warning("카테고리를 선택해 주세요");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("content", content);
    formData.append("categoryId", categoryId);
    try {
      const res = await apiClient.post("/api/board", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("게시글 작성 완료");
      navigate("/board");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded" onClick={handleClick}>
      남기기
    </button>
  );
}
