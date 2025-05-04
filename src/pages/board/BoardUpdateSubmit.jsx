import apiClient from "../../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function BoardCreateSubmit({
  boardId,
  image,
  content,
  categoryId,
}) {
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
    const formData = new FormData();
    formData.append("image", image);
    formData.append("content", content);
    formData.append("categoryId", categoryId);
    try {
      await apiClient.put(`/api/board/${boardId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("게시글 수정 완료");
      navigate(`/board/${boardId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded text-sm"
    >
      수정하기
    </button>
  );
}
