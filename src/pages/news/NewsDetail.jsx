import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";
import NewsLikeButton from "./NewsLikeButton";
import ScrapButton from "./ScrapButton";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [newsId, setNewsId] = useState(0);

  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [isScrap, setIsScrap] = useState(false);
  const [scrapCount, setScrapCount] = useState(0);

  useEffect(() => {
    const loadNewsDetail = async () => {
      try {
        const response = await apiClient.get(`/api/news/${id}`);
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        setNews(result.data);
        setIsLike(result.data.liked);
        setNewsId(result.data.id);
        setLikeCount(result.data.likeCount);
      } catch (error) {
        ErrorAlert(error);
      }
    };
    loadNewsDetail();
  }, [id]);

  return !news ? (
    <p>뉴스 불러오는 중....</p>
  ) : (
    <div>
      <p>{news.category}</p>
      <img src={news.image} alt="뉴스 썸네일" />
      <p>{news.createdAt}</p>
      <p>좋아요 {likeCount}</p>
      <p>조회수 {news.view}</p>
      <img src={news.profile} alt="유저 프로필" />
      <img src={news.authorBadgeIcon} alt="유저 뱃지" />
      <p>{news.authorNickname}</p>
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
