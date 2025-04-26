import { useState, useEffect } from "react";
import axios from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";
import UpdatePage from "./profileComponent/UpdateBtn";
import FollowerButton from "./followComponent/FollowerButton";
import FollowingButton from "./followComponent/FollowingButton";
import NewsList from "./listComponent/NewsList";
import ArticleList from "./listComponent/ArticleList";
import ScrapList from "./listComponent/ScrapList";

export default function Mypage() {
  const [role, setRole] = useState("");
  const [userImg, setUserImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [follower, setFollower] = useState("");
  const [following, setFollowing] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [activeTap, setActiveTap] = useState("article");

  useEffect(() => {
    async function loadMypage() {
      try {
        const response = await axios.get("/api/mypage");
        const result = response.data;
        if (!result.data) {
          ErrorAlert();
          return;
        }
        setRole(result.role);
        setUserImg(result.data.image);
        setNickname(result.data.nickname);
        setFollower(result.data.followerCount);
        setFollowing(result.data.followingCount);
        setIntroduce(result.data.introduce);
      } catch (error) {
        ErrorAlert(error);
      }
    }
    loadMypage();
  }, []);

  return (
    <div className="mypageContainer">
      <div className="userPortion">
        <div className="profile1">
          <img src={userImg} alt="프로필 이미지" />
          <UpdatePage />
        </div>
        <div className="profile2">
          <p>{nickname}</p>
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
            아티클
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
