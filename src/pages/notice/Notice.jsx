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

  return (
    <div>
      {data.length === 0 ? (
        <p>알림이 없습니다.</p>
      ) : (
        <div>
          {data.map((notice) => (
            <div>
              <img src={notice.image} alt="프로필"></img>
              <p>{notice.nickname}</p>
              <p>{notice.title}</p>
              <p>{notice.createdAt}</p>
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
