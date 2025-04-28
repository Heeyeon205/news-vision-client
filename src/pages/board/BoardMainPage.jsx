import { useState, useEffect } from "react";
import apiClient from "../../api/axios";
import { formatDate } from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";

export default function BoardMainPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
    <div className="boardContainer">
      <h4>{formatDate}</h4>
      <button>글쓰기</button>
      <hr />
      {data.length === 0 ? (
        <p>커뮤니티에 아티클이 없습니다.</p>
      ) : (
        data.map((board) => (
          <div
            key={board.boardId}
            className="boardBox"
            onClick={() => navigate(`/board/${board.boardId}`)}
          >
            <img
              src={board.userImage}
              alt="프로필 이미지"
              width="64px"
              height="64px"
            />
            <p>{board.nickname}</p>
            <p>{board.createAt}</p>
            <button>팔로우</button>
            <img src={board.image} alt="게시판 이미지" />
            <p>{board.content}</p>
            <p>좋아요 {board.likeCount}</p>
            <p>댓글 {board.commentCount}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
