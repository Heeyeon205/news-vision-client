import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { toast } from "sonner";

export default function NewsDeleteButton({ newsId }) {
  const navigate = useNavigate();
  const handleClick = async () => {
    const check = confirm("해당 뉴스를 삭제하시겠습니까?");
    if (check) {
      try {
        await apiClient.delete(`/api/news/${newsId}`);
        toast.success("뉴스 삭제 완료");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
    return;
  };

  return (
    <button className="border" onClick={handleClick}>
      삭제
    </button>
  );
}
