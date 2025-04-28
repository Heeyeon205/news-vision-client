import { useState, useEffect } from "react";
import apiClient from "../../api/axios";
import UpdatePage from "./profileComponent/UpdateBtn";
import FollowerButton from "./followComponent/FollowerButton";
import FollowingButton from "./followComponent/FollowingButton";
import NewsList from "./listComponent/NewsList";
import ArticleList from "./listComponent/ArticleList";
import ScrapList from "./listComponent/ScrapList";

export default function Mypage() {
  const [role, setRole] = useState(false);
  const [userImg, setUserImg] = useState(null);
  const [nickname, setNickname] = useState("");
  const [follower, setFollower] = useState("");
  const [following, setFollowing] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [activeTap, setActiveTap] = useState("article");
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function loadMypage() {
      try {
        const response = await apiClient.get("/api/mypage");
        const result = response.data;
        setRole(result.data.role);
        setUserImg(result.data.image);
        setNickname(result.data.nickname);
        setFollower(result.data.followerCount);
        setFollowing(result.data.followingCount);
        setIntroduce(result.data.introduce);
        setIcon(result.data.icon);
        setTitle(result.data.title);
      } catch (error) {
        console.log(error);
      }
    }
    loadMypage();
  }, []);

  return (
    <div className="mypageContainer">
      <div className="userPortion">
        <div className="profile1">
          <img src={userImg} alt="프로필 이미지" width="64px" height="64px" />
          <UpdatePage />
        </div>
        <div className="profile2">
          <p>{nickname}</p>
          {role && (
            <>
              <img src={icon} alt="뱃지" />
              <p>{title}</p>
            </>
          )}
        </div>
        <div className="profile3">
          <FollowerButton follower={follower} />
          <FollowingButton following={following} />
        </div>
        <div className="profile4">
          <p className="border">{introduce || ""}</p>
        </div>
      </div>

      <div className="btnGroupe">
        {role ? (
          <button
            className="border rounded"
            onClick={() => setActiveTap("news")}
          >
            뉴스
          </button>
        ) : (
          ""
        )}
        {
          <button
            className="border rounded"
            onClick={() => setActiveTap("article")}
          >
            커뮤니티
          </button>
        }
        {
          <button
            className="border rounded"
            onClick={() => setActiveTap("scrap")}
          >
            스크랩
          </button>
        }
      </div>

      <div className="listGroupe">
        {activeTap === "news" && <NewsList />}
        {activeTap === "article" && <ArticleList />}
        {activeTap === "scrap" && <ScrapList />}
      </div>
    </div>
  );
}
