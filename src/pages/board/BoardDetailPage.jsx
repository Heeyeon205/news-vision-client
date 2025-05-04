import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { useStore } from "../../store/useUserStore";
import CommentBox from "./CommentBox";
import BoardDropDownButton from "./BoardDropDownButton";
import CommentDropDownButton from "./CommentDropDownButton";
import BoardLikeButton from "./BoardLikeButton";
import { FaRegComment } from "react-icons/fa";
import FollowButton from "../../utils/FollowButton";
import BoardReportPage from "./report/BoaredReportPage";
import CommentReportPage from "./report/CommentReportPage";

export default function BoardDetailPage() {
  const logId = useStore((state) => state.userId);
  const logNickname = useStore((state) => state.nickname);
  const logProfile = useStore((state) => state.image);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState("");
  const [userId, setUserId] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [view, setView] = useState(0);
  const [isFollow, setIsFollow] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isCommentReportModalOpen, setIsCommentReportModalOpen] =
    useState(false);
  const [reportTargetCommentId, setReportTargetCommentId] = useState(null);
  const own = logId === userId;

  const loadData = async () => {
    try {
      const response = await apiClient.get(`/api/board/${id}`);
      const result = response.data;
      setData(result.data);
      setUserId(result.data.userId);
      setIsLike(result.data.like);
      setLikeCount(result.data.likeCount);
      setCommentCount(result.data.commentCount);
      setView(result.data.view);
      setIsFollow(result.data.followed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    loadData();
  }, []);

  const openBoardReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeBoardReportModal = () => {
    setIsReportModalOpen(false);
  };

  const openCommentReportModal = (commentId) => {
    setReportTargetCommentId(commentId);
    setIsCommentReportModalOpen(true);
  };

  const closeCommentReportModal = () => {
    setReportTargetCommentId(null);
    setIsCommentReportModalOpen(false);
  };

  return !data ? (
    <p className="text-center py-10 text-gray-500">커뮤니티 불러오는 중...</p>
  ) : (
    <div className="max-w-xl mx-auto p-4">
      <div className="border-b-2 pb-6 border-orange-500">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start gap-3">
            <img
              src={data.userImage}
              alt="프로필"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p
                className="font-semibold text-sm cursor-pointer"
                onClick={() => {
                  own
                    ? navigate("/user/mypage")
                    : navigate(`/userPage/${userId}`);
                }}
              >
                {data.nickname}
              </p>
              <p className="text-xs text-gray-400">{data.createdAt}</p>
            </div>
            <FollowButton targetId={userId} followed={isFollow} />
          </div>
          <BoardDropDownButton
            boardId={id}
            userId={userId}
            onReportClick={openBoardReportModal}
          />{" "}
        </div>
        <div className="text-sm break-words text-gray-800 whitespace-pre-line leading-relaxed mb-3">
          {data.content}
        </div>

        {data.image && (
          <div className="w-full flex justify-center mb-4">
            <div className="max-w-[600px] max-h-[350px]">
              <img
                src={data.image}
                alt="게시글 이미지"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-6 text-sm text-gray-600 mt-2">
          <BoardLikeButton
            boardId={id}
            isLike={isLike}
            setIsLike={setIsLike}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
          />
          <div className="flex items-center gap-1">
            <FaRegComment className="w-5 h-5 text-gray-500" />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3">답글 {commentCount}</h3>
        {data.comments.length === 0 ? (
          <p className="text-sm text-gray-400">댓글이 없습니다.</p>
        ) : (
          data.comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3 mb-4">
              <img
                src={comment.image}
                alt="프로필"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{comment.nickname}</p>
                  <CommentDropDownButton
                    userId={comment.userId}
                    commentId={comment.id}
                    onCommentDelete={loadData}
                    onReportClick={openCommentReportModal}
                  />
                </div>
                <p className="text-xs text-gray-400">{comment.createdAt}</p>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {logNickname && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-full flex items-center px-4 py-2">
          <CommentBox
            logProfile={logProfile}
            logNickname={logNickname}
            boardId={id}
            onCommentSubmit={loadData}
          />
        </div>
      )}

      {isReportModalOpen && (
        <BoardReportPage boardId={id} onClose={closeBoardReportModal} />
      )}

      {isCommentReportModalOpen && (
        <CommentReportPage
          commentId={reportTargetCommentId}
          onClose={closeCommentReportModal}
        />
      )}
    </div>
  );
}
