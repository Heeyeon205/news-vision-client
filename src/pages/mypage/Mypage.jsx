import { useState, useEffect } from "react";
import apiClient from "../../api/axios";
import UpdatePage from "./profileComponent/UpdateBtn";
import FollowerModal from "./profileComponent/FollowerModal";
import FollowingModal from "./profileComponent/FollowingModal";
import NewsList from "./listComponent/NewsList";
import ArticleList from "./listComponent/ArticleList";
import ScrapList from "./listComponent/ScrapList";

export default function Mypage() {
  const [role, setRole] = useState(false);
  const [userImg, setUserImg] = useState(null);
  const [nickname, setNickname] = useState("");
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  const [introduce, setIntroduce] = useState("");
  const [activeTap, setActiveTap] = useState("article");
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");

  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

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
    <div className="flex flex-col items-center min-h-screen bg-white p-8">
      <div className="w-full max-w-md relative">
        <div className="flex flex-col items-start space-y-2 mb-8">
          <div className="flex items-start justify-between w-full">
            <img
              src={userImg}
              alt="프로필 이미지"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="ml-auto">
              <UpdatePage />
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <p className="font-bold text-xl">{nickname}</p>
            {icon && (
              <>
                <img src={icon} alt="뱃지" className="w-6 h-6" />
                <span className="text-sm text-gray-600">{title}</span>
              </>
            )}
          </div>

          <div className="flex space-x-4 text-sm text-gray-500 mt-2">
            <button
              onClick={() => setIsFollowerModalOpen(true)}
              className="hover:underline"
            >
              팔로워 {follower}
            </button>
            <button
              onClick={() => setIsFollowingModalOpen(true)}
              className="hover:underline"
            >
              팔로잉 {following}
            </button>
          </div>

          {introduce && (
            <p className="p-2 mt-4 w-full text-gray-700 text-sm break-words">
              {introduce}
            </p>
          )}
        </div>

        <div className="flex gap-6 mb-6">
          {role && (
            <button
              className={`py-2 px-4 border-b-2 text-sm font-semibold transition  
      ${
        activeTap === "news"
          ? "text-orange-500 border-orange-400"
          : "text-gray-500 border-transparent hover:text-orange-400"
      }`}
              onClick={() => setActiveTap("news")}
            >
              뉴스
            </button>
          )}
          <button
            className={`py-2 px-4 border-b-2 text-sm font-semibold transition 
    ${
      activeTap === "article"
        ? "text-orange-500 border-orange-400"
        : "text-gray-500 border-transparent hover:text-orange-400"
    }`}
            onClick={() => setActiveTap("article")}
          >
            커뮤니티
          </button>
          <button
            className={`py-2 px-4 border-b-2 text-sm font-semibold transition 
    ${
      activeTap === "scrap"
        ? "text-orange-500 border-orange-400"
        : "text-gray-500 border-transparent hover:text-orange-400"
    }`}
            onClick={() => setActiveTap("scrap")}
          >
            스크랩
          </button>
        </div>

        <div className="w-full bg-gray-50 rounded-lg p-6 shadow-sm space-y-4">
          {activeTap === "news" && <NewsList />}
          {activeTap === "article" && <ArticleList userImg={userImg} />}
          {activeTap === "scrap" && <ScrapList />}
        </div>
      </div>

      {isFollowerModalOpen && (
        <FollowerModal onClose={() => setIsFollowerModalOpen(false)} />
      )}
      {isFollowingModalOpen && (
        <FollowingModal onClose={() => setIsFollowingModalOpen(false)} />
      )}
    </div>
  );
}
