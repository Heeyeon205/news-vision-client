import apiClient from "../../api/axios";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "sonner";
import { useStore } from "../../store/useUserStore";

export default function NewsLikeButton({
  newsId,
  isScrap,
  setIsScrap,
  scrapCount,
  setScrapCount,
}) {
  const logId = useStore((state) => state.userId);
  const handleClick = async () => {
    if (!logId) {
      toast.warning("로그인 후 이용 가능합니다.");
      return;
    }
    if (isScrap) {
      try {
        const res = await apiClient.delete(`/api/news/${newsId}/scrap`);
        setIsScrap(false);
        setScrapCount(scrapCount - 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await apiClient.post(`/api/news/${newsId}/scrap`);
        setIsScrap(true);
        setScrapCount(scrapCount + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 cursor-pointer"
    >
      {isScrap ? (
        <FaBookmark className="w-5 h-5 text-orange-500 transform transition-transform duration-300 hover:scale-110" /> // 찬 스크랩
      ) : (
        <FaRegBookmark className="w-5 h-5 text-gray-500 transform transition-transform duration-300 hover:scale-110" /> // 빈 스크랩
      )}

      <span
        className={`text-sm font-medium ${
          isScrap ? "text-orange-500" : "text-gray-500"
        } transition-colors duration-300`}
      ></span>
    </button>
  );
}
