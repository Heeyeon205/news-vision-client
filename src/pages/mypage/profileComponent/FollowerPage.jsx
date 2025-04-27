import apiClient from "../../../api/axios";
import { useState, useEffect } from "react";
import ErrorAlert from "../../../utils/ErrorAlert";

export default function FollowerPage() {
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    async function loadFollowerPage() {
      const response = await apiClient.get("/api/mypage/follower-list");
      const result = response.data;
      if (!result.success) {
        ErrorAlert();
        return;
      }
      setFollowerList(result.data);
    }
    loadFollowerPage();
  }, []);

  return (
    <div className="followContainer">
      <div className="followHeader">
        <div>
          <h3>팔로워</h3> <span>{followerList.length}</span>
          <button>X</button>
        </div>
      </div>

      <hr />

      <div className="followerBody">
        {followerList.length === 0 ? (
          <p>팔로워가 없어요</p>
        ) : (
          followerList.map((follower) => (
            <div key={follower.id} className="followerCard">
              <div>
                <img src={follower.image} alt="프로필 이미지" />
              </div>
              <div>
                <p>{follower.nickname}</p>
                <span>{follower.badge}</span>
                <p>{follower.introduction}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
