import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";
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
        const result = response.data;
        if (!result.success) {
          alert("로그인 후 이용해 주세요");
          return;
        }
        setIsScrap(false);
        setScrapCount(scrapCount - 1);
      } catch (error) {
        ErrorAlert(error);
      }
    } else {
      try {
        const response = await apiClient.post(`/api/news/${newsId}/scrap`);
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        setIsScrap(true);
        setScrapCount(scrapCount + 1);
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
