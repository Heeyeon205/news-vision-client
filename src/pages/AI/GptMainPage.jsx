import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";

export default function GptMainPage() {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const respons = await apiClient.get("/api/gpt-news/main-summary");
        const result = respons.data;
        setNewsList(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="aiContainer">
      <div>
        <progress value={index + 1} max={newsList.length}></progress>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
      >
        {newsList.map((news) => (
          <SwiperSlide key={news.id}>
            <div className="border p-4 rounded shadow">
              <img src={news.image} alt="뉴스 썸네일"></img>
              <h3>{news.title}</h3>
              <p>{news.summary}</p>
              <p onClick={() => navigate(`/news/${news.id}`)}>자세히 보기</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
