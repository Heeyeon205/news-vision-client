import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../api/axios";
import { useStore } from "../../store/useUserStore";
import { toast } from "sonner";
import ConfirmModal from "../../utils/ConfirmModal"; // ✅ import 추가

export default function BoardDropDownButton({
  userId,
  commentId,
  onCommentDelete,
  onReportClick,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const [own, setOwn] = useState(false);
  const logId = useStore((state) => state.userId);
  const [isLog, setLog] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // ✅ 모달 상태

  useEffect(() => {
    setOwn(logId === userId);
    setLog(!!logId);
  }, [logId, userId]);

  const handleClick = () => setOpen(!open);

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/comments/${commentId}`);
      toast.success("댓글 삭제 완료!");
      onCommentDelete();
    } catch (error) {
      console.log(error);
    } finally {
      setShowConfirm(false); // ✅ 모달 닫기
    }
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
    isLog && (
      <div className="relative inline-block" ref={menuRef}>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          onClick={handleClick}
          className="cursor-pointer"
        />

        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {own ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                댓글 삭제
              </button>
            ) : (
              <button
                onClick={() => onReportClick(commentId)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                신고하기
              </button>
            )}
          </div>
        )}

        {/* ✅ ConfirmModal 추가 */}
        <ConfirmModal
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleDelete}
          title="댓글 삭제"
          description="댓글을 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
        />
      </div>
    )
  );
}
