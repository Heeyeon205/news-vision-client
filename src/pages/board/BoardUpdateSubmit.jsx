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
      toast.success("게시글 수정 완료");
      navigate(`/board/${boardId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="border" onClick={handleClick}>
      수정하기
    </button>
  );
}
