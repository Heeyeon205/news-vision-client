import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { formatDate } from "../../utils/FormatDate";
import NewsCreateButton from "../news/NewsCreateButton";
import { useNavigate } from "react-router-dom";

export default function ArticleMainPage() {
  const categories = [
    "전체",
    "인기",
    "팔로우",
    "경제",
    "정치",
    "문화",
    "글로벌",
    "예술",
    "과학기술",
    "역사",
    "도서",
  ];
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiClient.get("/api/news/article");
        const result = response.data;
        setData(result.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  const handleClick = async (category) => {
    try {
      let selectedType = "recent";
      let selectedCategoryId = null;

      if (category === "전체") {
        selectedType = "recent";
      } else if (category === "인기") {
        selectedType = "popular";
      } else if (category === "팔로우") {
        selectedType = "follow";
      } else {
        selectedType = "category";
        const categoryIdMap = {
          경제: 2,
          정치: 3,
          문화: 4,
          글로벌: 5,
          예술: 6,
          과학기술: 7,
          역사: 8,
          도서: 9,
        };
        selectedCategoryId = categoryIdMap[category];
      }

      const url =
        selectedType === "category"
          ? `/api/news/article?type=${selectedType}&categoryId=${selectedCategoryId}`
          : `/api/news/article?type=${selectedType}`;

      const response = await apiClient.get(url);
      const result = response.data;
      setData(result.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="articleContainer">
      <div className="btnBox">
        {categories.map((category) => (
          <button
            key={category}
            className="border rounded"
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div>
        <h4>{formatDate}</h4>
        <NewsCreateButton />
      </div>

      <div className="listBox">
        {data.length === 0 ? (
          <p>아티클이 없습니다.</p>
        ) : (
          <div className="newsContainer">
            {data.map((news) => (
              <div
                key={news.id}
                className="newsBox border rounded"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <div className="newsImage">
                  <img src={news.image} alt="뉴스 썸네일"></img>
                </div>
                <div className="newsContent">
                  <p>{news.category}</p>
                  <h4>{news.title}</h4>
                  <span>{news.author}</span>
                  <span>{news.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
