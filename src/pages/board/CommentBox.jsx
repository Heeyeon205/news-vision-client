import apiClient from "../../api/axios";
import { useState } from "react";
import { toast } from "sonner";

export default function CommentBox({
  logProfile,
  logNickname,
  boardId,
  onCommentSubmit,
}) {
  const [content, setContent] = useState();

  const handleClick = async () => {
    try {
      const res = await apiClient.post(`/api/comments/boards/${boardId}`, {
        content,
      });
      console.log(res.data);
      setContent("");
      toast.success("댓글 작성 완료!");
      onCommentSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="writeBox">
      <img
        src={logProfile}
        alt="프로필 이미지"
        width="40px"
        height="40px"
      ></img>
      <p>{logNickname}</p>
      <input
        type="text"
        className="border"
        value={content || ""}
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <button className="border" onClick={handleClick}>
        등록
      </button>
    </div>
  );
}
