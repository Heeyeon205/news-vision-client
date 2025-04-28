import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/axios";

export default function BoardDetailPage() {
  const { id } = useParams();
  console.log("파라미터로 넘어온 보드 아이디:", id);
  const [data, setData] = useState("");
  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        const response = await apiClient.get(`/api/board/${id}`);
        const result = response.data;
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [id]);

  return !data ? (
    <p>커뮤니티 불러오는 중....</p>
  ) : (
    <div className="boardContainer">
      <div className="boardBox">
        <img src={data.userImage} alt="프로필 이미지"></img>
        <p>{data.nickname}</p>
        <p>{data.createAt}</p>
        <button>팔로우</button>
        <p>{data.content}</p>
        <p>좋아요 {data.likeCount}</p>
        <p>댓글 {data.commentCount}</p>
        <hr />
        <h3>답글 {data.commentCount}</h3>
      </div>
      <div className="commentBox">
        <img src={data.userImage} alt="프로필 이미지"></img>
        <p>{data.nickname}</p>
        <p>{data.createAt}</p>
        <button>팔로우</button>
        <p>{data.content}</p>
      </div>
    </div>
  );
}
