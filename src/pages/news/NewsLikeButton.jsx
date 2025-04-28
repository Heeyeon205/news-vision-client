import apiClient from "../../api/axios";
import { useState, useEffect } from "react";

export default function NewsLikeButton({
  newsId,
  isLike,
  setIsLike,
  likeCount,
  setLikeCount,
}) {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(isLike ? "좋아요 취소" : "좋아요");
  }, [isLike]);

  const handleClick = async () => {
    if (isLike) {
      try {
        const response = await apiClient.delete(`/api/news/${newsId}/like`);
        setIsLike(false);
        setLikeCount(likeCount - 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await apiClient.post(`/api/news/${newsId}/like`);
        setIsLike(true);
        setLikeCount(likeCount + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button onClick={handleClick} className="border rounded">
      {text}
    </button>
  );
}
