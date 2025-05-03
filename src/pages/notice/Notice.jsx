import { useEffect, useState } from 'react';
import apiClient from '../../api/axios';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

export default function Notice() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await apiClient('/api/notice/open');
        const result = res.data;
        setData(result.data);
        console.log('리졸트: ', result);
        console.log('리졸트.data: ', result.data);
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
            <div class="flex items-center bg-white p-2  rounded shadow-sm border-1 border-none">
              <img
                src={notice.image}
                alt="프로필"
                className="w-8 h-8 mt-1 ml-2"
              ></img>
              <div class="ml-3 flex-1 ">
                <div class="flex items-center ">
                  <p>{notice.nickname} 님이 </p>
                  <p className="text-gray-400 text-sm m-1">
                    {notice.createdAt}
                  </p>
                </div>
                <p className="mt-[-6px] text-sm">{notice.title}</p>
              </div>
              <a
                className="mr-2"
                href={notice.url}
                alt="알림 URL"
                onClick={(e) => handleClick(e.target, notice.id)}
              >
                <FontAwesomeIcon icon={faLink} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
