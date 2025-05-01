import apiClient from "../../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewsList({ userId }) {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadNewsList() {
      try {
        const response = await apiClient.get(
          `/api/mypage/news-list/${userId}}`
        );
        const result = response.data;
        setNewsList(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadNewsList();
  }, [userId]);

  return (
    <div className="flex flex-col space-y-4">
      {newsList.length === 0 ? (
        <p>아직 작성한 뉴스가 없어요.</p>
      ) : (
        newsList.map((news) => (
          <div
            key={news.newsId}
            onClick={() => navigate(`/news/${news.newsId}`)}
            className="bg-white rounded-lg shadow p-4 hover:scale-101 hover:shadow-lg transition-transform duration-300 cursor-pointer "
          >
            {/* 뉴스 이미지 */}
            <img
              src={news.image}
              alt="뉴스 이미지"
              className="w-full h-48 object-cover rounded mb-4"
            />
            {/* 카테고리 */}
            <div className="text-sm text-orange-500 font-semibold">
              {news.categoryName}
            </div>
            {/* 제목 */}
            <h3 className="font-bold text-lg mt-1">{news.title}</h3>
            {/* 작성자 / 작성시간 */}
            <div className="text-gray-400 text-xs mt-1">
              {news.nickname} · {news.createAt}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
