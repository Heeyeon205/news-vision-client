import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { toast } from "sonner";
import ConfirmModal from "../../utils/ConfirmModal";
import { useState } from "react";

export default function BoardDeleteButton({ boardId }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/board/${boardId}`);
      toast.success("게시글 삭제 완료");
      navigate("/board");
    } catch (error) {
      toast.error("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsModalOpen(false); // 성공/실패 관계없이 모달 닫기
    }
  };

  return (
    <>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => setIsModalOpen(true)}
      >
        삭제
      </button>

      <ConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} // ❗취소 시 닫기
        onConfirm={handleDelete}
        title="게시글 삭제"
        description="정말로 이 게시글을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
}
