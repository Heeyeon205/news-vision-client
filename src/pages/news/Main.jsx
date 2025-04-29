import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { formatDate } from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import NewsCreateButton from "./NewsCreateButton";
import { useStore } from "../../store/useUserStore";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function Main() {
  const logRole = useStore((state) => state.role);
  const [auth, setAuth] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (logRole === "ROLE_ADMIN" || logRole === "ROLE_CREATOR") {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [logRole]);

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
      {auth && <NewsCreateButton />}
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
                <img
                  src={news.image}
                  alt="뉴스 썸네일"
                  width="600"
                  height="350"
                ></img>
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
