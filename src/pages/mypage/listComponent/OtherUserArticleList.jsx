import ErrorAlert from "../../../utils/ErrorAlert";
import apiClient from "../../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ArticleList({ userImg, userId }) {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadArticleList() {
      try {
        const response = await apiClient.get(
          `/api/mypage/board-list/${userId}`
        );
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
  }, [userId]);

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
            {/* 작성자 정보 */}
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

            {/* 본문 내용 */}
            <div className="text-sm text-gray-800 line-clamp-3">
              {article.content}
            </div>

            {/* 게시글 이미지 (있을 때만) */}
            {article.image && (
              <img
                src={article.image}
                className="w-full max-h-72 object-cover rounded"
              />
            )}

            {/* 좋아요, 댓글 */}
            <div className="flex gap-6 text-sm text-gray-500 pt-2 border-t">
              <span>❤️ 좋아요 {article.likeCount}</span>
              <span>💬 댓글 {article.commentCount}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
