import ErrorAlert from "../../../utils/ErrorAlert";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";

export default function NewsList() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    async function loadNewsList() {
      try {
        const response = await axios.get("/api/mypage/news-list");
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        setNewsList(result.data);
      } catch (error) {
        ErrorAlert(error);
      }
    }
    loadNewsList();
  }, []);

  return (
    <>
      {newsList.length === 0 ? (
        <p>아직 작성한 뉴스가 없어요.</p>
      ) : (
        newsList.map((news) => (
          <div>
            <div>
              <img src={news.image} alt="뉴스 이미지" />
            </div>
            <div>
              <div>
                <p>{news.nickname}</p>
                <p>{news.createAt}</p>
              </div>
              <div>{news.title}</div>
              <div>
                <span>좋아요 {news.likeCount}</span>
              </div>
            </div>
            <div>{news.categoryName}</div>
          </div>
        ))
      )}
    </>
  );
}
