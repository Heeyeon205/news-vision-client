import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useInfiniteScroll } from "../../utils/useInfiniteScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function Notice() {
  const navigate = useNavigate();

  const { data, isLoading, hasMore, reset } = useInfiniteScroll(
    async (page, size) => {
      let url = `/api/notice/open?page=${page}&size=${size}`;
      const response = await apiClient.get(url);
      return response.data.data.content;
    }
  );

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
    <div>
      {data.length === 0 ? (
        <div className="w-full flex justify-center mt-30 flex-col items-center">
          <FontAwesomeIcon
            icon={faCommentDots}
            className="text-5xl text-orange-400"
          />
          <p className="ml-2 mt-2 text-gray-500">알림이 없습니다.</p>
        </div>
      ) : (
        <div>
          {data.map((notice) => (
            <div
              className="flex items-center bg-white p-2  rounded shadow-sm border-1 border-none"
              key={notice.id}
            >
              <img
                src={notice.image}
                alt="프로필"
                className="w-8 h-8 mt-1 ml-2"
              ></img>
              <div className="ml-3 flex-1 ">
                <div className="flex items-center">
                  <p
                    className="cursor-pointer"
                    onClick={() => handleMove(notice.userId)}
                  >
                    {notice.nickname} 님이{" "}
                  </p>
                  <p className="text-gray-400 text-sm m-1">
                    {notice.createdAt}
                  </p>
                </div>
                <p
                  className="mt-[-6px] text-sm cursor-pointer"
                  onClick={() => handleClick(notice.url, notice.id)}
                >
                  {notice.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
