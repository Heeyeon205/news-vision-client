import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/axios";
import { useStore } from "../../store/useUserStore";

export default function BoardDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const logNickname = useStore((state) => state.nickname);
  const logProfile = useStore((state) => state.image);
  console.log("logNickname: ", logNickname);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        const response = await apiClient.get(`/api/board/${id}`);
        const result = response.data;
        console.log(result.data);
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
        <img
          src={data.userImage}
          alt="프로필 이미지"
          width="64px"
          height="64px"
        ></img>
        <p>{data.nickname}</p>
        <p>{data.createAt}</p>
        <button className="border">팔로우</button>
        {data.img && <img src={data.image} alt="커뮤니티 이미지"></img>}
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
        <div className="commentBox">
          <img
            src={data.comments.image}
            alt="프로필 이미지"
            width="40px"
            height="40px"
          ></img>
          <p>{data.comments.nickname}</p>
          <p>{data.comments.createAt}</p>
          <button>팔로우</button>
          <p>{data.comments.content}</p>
        </div>
      )}

      <hr />

      {logNickname && (
        <div className="writeBox">
          <img
            src={logProfile}
            alt="프로필 이미지"
            width="40px"
            height="40px"
          ></img>
          <p>{logNickname}</p>
          <input type="text" className="border "></input>
          <button className="border">등록</button>
        </div>
      )}
    </div>
  );
}
