import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import NewsLikeButton from "./NewsLikeButton";
import ScrapButton from "./ScrapButton";
import DropDownMenu from "./DropDownMenu";
import FollowButton from "../../utils/FollowButton";
import { useGlobalStore } from "../../store/useGlobalStore";
import { useStore } from "../../store/useUserStore";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [newsId, setNewsId] = useState();
  const [userId, setUserId] = useState();
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isScrap, setIsScrap] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const setLoading = useGlobalStore((state) => state.setLoading);
  const logId = useStore((state) => state.userId);
  const navigate = useNavigate();
  const own = logId === userId;

  useEffect(() => {
    setLoading(true);
    const loadNewsDetail = async () => {
      try {
        const response = await apiClient.get(`/api/news/${id}`);
        const result = response.data;
        setNews(result.data);
        setUserId(result.data.userId);
        setNewsId(result.data.id);
        setIsLike(result.data.liked);
        setLikeCount(result.data.likeCount);
        setIsScrap(result.data.scraped);
        setIsFollow(result.data.followed);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadNewsDetail();
  }, [id]);

  return !news ? (
    <p>뉴스 불러오는 중....</p>
  ) : (
    <div className="p-4 max-w-[600px] w-full mx-auto shadow-lg mt-5 mb-6">
      <img src={news.image} alt="뉴스 썸네일" width="600" height="350" />
      <div className="flex justify-between items-center my-2">
        <p className="bg-gray-100 text-sm text-balck-500 rounded-xl px-3 py-1">
          {news.category}
        </p>
        <DropDownMenu newsId={newsId} userId={userId} />
      </div>
      <p className="text-2xl font-bold mb-2">{news.title}</p>
      <div className="flex items-center text-sm text-gray-400 mt-2 space-x-4">
        <span>{news.createdAt}</span>
        <span> 읽음 {news.view}</span>
      </div>
      <div className="mt-7 flex">
        <div className="flex-shrink-0 w-10 h-10 mr-2">
          <img
            src={news.profileImage}
            alt="유저 프로필"
            className="rounded-full"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center">
            <span
              className="font-medium text-gray-800 mr-1 cursor-pointer"
              onClick={() => {
                own
                  ? navigate("/user/mypage")
                  : navigate(`/userPage/${userId}`);
              }}
            >
              {news.nickname}
            </span>
            <img src={news.icon} alt="유저 뱃지" className="w-5 h-5" />
          </div>
          {news.badgeTitle && (
            <span className="mx-0.5 text-xs text-gray-500">
              {news.badgeTitle}
            </span>
          )}
        </div>
        <FollowButton targetId={userId} followed={isFollow} />
      </div>
      <div className="mt-4 border-b border-gray-300"></div>
      <div className="mt-6 text-gray-700 text-lg leading-relaxed font-noto-sans">
        <p className="whitespace-pre-line tracking-normal break-words">
          {news.content}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2 ">
          <NewsLikeButton
            newsId={newsId}
            isLike={isLike}
            setIsLike={setIsLike}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
          />
        </div>
        <ScrapButton
          newsId={newsId}
          isScrap={isScrap}
          setIsScrap={setIsScrap}
        />
      </div>
    </div>
  );
}
