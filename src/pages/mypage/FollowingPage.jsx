import axios from "../../api/axios";
import { useState, useEffect } from "react";
import ErrorAlert from "../../utils/ErrorAlert";

export default function FollowingPage() {
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    async function loadFollowingPage() {
      const response = await axios.get("/api/mypage/following-list");
      const result = response.data;
      if (!result.success) {
        ErrorAlert();
        return;
      }
      setFollowingList(result.data);
    }
    loadFollowingPage();
  }, []);

  return (
    <div className="followContainer">
      <div className="followHeader">
        <div>
          <h3>팔로잉</h3> <span>{followingList.length}</span>
          <button>X</button>
        </div>
      </div>

      <hr />

      <div className="followingBody">
        {followingList.length === 0 ? (
          <p>팔로잉이 없어요</p>
        ) : (
          followingList.map((following) => (
            <div>
              <div>
                <img src={following.image} alt="프로필 이미지"></img>
              </div>
              <div>
                <p>{following.nickname}</p>
                <span>{following.badge}</span>
                <p>{following.introduce}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
