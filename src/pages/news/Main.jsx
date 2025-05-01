import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { formatDate } from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import NewsCreateButton from "./NewsCreateButton";
import { useStore } from "../../store/useUserStore";
import { Swiper, SwiperSlide } from "swiper/react";
import PollCreateButton from "../../pages/poll/PollCreateButton";
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
        setNewsList(result.data.newsList);
        setPollList(result.data.pollList);
      } catch (error) {
        console.log(error);
      }
    };
    loadNews();
  }, []);

  useEffect(() => {
    if (pollList.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % pollList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [pollList]);

  return (
    <div className="p-4 max-w-[600px] w-full mx-auto">
      <div className="relative rounded-xl my-5 p-8 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 to-transparent rounded-lg pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-24 h-24 bg-orange-300/10 rounded-full -translate-x-12 -translate-y-12 pointer-events-none"></div>
        <div className="relative flex flex-col gap-4">
          <div className="font-bold text-2xl text-orange-500 overflow-hidden h-10">
            {pollList.length > 0 ? (
              <div key={index} className="animate-slide-up">
                {pollList[index]?.title}
              </div>
            ) : (
              "진행중인 투표가 없습니다."
            )}
          </div>
          <div
            className="relative text-orange-600 dark:text-orange-400 font-medium cursor-pointer transition-colors duration-200 group"
            onClick={() => {
              if (pollList.length > 0) {
                navigate(`/polls/${pollList[index]?.id}`);
              }
            }}
          >
            당신의 생각은? 투표로 알려주세요!
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-orange-600 dark:bg-orange-400 transition-all duration-400 group-hover:w-full"></span>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes main-slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>

      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold mt-5">{formatDate}</h4>
        {isAuht && <NewsCreateButton />}
      </div>

      <div className="rounded shadow-md flex flex-row gap-4 my-10 p-5">
        <div className="flex-3 ml-3 font-bold text-lg">
          시간 없으신가요? 하루에 딱 이것만 보세요!
        </div>
        <div
          className="flex-1 text-gray-600 cursor-pointer"
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
                <div className="flex items-center text-sm text-gray-600 space-x-2">
                  <span className="mr-2">{news.nickname}</span>
                  <span>{news.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <hr className="mt-5 mb-2 border-orange-500 border-t-2"></hr>

      <div className="flex justify-end mb-5">
        {isAuht && <PollCreateButton />}
      </div>

      {pollList.length === 0 ? (
        <p>진행중인 투표가 없습니다.</p>
      ) : (
        <div className="pollContainer rounded shadow-md p-3 border">
          <h4 className="text-xl font-bold my-3 ml-3">
            당신의 의견을 들려주세요!
          </h4>

          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
          >
            {pollList.map((poll) => (
              <SwiperSlide key={poll.id}>
                <div className="w-full flex justify-center items-center">
                  <div
                    className="w-full flex flex-col justify-center items-start border-t-0 rounded-bl-lg rounded-br-lg
              cursor-pointer shadow-md hover:scale-101 hover:shadow-lg transition-transform duration-300"
                    onClick={() => navigate(`/poll/${poll.id}`)}
                  >
                    <div className="w-full flex flex-col p-3">
                      <p className="inline-block mb-2 text-sm text-black rounded-xl px-3 py-1 w-fit border border-orange-400 text-orange-400">
                        {poll.expiredAt}
                      </p>
                      <h3 className="my-1 font-bold text-base break-words">
                        {poll.title}
                      </h3>
                      <div className="flex w-full mt-1">
                        <span className="text-xs text-gray-600 mr-2">
                          {poll.nickname}
                        </span>
                        <span className="text-xs text-gray-600">
                          {poll.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center gap-2 mt-10 mb-2">
            {pollList.map((_, i) => (
              <div
                key={`indicator-${i}`}
                className={`indicator w-4 h-1 rounded ${
                  index === i ? "bg-orange-500" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
