import { useEffect, useState, useRef } from "react";
import apiClient from "../../api/axios";
import { formatDate } from "../../utils/FormatDate";
import NewsCreateButton from "../news/NewsCreateButton";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useUserStore";

export default function ArticleMainPage() {
  const logId = useStore((state) => state.userId);
  const logRole = useStore((state) => state.role);
  const isAuth = logRole === "ROLE_ADMIN" || logRole === "ROLE_CREATOR";
  const navigate = useNavigate();
  const categoryRef = useRef(null);

  const [selectedType, setSelectedType] = useState("recent");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "전체",
    "인기",
    ...(logId ? ["팔로우"] : []),
    "경제",
    "정치",
    "문화",
    "글로벌",
    "예술",
    "과학기술",
    "역사",
    "도서",
  ];

  const fetchArticles = async (pageToFetch) => {
    setIsLoading(true);
    let url = `/api/news/article?type=${selectedType}&page=${pageToFetch}&size=10`;
    if (selectedType === "category" && selectedCategoryId) {
      url += `&categoryId=${selectedCategoryId}`;
    }
    try {
      const response = await apiClient.get(url);
      const content = response.data.data.content;
      if (content.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => {
          const ids = new Set(prev.map((item) => item.id));
          const newItems = content.filter((item) => !ids.has(item.id));
          return [...prev, ...newItems];
        });
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (isLoading || !hasMore) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    fetchArticles(page);
  }, [page, selectedType, selectedCategoryId]);

  const handleClick = (category) => {
    let type = "recent";
    let categoryId = null;

    if (category === "전체") type = "recent";
    else if (category === "인기") type = "popular";
    else if (category === "팔로우") type = "follow";
    else {
      type = "category";
      const categoryIdMap = {
        경제: 2,
        정치: 3,
        문화: 4,
        글로벌: 15,
        예술: 6,
        과학기술: 7,
        역사: 8,
        도서: 9,
      };
      categoryId = categoryIdMap[category];
    }

    if (type === selectedType && categoryId === selectedCategoryId) {
      return;
    }

    setSelectedType(type);
    setSelectedCategoryId(categoryId);
    setData([]);
    setPage(0);
    setHasMore(true);
  };
  useEffect(() => {
    const categoryContainer = categoryRef.current;
    if (!categoryContainer) return;

    let isDragging = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX - categoryContainer.offsetLeft;
      scrollLeft = categoryContainer.scrollLeft;
      categoryContainer.style.cursor = "grabbing";
    };

    const handleMouseLeave = () => {
      isDragging = false;
      categoryContainer.style.cursor = "grab";
    };

    const handleMouseUp = () => {
      isDragging = false;
      categoryContainer.style.cursor = "grab";
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - categoryContainer.offsetLeft;
      const walk = (x - startX) * 2;
      categoryContainer.scrollLeft = scrollLeft - walk;
    };

    categoryContainer.addEventListener("mousedown", handleMouseDown);
    categoryContainer.addEventListener("mouseleave", handleMouseLeave);
    categoryContainer.addEventListener("mouseup", handleMouseUp);
    categoryContainer.addEventListener("mousemove", handleMouseMove);

    return () => {
      categoryContainer.removeEventListener("mousedown", handleMouseDown);
      categoryContainer.removeEventListener("mouseleave", handleMouseLeave);
      categoryContainer.removeEventListener("mouseup", handleMouseUp);
      categoryContainer.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="p-4 max-w-[600px] w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold">{formatDate}</h4>
        {isAuth && <NewsCreateButton />}
      </div>
      <div
        ref={categoryRef}
        className="flex gap-2 mb-4 overflow-x-auto whitespace-nowrap cursor-grab select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {categories.map((category) => (
          <button
            key={category}
            className="bg-gray-100 text-sm text-black rounded-xl px-3 py-1.5 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="text-gray-500">
        {data.length === 0 && !isLoading ? (
          <p>아티클이 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {data.map((news) => (
              <div
                key={news.id}
                className="rounded overflow-hidden cursor-pointer shadow-md hover:scale-101 hover:shadow-lg transition-transform duration-300"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <img
                  src={news.image || null}
                  alt="뉴스 썸네일"
                  width="600"
                  height="350"
                  className="w-full h-[350px] object-cover"
                />
                <div className="p-2">
                  <p className="inline-block bg-gray-100 text-sm text-black rounded-xl px-3 py-0.5 w-fit">
                    {news.category}
                  </p>
                  <h4 className="text-lg font-bold text-black mb-1">
                    {news.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600 space-x-2">
                    <span className="mr-2">{news.nickname}</span>
                    <span>{news.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isLoading && <p className="text-center text-gray-400">로딩 중...</p>}
      {!hasMore && data.length > 0 && (
        <p className="text-center text-gray-400 mt-4">
          더 이상 뉴스가 없습니다.
        </p>
      )}
    </div>
  );
}
