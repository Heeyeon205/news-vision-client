import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../../api/axios';
import ErrorAlert from '../../utils/ErrorAlert';

export default function GptMainPage() {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const respons = await apiClient.get('/api/gpt-news/main-summary');
        const result = respons.data;
        setNewsList(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="aiContainer  relative w-full max-w-5xl mx-auto overflow-hidden group">
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-3 z-10 mt-4">
        {newsList.map((_, i) => (
          <div
            key={i}
            className={`indicator w-4 h-1 rounded ${
              index === i ? 'bg-orange-500' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
      >
        {newsList.map((news) => (
          <SwiperSlide key={news.id}>
            <div className="w-full h-full">
              <div className="w-full flex-shrink-0 flex flex-col  p-5 mt-7 justify-center items-center">
                <img
                  src={news.image}
                  alt="뉴스 썸네일"
                  className="max-h-full max-w-full object-contain w-[600px] h-[350px] rounded-tl-lg rounded-tr-lg  border-gray-300 border-1 border-b-0"
                />

                <div className="max-h-full max-w-full w-[600px]  rounded-bl-lg rounded-br-lg flex flex-col justify-center items-center border-gray-300 border-1 border-t-0 ">
                  <div className="w-125 h-[160px]  flex flex-col mt-6  max-h-full max-w-full">
                    <h3 className="p-2 text-2xl font-bold">{news.title}</h3>
                    <p className="text-sm p-2 ">{news.summary}</p>
                  </div>
                  <p
                    onClick={() => navigate(`/news/${news.id}`)}
                    className="text-orange-500 hover:text-orange-400  cursor-pointer p-5"
                  >
                    자세히 보기
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
