import { useState, useEffect, useRef } from "react";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function Notice() {
  const navigate = useNavigate();
  const scrollRef = useRef();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const size = 10;

  const fetchData = async (targetPage) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const url = `/api/notice/open?page=${targetPage}&size=${size}`;
      const response = await apiClient.get(url);
      const newContent = response.data.data.content;

      setData((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filteredNew = newContent.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prev, ...filteredNew];
      });

      if (newContent.length < size) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 50 &&
        !isLoading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  useEffect(() => {
    if (page === 0) return;
    fetchData(page);
  }, [page]);

  const handleClick = async (url, id) => {
    try {
      await apiClient.get(`/api/notice/${id}`);
      navigate(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMove = (id) => {
    navigate(`/userPage/${id}`);
  };

  return (
    <div className="max-h-[400px] overflow-y-auto" ref={scrollRef}>
      {data.length === 0 ? (
        <div className="w-full flex justify-center mt-30 flex-col items-center">
          <FontAwesomeIcon
            icon={faCommentDots}
            className="text-5xl text-orange-400"
          />
          <p className="ml-2 mt-2 text-gray-500">알림이 없습니다.</p>
        </div>
      ) : (
        data.map((notice) => (
          <div
            className="flex items-center bg-white p-2 rounded shadow-sm border-1 border-none"
            key={notice.id}
          >
            <img
              src={notice.image}
              alt="프로필"
              className="w-8 h-8 mt-1 ml-2 rounded-full object-cover"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <p
                  className="cursor-pointer"
                  onClick={() => handleMove(notice.userId)}
                >
                  {notice.nickname} 님이{" "}
                </p>
                <p className="text-gray-400 text-sm m-1">{notice.createdAt}</p>
              </div>
              <p
                className="mt-[-6px] text-sm cursor-pointer"
                onClick={() => handleClick(notice.url, notice.id)}
              >
                {notice.title}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
