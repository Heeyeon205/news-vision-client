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
    <div class="p-4 max-w-[600px] w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold mb-2">{formatDate}</h4>
        {auth && <NewsCreateButton />}
      </div>
      {newsList.length === 0 ? (
        <p>뉴스가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="rounded overflow-hidden cursor-pointer shadow-md hover:scale-101 hover:shadow-lg transition-transform duration-300"
              onClick={() => navigate(`/news/${news.id}`)}
            >
              <div className="w-full h-full object-cover">
                <img
                  src={news.image}
                  alt="뉴스 썸네일"
                  width="600"
                  height="350"
                ></img>
              </div>
              <div className="p-2">
                <p className="inline-block bg-gray-100 text-sm text-black rounded-xl px-3 py-0.5 w-fit">
                  {news.category}
                </p>
                <h4 className="text-lg font-bold mb-1">{news.title}</h4>
                <div className="flex items-center text-sm text-gray-400 space-x-2">
                  <span classname="mr-2">{news.author}</span>
                  <span>{news.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
