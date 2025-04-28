import apiClient from "../../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewsList() {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadNewsList() {
      try {
        const response = await apiClient.get("/api/mypage/news-list");
        const result = response.data;
        setNewsList(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadNewsList();
  }, []);

  return (
    <>
      {newsList.length === 0 ? (
        <p>아직 작성한 뉴스가 없어요.</p>
      ) : (
        newsList.map((news) => (
          <div
            className="border"
            key={news.newsId}
            onClick={() => navigate(`/news/${news.newsId}`)}
          >
            <div>
              <img src={news.image} alt="뉴스 이미지" />
            </div>
            <div>
              <div>
                <p>{news.nickname}</p>
                <p>{news.createAt}</p>
              </div>
              <div>{news.title}</div>
              <div>
                <span>좋아요 {news.likeCount}</span>
              </div>
            </div>
            <div>{news.categoryName}</div>
          </div>
        ))
      )}
    </>
  );
}
