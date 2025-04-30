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

  const handleCreate = async (news) => {
    const check = confirm("해당 뉴스로 작성하시겠습니까?");
    if (check) {
      try {
        const response = await apiClient.get("/api/auth/check");
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        console.log(news);
        console.log(news.id);
        navigate("/news/create-news", {
          state: {
            referenceTitle: news.title,
            referencePubDate: news.pubDate,
            referenceLink: news.link,
          },
        });
      } catch (error) {
        ErrorAlert(error);
      }
    }
  };

  return (
    <>
      <div className="p-4 max-w-[600px] w-full mx-auto min-h-screen">
        <div className="p-4 bg-gray-100 shadow-md rounded-lg mb-6">
          <div className="text-lg text-orange-500 font-bold mb-4">
            <h3>크리에이트 룸</h3>
          </div>
          <div class="flex items-center gap-2">
            <input
              className="flex-1 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              type="text"
              placeholder="오늘의 뉴스를 검색하세요."
              onChange={handleChange}
            ></input>
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded text-sm font-bold cursor-pointer hover:bg-orange-600 transition-colors"
              onClick={handleClick}
            >
              검색
            </button>
          </div>
        </div>

        <div>
          {naverList.length === 0 ? (
            <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
          ) : (
            <div className="newsContainer">
              {naverList.map((news) => (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 cursor-pointer hover:shadow-lg transition-shadow">
                  <h3
                    className="text-lg font-bold text-gray-800 mb-2"
                    onClick={() => handleCreate(news)}
                  >
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{news.pubDate}</p>
                  <a
                    href={news.link}
                    className="text-orange-500 text-sm font-medium hover:underline"
                    target="_blank"
                  >
                    뉴스 확인하러 가기
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
