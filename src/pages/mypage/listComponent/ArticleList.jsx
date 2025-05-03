import ErrorAlert from "../../../utils/ErrorAlert";
import apiClient from "../../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaRegComment } from "react-icons/fa";

export default function ArticleList({ userImg }) {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadArticleList() {
      try {
        const response = await apiClient.get("/api/mypage/board-list");
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        setArticles(result.data);
      } catch (error) {
        ErrorAlert(error);
      }
    }
    loadArticleList();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {articles.length === 0 ? (
        <p>아직 작성한 게시글이 없어요.</p>
      ) : (
        articles.map((article) => (
          <div
            key={article.boardId}
            onClick={() => navigate(`/board/${article.boardId}`)}
            className="bg-white rounded-lg shadow p-4 hover:scale-101 hover:shadow-lg transition-transform duration-300 cursor-pointer space-y-3"
          >
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <img
                src={userImg}
                alt="프로필"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold">{article.nickname}</span>
              {article.badge && (
                <img src={article.badge} alt="뱃지" className="w-4 h-4" />
              )}
              <span className="text-gray-400 ml-auto">{article.createAt}</span>
            </div>

            <div className="text-sm text-gray-800 line-clamp-3">
              {article.content}
            </div>

            {article.image && (
              <img
                src={article.image}
                className="w-full max-h-72 object-cover rounded"
              />
            )}

            <div className="flex text-sm text-gray-600 gap-2">
              <FaRegHeart className="w-5 h-5 text-red-500" />
              <span>{article.likeCount}</span>
              <FaRegComment className="w-5 h-5 text-gray-500 ml-4" />
              <span>{article.commentCount}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
