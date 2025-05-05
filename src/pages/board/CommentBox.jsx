import apiClient from "../../api/axios";
import { useState } from "react";
import { toast } from "sonner";

export default function CommentBox({
  logProfile,
  logNickname,
  boardId,
  onCommentSubmit,
}) {
  const [content, setContent] = useState("");

  const handleClick = async () => {
    if (content === "") return;
    if (content.length > 100) {
      toast.warning("댓글이 너무 깁니다. 최대 100자까지 작성할 수 있습니다.");
    }
    try {
      await apiClient.post(`/api/comments/boards/${boardId}`, {
        content,
      });
      setContent("");
      toast.success("댓글 작성 완료!");
      onCommentSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex items-center gap-2 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      <img
        src={logProfile}
        alt="프로필 이미지"
        className="w-8 h-8 rounded-full object-cover"
      />
      <p className="text-sm font-medium text-gray-700">{logNickname}</p>
      <input
        type="text"
        value={content}
        onChange={(e) => {
          const trimmed = e.target.value.slice(0, 100);
          setContent(trimmed);
        }}
        placeholder="댓글을 입력하세요"
        className="flex-1 break-words break-all text-sm px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      {content.length > 0 && (
        <button
          type="submit"
          className="text-sm px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-full cursor-pointer"
        >
          등록
        </button>
      )}
    </form>
  );
}
