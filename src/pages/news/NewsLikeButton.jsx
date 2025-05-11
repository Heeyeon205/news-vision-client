import apiClient from "../../api/axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useStore } from "../../store/useUserStore";
import { toast } from "sonner";

export default function NewsLikeButton({
  newsId,
  isLike,
  setIsLike,
  likeCount,
  setLikeCount,
}) {
  const logId = useStore((state) => state.userId);
  const handleClick = async () => {
    if (!logId) {
      toast.warning("로그인 후 이용 가능합니다.");
      return;
    }
    if (isLike) {
      try {
        const res = await apiClient.delete(`/api/news/${newsId}/like`);
        const result = res.data;
        setIsLike(result.data.like);
        setLikeCount(result.data.likeCount);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await apiClient.post(`/api/news/${newsId}/like`);
        const result = res.data;
        setIsLike(result.data.like);
        setLikeCount(result.data.likeCount);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-1 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 cursor-pointer"
    >
      {isLike ? (
        <FaHeart className="w-5 h-5 text-red-500 transform transition-transform duration-300 hover:scale-110" />
      ) : (
        <FaRegHeart className="w-5 h-5 text-gray-500 transform transition-transform duration-300 hover:scale-110" />
      )}
      <span
        className={`text-sm font-medium ${
          isLike ? "text-red-500" : "text-gray-500"
        } transition-colors duration-300`}
      >
        {likeCount}
      </span>
    </button>
  );
}
