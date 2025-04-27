import ErrorAlert from "../../../utils/ErrorAlert";
import apiClient from "../../../api/axios";
import { useState, useEffect } from "react";

export default function ScrapList() {
  const [scraps, setScraps] = useState([]);

  useEffect(() => {
    async function loadScrapList() {
      try {
        const response = await apiClient.get("/api/mypage/scrap-list");
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        setScraps(result.data);
      } catch (error) {
        ErrorAlert(error);
      }
    }
    loadScrapList();
  }, []);

  return (
    <>
      {scraps.length === 0 ? (
        <p>아직 스크랩한 뉴스가 없어요.</p>
      ) : (
        scraps.map((scrap) => (
          <div>
            <div>
              <img src={scrap.image} alt="뉴스 이미지" />
            </div>
            <div>
              <div>
                <p>{scrap.nickname}</p>
                <p>{scrap.createAt}</p>
                <button>스크랩</button>
              </div>
              <div>{scrap.title}</div>
              <div>
                <span>좋아요 {scrap.likeCount}</span>
              </div>
            </div>
            <div>{scrap.categoryName}</div>
          </div>
        ))
      )}
    </>
  );
}
