import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../api/axios";
import { useStore } from "../../store/useUserStore";
import { toast } from "sonner";

export default function BoardDropDownButton({
  userId,
  commentId,
  onCommentDelete,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const [own, setOwn] = useState(false);
  const logId = useStore((state) => state.userId);

  useEffect(() => {
    if (logId === userId) {
      setOwn(true);
    } else {
      setOwn(false);
    }
  }, [logId, userId]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    const check = confirm("댓글을 삭제하시겠습니까?");
    if (confirm) {
      try {
        const res = await apiClient.delete(`/api/comments/${commentId}`);
        toast.success("댓글 삭제 완료!");
        onCommentDelete();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReport = () => {
    alert("너 신고, 개발 예정");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        onClick={handleClick}
        className="cursor-pointer"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {own ? (
            <>
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                댓글 삭제
              </button>
            </>
          ) : (
            <button
              onClick={handleReport}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              댓글 신고하기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
