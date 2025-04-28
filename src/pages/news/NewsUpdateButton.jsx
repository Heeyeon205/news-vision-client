import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewsUpdateButton({
  newsId,
  title,
  content,
  categoryId,
}) {
  const navigate = useNavigate();
  const formData = new FormData();
  formData.append("newsId", newsId);
  formData.append("title", title);
  formData.append("content", content);
  formData.append("categoryId", categoryId);

  const handleClick = async () => {
    try {
      const response = await apiClient.put(`/api/news/${newsId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = response.data;
      toast.success("뉴스 수정 완료!");
      navigate(`/news/${newsId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="border" onClick={handleClick}>
      수정
    </button>
  );
}
