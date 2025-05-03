import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { useEffect, useState } from "react";
import { useStore } from "../../store/useUserStore";
import { toast } from "sonner";

export default function InfoPage() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const logId = useStore((state) => state.userId);

  const handleClick = async () => {
    if (!logId) {
      toast.warning("로그인 후 이용 가능합니다.");
      return;
    }
    try {
      await apiClient.get("/api/auth/check");
      navigate("/gpt-news");
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!isModalVisible) {
      navigate("/");
    }
  }, [isModalVisible]);

  return (
    <div>
      {isModalVisible && (
        <div
          id="modal"
          className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white w-80 h-auto p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="text-center">
              <p className="absolute top-3 left-3 text-sm text-left mb-6 font-bold">
                NEWSION
              </p>
              <h3 className="text-lg font-bold mt-10">시간 없으신가요?</h3>
              <h3 className="text-lg font-bold mb-4">오늘 딱 이것만 보세요!</h3>
              <p className="text-sm text-gray-500 mb-6">
                매일 업데이트되는 주요 뉴스 브리핑
              </p>
              <button
                onClick={handleClick}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-orange-400 focus:outline-none cursor-pointer"
              >
                지금 시작하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
