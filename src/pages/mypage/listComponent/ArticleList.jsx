import ErrorAlert from "../../../utils/ErrorAlert";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function loadArticleList() {
      try {
        const response = await axios.get("/api/mypage/board-list");
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        setArticles(result.data);
      } catch (error) {
        ErrorAlert(error);
      }
    }
    loadArticleList();
  }, []);

  return (
    <>
      {articles.length === 0 ? (
        <p>아직 작성한 아티클이 없어요.</p>
      ) : (
        articles.map((article) => (
          <div className="articleBox" key={article.id}>
            <div className="articleBox1">
              <img src={article.image} alt="프로필 이미지" />
            </div>
            <div className="articleBox2">
              <div className="articles1">
                <p>{article.nickname}</p>
                <p>{article.createAt}</p>
                <button>팔로우</button>
              </div>
              <div className="articles2">{article.content}</div>
              <div className="articles3">
                <span>좋아요 {article.likeCount}</span>
                <span>댓글 {article.commentCount}</span>
                <button>신고</button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
