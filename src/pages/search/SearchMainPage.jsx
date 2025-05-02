import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { toast } from "sonner";

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
    if (value.length > 15) {
      toast.warning("검색어가 너무 깁니다. 최대 15자까지 작성할 수 있습니다.");
      return;
    }
    console.log("검색어: ", value);
    console.log("검색 카테고리: ", type);
    try {
      const res = await apiClient.get(`/api/search/${type}?keyword=${value}`);
      const result = res.data;
      console.log("검색결과: ", result.data);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="flex items-center border border-gray-400 rounded-lg overflow-hidden shadow-sm"
      >
        <input
          type="text"
          className="w-full h-12 px-4 text-sm focus:outline-none"
          placeholder="궁금한 지식을 찾아보세요."
          value={query}
          onChange={(e) => {
            const trimmed = e.target.value.slice(0, 15);
            setQuery(trimmed);
          }}
        />
        <button
          type="submit"
          className="w-12 h-12 flex items-center justify-center bg-white border-l border-gray-300 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500" />
        </button>
      </form>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">
          인기 검색어
        </h4>
        {words.length === 0 ? (
          <p className="text-sm text-gray-600">검색 키워드가 없습니다.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {words.map((word) => (
              <span
                key={word.id}
                className="px-3 py-1 border border-orange-400 text-orange-400 text-sm rounded-full cursor-pointer hover:bg-orange-100"
                onClick={() => handleSearch(word.keyword)}
              >
                #{word.keyword}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6 border-b border-gray-300">
        <button
          onClick={() => {
            setType("news");
            setData([]);
          }}
          className={`py-2 px-6 text-sm font-medium border-b-2 ${
            type === "news"
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-gray-500"
          } transition`}
        >
          뉴스
        </button>
        <button
          onClick={() => {
            setType("board");
            setData([]);
          }}
          className={`py-2 px-6 text-sm font-medium border-b-2 ${
            type === "board"
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-gray-600"
          } transition`}
        >
          커뮤니티
        </button>
      </div>

      <div className="flex flex-col gap-4 px-4 max-w-[600px] mx-auto mt-8">
        {data.length === 0 ? (
          <p className="text-center text-gray-600">검색 결과가 없습니다.</p>
        ) : (
          data.map((search) => (
            <div
              key={search.id}
              className="rounded overflow-hidden cursor-pointer shadow-md hover:scale-101 hover:shadow-lg transition-transform duration-300 mb-5"
              onClick={() =>
                navigate(`/${type}/${search.id || search.boardId}`)
              }
            >
              <div className="w-full h-full max-h-[350px] overflow-hidden object-cover">
                {search.image && (
                  <img
                    src={search.image}
                    alt="썸네일"
                    width="600"
                    height="350"
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>
              <div className="p-2">
                {search.category && (
                  <p className="inline-block bg-gray-100 text-sm text-black rounded-xl px-3 py-0.5 w-fit">
                    {search.category}
                  </p>
                )}

                <h4 className="text-lg font-bold mb-1">
                  {search.title || search.content}
                </h4>
                {type === "board" && (
                  <div className="flex text-sm text-gray-600 gap-2">
                    <FaRegHeart className="w-5 h-5 text-red-500" />
                    <span>{search.likeCount}</span>
                    <FaRegComment className="w-5 h-5 text-gray-500 ml-4" />
                    <span>{search.commentCount}</span>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-400 space-x-2">
                  <span className="mr-2">{search.nickname}</span>
                  <span>{search.createdAt}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
