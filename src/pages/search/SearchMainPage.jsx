import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faMagnifyingGlass);

export default function SearchMainPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [type, setType] = useState("news");
  const [words, setWords] = useState([]);
  const navigate = useNavigate();

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

  const handleSearch = async (value) => {
    if (value === "") return;
    console.log("검색어: ", value);
    console.log("검색 카테고리: ", type);
    try {
      const res = await apiClient.get(`/api/search/${type}?keyword=${value}`);
      const result = res.data;
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="searchContainer">
      <div className="searchBox  flex justify-center m-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
        >
          {" "}
          <input
            type="text"
            className="border w-[648px] h-[48px] border-r-0 rounded-tl-lg rounded-bl-lg border-gray-400"
            placeholder=" 궁금한 지식을 찾아보세요."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button
            className="border w-[52px] h-[48px] border-l-0 rounded-tr-lg rounded-br-lg border-gray-400 "
            type="submit"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              className="text-gray-500 hover:text-gray-300"
            />
          </button>
        </form>
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

      <div className="w-full h-full flex justify-center ">
        <div className="buttonBox flex justify-start border-b-1 border-gray-200 w-[700px] h-[48px]">
          <button
            onClick={() => setType("news")}
            className=" py-2 px-4 border-b-2 border-transparent text-gray-700 font-medium hover:border-orange-500 focus:border-orange-500 transition"
          >
            뉴스
          </button>
          <button
            onClick={() => setType("board")}
            className="px-2 px-4  border-b-2 border-transparent text-gray-700 font-medium hover:border-orange-500 focus:border-orange-500 transition"
          >
            커뮤니티
          </button>
        </div>
      </div>

      <div className="listContainer">
        {data.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          data.map((search) => (
            <div
              className="listBox"
              key={search.id}
              onClick={() => navigate(`/news/${search.id}`)}
            >
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
