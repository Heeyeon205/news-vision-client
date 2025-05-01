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

  useEffect(() => {
    if (pollList.length <= 1) return; // 투표가 1개 이하일 경우 자동 슬라이드 불필요

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % pollList.length);
    }, 5000); // 5초마다 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [pollList]);

  return (
    <div className="p-4 max-w-[600px] w-full mx-auto">
      <div className="relative rounded-xl my-5 p-8 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 to-transparent rounded-lg pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-24 h-24 bg-orange-300/10 rounded-full -translate-x-12 -translate-y-12 pointer-events-none"></div>
        <div className="relative flex flex-col gap-4">
          <div className="font-bold text-2xl text-orange-500 overflow-hidden h-10">
            {pollList.length > 0 ? (
              <div
                key={index} // key를 변경하여 애니메이션 트리거
                className="animate-slide-up"
              >
                {pollList[index]?.title}
              </div>
            ) : (
              "진행중인 투표가 없습니다."
            )}
          </div>
          <div
            className="relative text-orange-600 dark:text-purple-400 font-medium cursor-pointer transition-colors duration-200 group"
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
        @keyframes slide-up {
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
                  <div className="w-full rounded-bl-lg rounded-br-lg flex flex-col justify-center items-center border-gray-300 border border-t-0">
                    <div className="w-full flex flex-col mt-4 px-3">
                      <p className="text-xs p-1">{poll.expiredAt}</p>
                      <h3 className="p-1 font-bold text-base break-words">{poll.title}</h3>
                      <span className="text-xs p-1">{poll.createdAt}</span>
                      <span className="text-xs p-1">{poll.nickname}</span>
                    </div>
                    <p
                      onClick={() => navigate(`/polls/${poll.id}`)}
                      className="text-orange-500 hover:text-orange-400 cursor-pointer p-3 text-sm"
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
