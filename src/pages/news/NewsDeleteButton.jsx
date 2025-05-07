import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { toast } from "sonner";
import { useState } from "react";
import ConfirmModal from "../../utils/ConfirmModal";

export default function NewsDeleteButton({ newsId }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/news/${newsId}`);
      toast.success("뉴스 삭제 완료");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
        onClick={() => setShowConfirm(true)}
      >
        삭제
      </button>

      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="뉴스 삭제"
        description="해당 뉴스를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
}
