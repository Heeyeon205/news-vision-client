import apiClient from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { useInfiniteScroll } from "../../../utils/useInfiniteScroll";

export default function ArticleList({ userImg }) {
  const navigate = useNavigate();

  const { data, isLoading, hasMore, reset } = useInfiniteScroll(
    async (page, size) => {
      let url = `/api/mypage/board-list?page=${page}&size=${size}`;
      const response = await apiClient.get(url);
      return response.data.data.content;
    },
    10,
    "boardId"
  );

  return (
    <div className="flex flex-col space-y-4">
      {data.length === 0 ? (
        <p>아직 작성한 게시글이 없어요.</p>
      ) : (
        data.map((article) => (
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

      {isLoading && <p className="text-center text-gray-400">로딩 중...</p>}

      {!hasMore && data.length > 0 && (
        <p className="text-center text-gray-400 mt-4">
          더 이상 게시글이 없습니다.
        </p>
      )}
    </div>
  );
}
