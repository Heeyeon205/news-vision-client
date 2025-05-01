import { useState, useEffect } from "react";
import apiClient from "../../api/axios";
import { formatDate } from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import BoardCreateButton from "./BoardCreateButton";
import BoardCreatePage from "./BoardCreatePage";
import { useStore } from "../../store/useUserStore";

export default function BoardMainPage() {
  const userId = useStore((state) => state.userId);
  const userImage = useStore((state) => state.image);
  const nickname = useStore((state) => state.nickname);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiClient.get("/api/board");
        const result = response.data;
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm text-gray-500">{formatDate}</h4>
      </div>

      {userId && (
        <div
          className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 mb-5 hover:bg-gray-50 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img
            src={userImage}
            alt="프로필"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-gray-500 text-sm">
            {nickname}님의 생각을 나누며 지식을 넓혀보세요.
          </span>
        </div>
      )}

      <hr className="mb-4" />

      {data.length === 0 ? (
        <p className="text-center text-gray-400">
          커뮤니티에 아티클이 없습니다.
        </p>
      ) : (
        data.map((board) => (
          <div
            key={board.boardId}
            className="mb-6 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer bg-white rounded-lg shadow hover:scale-101 hover:shadow-lg transition-transform duration-300 cursor-pointer"
            onClick={() => navigate(`/board/${board.boardId}`)}
          >
            <div className="flex items-start gap-3 mb-2">
              <img
                src={board.userImage}
                alt="프로필"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">{board.nickname}</p>
                <p className="text-xs text-gray-400">{board.createAt}</p>
              </div>
            </div>

            <p className="text-sm text-gray-800 whitespace-pre-line mb-3">
              {board.content}
            </p>
            {board.image && (
              <img
                src={board.image}
                alt="게시글 이미지"
                className="w-full rounded-md mb-3 object-cover"
              />
            )}

            <div className="flex text-sm text-gray-600 gap-4">
              <span>👍 좋아요 {board.likeCount}</span>
              <span>💬 댓글 {board.commentCount}</span>
            </div>
          </div>
        ))
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <BoardCreatePage />
          </div>
        </div>
      )}
    </div>
  );
}
