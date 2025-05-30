import { useNavigate } from "react-router-dom";

export default function BoardReportButton({ commentId }) {
  const navigate = useNavigate();
  const handleReport = () => {
    console.log("지금 신고하려는 댓글 아이디: ", commentId);
    navigate(`/comment/report/${commentId}`);
  };

  return (
    <button
      onClick={handleReport}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      신고하기
    </button>
  );
}
