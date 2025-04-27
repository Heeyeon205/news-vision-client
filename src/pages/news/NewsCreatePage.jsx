import { useState } from "react";
import ErrorAlert from "../../utils/ErrorAlert";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function NewsCreatePage() {
  const [naverList, setNaverList] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleClick = async () => {
    try {
      const response = await apiClient.get("/api/naver-news/search", {
        params: { query },
      });
      const result = response.data;
      if (!result.success) {
        ErrorAlert();
        return;
      }
      setNaverList(result.data);
    } catch (error) {
      ErrorAlert(error);
    }
  };

  const handleCreate = async () => {
    const check = confirm("해당 뉴스로 작성하시겠습니까?");
    if (check) {
      try {
        const response = await apiClient.get("/api/auth/check");
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        navigate("/news/create");
      } catch (error) {
        ErrorAlert(error);
      }
    }
  };

  return (
    <>
      <h3>크리에이트 룸</h3>
      <input
        className="border"
        type="text"
        placeholder="오늘의 뉴스를 검색하세요."
        onChange={handleChange}
      ></input>
      <button className="border rounded" onClick={handleClick}>
        검색
      </button>

      <div>
        {naverList.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          <div className="newsContainer">
            {naverList.map((news) => (
              <div className="newsBox" key={news.id} onClick={handleCreate}>
                <h3>{news.title}</h3>
                {/* <p className="border">{news.description}</p> */}
                <p>{news.pubDate}</p>
                <a href={news.link}>뉴스 확인하러 가기</a>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
