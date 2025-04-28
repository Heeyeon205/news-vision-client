import apiClient from "../../api/axios";
import { useState, useEffect } from "react";

export default function NewsLikeButton({
  newsId,
  isScrap,
  setIsScrap,
  scrapCount,
  setScrapCount,
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(isScrap ? "스크랩 취소" : "스크랩");
  }, [isScrap]);

  const handleClick = async () => {
    if (isScrap) {
      try {
        const response = await apiClient.delete(`/api/news/${newsId}/scrap`);
        setIsScrap(false);
        setScrapCount(scrapCount - 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await apiClient.post(`/api/news/${newsId}/scrap`);
        setIsScrap(true);
        setScrapCount(scrapCount + 1);
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
