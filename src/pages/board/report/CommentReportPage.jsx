import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../api/axios";
import { toast } from "sonner";

export default function BoardReportPage() {
  const { commentId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await apiClient.post(`/api/reports/comments/${commentId}`);
      console.log("지금 신고접수한 댓글 아이디: ", commentId);
      toast.success("댓글 신고 접수완료");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <p>해당 댓글을 신고할까요?</p>
      <p>신고된 댓글은 운영 정책에 따라 삭제되거나 이용이 제한될 수 있어요</p>
      <button onClick={handleCancel}>취소</button>
      <button onClick={handleSubmit}>확인</button>
    </div>
  );
}
