import { useEffect, useState } from "react";
import apiClient from "../../../api/axios";
import { useNavigate } from "react-router-dom";

export default function FollowingModal({ onClose, userId }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFollowingPage() {
      try {
        const response = await apiClient.get(
          `/api/mypage/following-list/${userId}`
        );
        const result = response.data;
        setData(result.data.content);
      } catch (error) {
        console.error(error);
      }
    }
    loadFollowingPage();
  }, [userId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg w-80 relative max-h-[500px] overflow-y-scroll">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold">팔로잉</h3>
            <span className="text-xl font-bold">{data.length}</span>
          </div>
          <button onClick={onClose} className="text-gray-500 text-lg">
            ✕
          </button>
        </div>
        <hr className="mb-4" />
        {data.length === 0 ? (
          <p>팔로잉이 없습니다.</p>
        ) : (
          data.map((following) => (
            <div
              key={following.id}
              className="flex items-center space-x-4 mb-4"
            >
              <img
                src={following.image}
                alt="프로필 이미지"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <p
                    className="font-bold cursor-pointer"
                    onClick={() => navigate(`/userPage/${following.id}`)}
                  >
                    {following.nickname}
                  </p>
                  {following.badge && (
                    <img src={following.badge} alt="뱃지" className="w-4 h-4" />
                  )}
                </div>
                <p className="text-sm text-gray-500">{following.introduce}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
