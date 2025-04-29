import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/axios";
import { useStore } from "../../store/useUserStore";
import CommentBox from "./CommentBox";
import BoardDropDownButton from "./BoardDropDownButton";
import CommentDropDownButton from "./CommentDropDownButton";

export default function BoardDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const logNickname = useStore((state) => state.nickname);
  const logProfile = useStore((state) => state.image);
  const [userId, setUserId] = useState("");

  const loadData = async () => {
    try {
      const response = await apiClient.get(`/api/board/${id}`);
      const result = response.data;
      setData(result.data);
      setUserId(result.data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    loadData();
  }, []);

  return !data ? (
    <p>커뮤니티 불러오는 중....</p>
  ) : (
    <div className="boardContainer flex flex-col items-center">
      <div className="boardBox">
        <BoardDropDownButton boardId={id} userId={userId} />
        <img
          src={data.userImage}
          alt="프로필 이미지"
          width="64px"
          height="64px"
        ></img>
        <p>{data.nickname}</p>
        <p>{data.createdAt}</p>
        <button className="border">팔로우</button>
        {data.image && <img src={data.image} alt="커뮤니티 이미지"></img>}
        <p>{data.content}</p>
        <button className="border">좋아요</button>
        <p>좋아요 {data.likeCount}</p>
        <p>댓글 {data.commentCount}</p>
        <hr />
        <h3>답글 {data.commentCount}</h3>
      </div>
      {data.comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        data.comments.map((comment) => (
          <div className="commentBox" key={comment.id}>
            <img
              src={comment.image}
              alt="프로필 이미지"
              width="40px"
              height="40px"
            ></img>
            <p>{comment.nickname}</p>
            <p>{comment.createdAt}</p>
            <button>팔로우</button>
            <p>{comment.content}</p>
            <CommentDropDownButton
              userId={userId}
              commentId={comment.id}
              onCommentDelete={loadData}
            />
          </div>
        ))
      )}

      <hr />

      {logNickname && (
        <CommentBox
          logProfile={logProfile}
          logNickname={logNickname}
          boardId={id}
          onCommentSubmit={loadData}
        />
      )}
    </div>
  );
}
