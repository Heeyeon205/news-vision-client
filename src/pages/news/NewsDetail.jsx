import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";
import NewsLikeButton from "./NewsLikeButton";
import ScrapButton from "./ScrapButton";
import DropDownMenu from "./DropDownMenu";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [newsId, setNewsId] = useState();
  const [userId, setUserId] = useState();

  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [isScrap, setIsScrap] = useState(false);
  const [scrapCount, setScrapCount] = useState(0);

  useEffect(() => {
    const loadNewsDetail = async () => {
      try {
        const response = await apiClient.get(`/api/news/${id}`);
        const result = response.data;
        setNews(result.data);
        setIsLike(result.data.liked);
        setNewsId(result.data.id);
        setLikeCount(result.data.likeCount);
        setUserId(result.data.userId);
      } catch (error) {
        ErrorAlert(error);
      }
    };
    loadNewsDetail();
  }, [id]);

  return !news ? (
    <p>뉴스 불러오는 중....</p>
  ) : (
    <div className="flex flex-col items-center">
      <p>{news.category}</p>
      <DropDownMenu newsId={newsId} userId={userId} />
      <img src={news.image} alt="뉴스 썸네일" width="600" height="350" />
      <p>{news.title}</p>
      <span>{news.createdAt}</span>
      <span> 좋아요 {likeCount}</span>
      <span> 조회수 {news.view}</span>
      <img src={news.profileImage} alt="유저 프로필" />
      <img src={news.authorBadgeIcon} alt="유저 뱃지" />
      <p>{news.authorNickname}</p>
      <p>{news.content}</p>
      <NewsLikeButton
        newsId={newsId}
        isLike={isLike}
        setIsLike={setIsLike}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
      />
      <ScrapButton
        newsId={newsId}
        isScrap={isScrap}
        setIsScrap={setIsScrap}
        scrapCount={scrapCount}
        setScrapCount={setScrapCount}
      />
    </div>
  );
}
