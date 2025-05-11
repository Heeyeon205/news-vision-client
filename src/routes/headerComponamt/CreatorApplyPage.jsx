import { useState } from "react";
import { toast } from "sonner";

export default function CreatorApplyPage({ setIsOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleApplyClick = () => {
    setIsOpen(false);
    toast.info("현재 준비 중인 기능입니다. 빠른 시일 내에 업데이트할게요!", {
      duration: 3000,
    });
    return;
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="w-full py-3 text-sm hover:bg-gray-100 transition"
      >
        크리에이터 신청
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex bg-black/40 justify-center items-center z-20">
          <div className="bg-white p-6 rounded-md shadow-lg min-h-[300px] w-80 flex flex-col justify-between">
            <div>
              <p className="text-lg font-semibold mb-10">
                크리에이터로 신청할까요?
              </p>
              <p className="text-gray-700 mb-4">
                자유로운 주제로 아티클을 작성해 해당 폼으로 제출해 주세요.
                신청하신 내용은 운영팀의 검토를 거쳐 승인되며, 승인 후 뉴션에서
                크리에이터로 활동하실 수 있습니다.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
              >
                취소
              </button>
              <button
                onClick={handleApplyClick}
                className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded focus:outline-none"
              >
                신청하러 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
