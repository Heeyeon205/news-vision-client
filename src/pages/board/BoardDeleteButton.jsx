import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { toast } from "sonner";

export default function BoardDeleteButton({ boardId }) {
  const navigate = useNavigate();
  const handleClick = async () => {
    const check = confirm("해당 게시글을 삭제하시겠습니까?");
    if (check) {
      try {
        await apiClient.delete(`/api/board/${boardId}`);
        toast.success("게시글 삭제 완료");
        navigate("/board");
      } catch (error) {
        console.log(error);
      }
    }
    return;
  };
  return (
    <button
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      onClick={handleClick}
    >
      삭제
    </button>
  );
}
