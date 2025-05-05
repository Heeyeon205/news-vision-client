import { useEffect, useState } from "react";
import apiClient from "../../../api/axios";
import { useNavigate } from "react-router-dom";

export default function FollowerModal({ onClose }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFollowerPage() {
      try {
        const response = await apiClient.get("/api/mypage/follower-list");
        const result = response.data;
        setData(result.data.content);
      } catch (error) {
        console.error(error);
      }
    }
    loadFollowerPage();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg w-80 relative max-h-[500px] overflow-y-scroll">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">팔로워</h3>
          <span>{data.length}</span>
          <button onClick={onClose} className="text-gray-500 text-lg">
            ✕
          </button>
        </div>
        <hr className="mb-4" />
        {data.length === 0 ? (
          <p>팔로워가 없습니다.</p>
        ) : (
          data.map((follower) => (
            <div key={follower.id} className="flex items-center space-x-4 mb-4">
              <img
                src={follower.image}
                alt="프로필 이미지"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <p
                    className="font-bold cursor-pointer"
                    onClick={() => navigate(`/userPage/${follower.id}`)}
                  >
                    {follower.nickname}
                  </p>
                  {follower.badge && (
                    <img src={follower.badge} alt="뱃지" className="w-4 h-4" />
                  )}
                </div>
                <p className="text-sm text-gray-500">{follower.introduction}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
