import { useEffect, useState } from "react";
import apiClient from "../../api/axios";

export default function SearchMainPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [type, setType] = useState("news");
  const [words, setWords] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await apiClient.get(`/api/popular/${type}`);
        const result = res.data;
        setWords(result);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [type]);

  const handleClick = async () => {
    try {
      const res = await apiClient.get(`/api/search/news?keyword=${query}`);
      const result = res.data;
      console.log(result);
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="searchContainer">
      <div className="searchBox">
        <input
          type="text"
          className="border"
          placeholder="궁금한 지식을 찾아보세요."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button className="border" onClick={handleClick}>
          검색
        </button>
      </div>

      <hr />

      <div className="buttonBox">
        <button onClick={() => setType("news")} className="border">
          뉴스
        </button>
        <button onClick={() => setType("board")} className="border">
          커뮤니티
        </button>
      </div>

      <div className="wordBox">
        {words.length === 0 ? (
          <p>검색 키워드가 없습니다.</p>
        ) : (
          <>
            {words.map((word) => (
              <p key={word.id}>{word.keyword}</p>
            ))}
          </>
        )}
      </div>

      <hr />

      <div className="listContainer">
        {data.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          data.map((search) => (
            <div className="listBox">
              <img
                src={search.image}
                alt="썸네일"
                width="600px"
                height="350px"
              />
              <p>{search.category}</p>
              <p>{search.title}</p>
              <p>{search.createdAt}</p>
              <p>{search.nickname}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
