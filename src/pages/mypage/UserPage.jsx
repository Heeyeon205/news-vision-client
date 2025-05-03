import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/axios";
import OtherUserFollowerModal from "./profileComponent/OtherUserFollowerModal";
import OtherUserFollowingModal from "./profileComponent/OtherUserFollowingModal";
import OtherUserNewsList from "./listComponent/OtherUserNewsList";
import OtherUserArticleList from "./listComponent/OtherUserArticleList";
import OtherUserScrapList from "./listComponent/OtherUserScrapList";
import FollowButton from "../../utils/FollowButton";

export default function UserPage() {
  const { userId } = useParams();
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
  const [isFollow, setIsFollow] = useState(null);

  useEffect(() => {
    async function loadMypage() {
      try {
        const response = await apiClient.get(`/api/mypage/${userId}`);
        const result = response.data;
        console.log("남의 페이지 데이터: ", result.data);
        setRole(result.data.role);
        setUserImg(result.data.image);
        setNickname(result.data.nickname);
        setFollower(result.data.followerCount);
        setFollowing(result.data.followingCount);
        setIntroduce(result.data.introduce);
        setIcon(result.data.icon);
        setTitle(result.data.title);
        setIsFollow(result.data.followed);
        console.log("넘겨받은 팔로우드: ", result.data.followed);
      } catch (error) {
        console.log(error);
      }
    }
    loadMypage();
  }, [userId]);

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
              {isFollow !== null && (
                <FollowButton targetId={userId} followed={isFollow} />
              )}
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
              className="hover:underline cursor-pointer"
            >
              팔로워 {follower}
            </button>
            <button
              onClick={() => setIsFollowingModalOpen(true)}
              className="hover:underline cursor-pointer"
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
      ${activeTap === "news"
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
    ${activeTap === "article"
                ? "text-orange-500 border-orange-400"
                : "text-gray-500 border-transparent hover:text-orange-400 cursor-pointer"
              }`}
            onClick={() => setActiveTap("article")}
          >
            커뮤니티
          </button>
          <button
            className={`py-2 px-4 border-b-2 text-sm font-semibold transition 
    ${activeTap === "scrap"
                ? "text-orange-500 border-orange-400"
                : "text-gray-500 border-transparent hover:text-orange-400 cursor-pointer"
              }`}
            onClick={() => setActiveTap("scrap")}
          >
            스크랩
          </button>
        </div>

        <div className="w-full bg-gray-50 rounded-lg p-6 shadow-sm space-y-4">
          {activeTap === "news" && <OtherUserNewsList userId={userId} />}
          {activeTap === "article" && (
            <OtherUserArticleList userId={userId} userImg={userImg} />
          )}
          {activeTap === "scrap" && <OtherUserScrapList userId={userId} />}
        </div>
      </div>

      {isFollowerModalOpen && (
        <OtherUserFollowerModal
          userId={userId}
          onClose={() => setIsFollowerModalOpen(false)}
        />
      )}
      {isFollowingModalOpen && (
        <OtherUserFollowingModal
          userId={userId}
          onClose={() => setIsFollowingModalOpen(false)}
        />
      )}
    </div>
  );
}
