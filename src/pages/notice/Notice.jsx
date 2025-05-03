import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Notice() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await apiClient("/api/notice/open");
        const result = res.data;
        setData(result.data);
        console.log("리졸트: ", result);
        console.log("리졸트.data: ", result.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

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
        <p>알림이 없습니다.</p>
      ) : (
        <div>
          {data.map((notice) => (
            <div class="flex items-center bg-white p-4  rounded shadow-sm">
              <img
                src={notice.image}
                alt="프로필"
                className="w-8 h-8 mt-1"
              ></img>
              <div class="ml-3 flex-1 ">
                <div class="flex items-center ">
                  <p onClick={() => handleMove(notice.userId)}>
                    {notice.nickname} 님이{" "}
                  </p>
                  <p className="text-gray-400 text-sm m-1">
                    {notice.createdAt}
                  </p>
                </div>
                <p className="mt-[-6px]">{notice.title}</p>
              </div>
              <a
                href={notice.url}
                alt="알림 URL"
                onClick={(e) => handleClick(e.target, notice.id)}
              >
                링크
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
