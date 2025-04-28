import { useEffect, useState } from "react";
import ErrorAlert from "../../utils/ErrorAlert";
import apiClient from "../../api/axios";
import { formatDate } from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import NewsCreateButton from "./NewsCreateButton";

export default function Main() {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await apiClient.get("/api/news/main");
        const result = response.data;
        setNewsList(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadNews();
  }, []);

  return (
    <div>
      <h4>{formatDate}</h4>
      <NewsCreateButton />
      {newsList.length === 0 ? (
        <p>뉴스가 없습니다.</p>
      ) : (
        <div className="newsContainer">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="newsBox border rounded"
              onClick={() => navigate(`/news/${news.id}`)}
            >
              <div className="newsImage">
                <img src={news.image} alt="뉴스 썸네일"></img>
              </div>
              <div className="newsContent">
                <p>{news.category}</p>
                <h4>{news.title}</h4>
                <span>{news.author}</span>
                <span>{news.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
