import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NewsLikeButton({
  newsId,
  isLike,
  setIsLike,
  likeCount,
  setLikeCount,
}) {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setText(isLike ? "좋아요 취소" : "좋아요");
  }, [isLike]);

  const handleClick = async () => {
    if (isLike) {
      try {
        const response = await apiClient.delete(`/api/news/${newsId}/like`);
        const result = response.data;
        if (!result.success) {
          alert("로그인 후 이용해 주세요");
          navigate("/");

          ("");
          return;
        }
        setIsLike(false);
        setLikeCount(likeCount - 1);
      } catch (error) {
        ErrorAlert(error);
        navigate("/");
      }
    } else {
      try {
        const response = await apiClient.post(`/api/news/${newsId}/like`);
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        setIsLike(true);
        setLikeCount(likeCount + 1);
      } catch {
        ErrorAlert();
      }
    }
  };

  return (
    <button onClick={handleClick} className="border rounded">
      {text}
    </button>
  );
}
