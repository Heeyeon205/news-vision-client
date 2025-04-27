import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";

export default function GptMainPage() {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const respons = await apiClient.get("/api/gpt-news/main-summary");
        const result = respons.data;
        if (!result.success) {
          alert("데이터를 불러오지 못했습니다.");
          return;
        }
        setNewsList(result.data);
      } catch (error) {
        ErrorAlert(error);
      }
    };
    loadData();
  }, []);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {newsList.map((news) => (
        <SwiperSlide key={news.id}>
          <div className="border p-4 rounded shadow">
            <h3>{news.title}</h3>
            <p>{news.summary}</p>
            <p onClick={() => navigate(`/news/${news.id}`)}>자세히 보기</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
