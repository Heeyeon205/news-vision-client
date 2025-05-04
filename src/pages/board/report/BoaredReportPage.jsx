import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/axios';
import { toast } from 'sonner';

export default function BoaredReportPage({ boardId, onClose }) {
  // const { boardId } = useParams(); // 이제 prop으로 받음
  // const navigate = useNavigate(); // 모달에서는 navigate 대신 onClose 사용

  const handleSubmit = async () => {
    try {
      await apiClient.post(`/api/reports/boards/${boardId}`);
      toast.success('게시글 신고 접수완료');
      onClose(); // 신고 완료 후 모달 닫기
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    onClose(); // 취소 시 모달 닫기
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full   flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <p className="text-lg font-semibold mb-4">해당 게시글을 신고할까요?</p>
        <p className="text-gray-700 mb-4">
          신고된 게시글은 운영 정책에 따라 삭제되거나 이용이 제한될 수 있어요
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
