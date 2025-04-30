import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { formatDate } from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import NewsCreateButton from "./NewsCreateButton";
import { useStore } from "../../store/useUserStore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Main() {
  const logRole = useStore((state) => state.role);
  const isAuht = logRole === "ROLE_ADMIN" || logRole === "ROLE_CREATOR";
  const [newsList, setNewsList] = useState([]);
  const [pollList, setPollList] = useState([]);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await apiClient.get("/api/news/main");
        const result = response.data;
        console.log(result.data);
        setNewsList(result.data.newsList);
        setPollList(result.data.pollList);
      } catch (error) {
        console.log(error);
      }
    };
    loadNews();
  }, []);

  return (
    <div className="p-4 max-w-[600px] w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold mt-5">{formatDate}</h4>
        {isAuht && <NewsCreateButton />}
      </div>

      <div className="rounded shadow-md flex flex-row gap-4 my-10 p-5">
        <div className="flex-3 ml-3 font-bold text-lg">
          시간 없으신가요? 하루에 딱 이것만 보세요!
        </div>
        <div
          className="flex-1 text-gray-500 cursor-pointer"
          onClick={() => navigate("/gpt-info")}
        >
          소식 보러 가기 {">"}
        </div>
      </div>

      {newsList.length === 0 ? (
        <p>뉴스가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="rounded overflow-hidden cursor-pointer shadow-md hover:scale-101 hover:shadow-lg transition-transform duration-300 mb-5"
              onClick={() => navigate(`/news/${news.id}`)}
            >
              <div className="w-full h-full object-cover">
                <img
                  src={news.image}
                  alt="뉴스 썸네일"
                  width="600"
                  height="350"
                ></img>
              </div>
              <div className="p-2">
                <p className="inline-block bg-gray-100 text-sm text-black rounded-xl px-3 py-0.5 w-fit">
                  {news.category}
                </p>
                <h4 className="text-lg font-bold mb-1">{news.title}</h4>
                <div className="flex items-center text-sm text-gray-400 space-x-2">
                  <span className="mr-2">{news.nickname}</span>
                  <span>{news.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pollList.length === 0 ? (
        <p>진행중인 투표가 없습니다.</p>
      ) : (
        <div className="pollContainer rounded shadow-md">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
          >
            {pollList.map((poll) => (
              <SwiperSlide key={poll.id}>
                <div className="w-full flex justify-center items-center">
                  <div className="w-full rounded-bl-lg rounded-br-lg flex flex-col justify-center items-center border-gray-300 border-1 border-t-0">
                    <div className="w-125 h-[160px] flex flex-col mt-6">
                      <p className="text-sm p-2">{poll.expiredAt}</p>
                      <h3 className="p-2 font-bold">{poll.title}</h3>
                      <span className="text-sm p-2">{poll.createdAt}</span>
                      <span className="text-sm p-2">{poll.nickname}</span>
                    </div>
                    <p
                      onClick={() => navigate(`/polls/${poll.id}`)}
                      className="text-orange-500 hover:text-orange-400 cursor-pointer p-5"
                    >
                      자세히 보기
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
