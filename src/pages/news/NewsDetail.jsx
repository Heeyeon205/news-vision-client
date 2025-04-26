import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const loadNewsDetail = async () => {
      console.log("이게먼저");
      try {
        const response = await axios.get(`/api/news/${id}`);
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        console.log(result.data);
        setNews(result.data);
      } catch (error) {
        ErrorAlert(error);
      }
    };
    loadNewsDetail();
  }, []);

  return !news ? (
    <p>뉴스 불러오는 중....</p>
  ) : (
    <div>
      <p>{news.category}</p>
      <img src={news.image} alt="뉴스 썸네일" />
      <p>{news.createdAt}</p>
      <p>좋아요 {news.likeCount}</p>
      <p>조회수 {news.view}</p>
      <img src={news.profile} alt="유저 프로필" />
      <img src={news.authorBadgeIcon} alt="유저 뱃지" />
      <p>{news.authorNickname}</p>
      <button className="border rounded">
        {news.liked ? "좋취" : "좋아요"}
      </button>
      <button className="border rounded">
        {news.scraped ? "스취" : "스크랩"}
      </button>
    </div>
  );
}
