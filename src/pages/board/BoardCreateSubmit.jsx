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
    if (content.length < 30) {
      toast.warning("본문 내용이 너무 짧습니다. 최소 30자 이상 작성해 주세요.");
      return;
    }
    if (content.length > 300) {
      toast.warning(
        "본문 내용이 너무 깁니다. 최대 300자까지 작성할 수 있습니다."
      );
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
      const result = res.data;
      toast.success("게시글 작성 완료");
      navigate(`/board/${result.data}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded"
      onClick={handleClick}
    >
      남기기
    </button>
  );
}
