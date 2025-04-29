import apiClient from "../../api/axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function NewsLikeButton({
  newsId,
  isLike,
  setIsLike,
  likeCount,
  setLikeCount,
}) {



  const handleClick = async () => {
    if (isLike) {
      try {
        const response = await apiClient.delete(`/api/news/${newsId}/like`);
        setIsLike(false);
        setLikeCount(likeCount - 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await apiClient.post(`/api/news/${newsId}/like`);
        setIsLike(true);
        setLikeCount(likeCount + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button onClick={handleClick} className="px-1 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 cursor-pointer">

      {isLike ? (
        <FaHeart className="w-5 h-5 text-red-500 transform transition-transform duration-300 hover:scale-110" /> // 찬 하트, 빨간색
      ) : (
        <FaRegHeart className="w-5 h-5 text-gray-500 transform transition-transform duration-300 hover:scale-110" /> // 빈 하트
      )}
      <span
        className={`text-sm font-medium ${isLike ? "text-red-500" : "text-gray-500"
          } transition-colors duration-300`}
      >
      </span>


    </button>
  );
}
