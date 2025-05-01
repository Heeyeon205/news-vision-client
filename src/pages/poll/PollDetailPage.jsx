import apiClient from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStore } from "../../store/useUserStore";
import "./PollDetail.css";
import FollowButton from "../../utils/FollowButton";

export default function PollDetailPage() {
  const logId = useStore((state) => state.userId);
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [expiredAt, setExpiredAt] = useState("");
  const [options, setOptions] = useState([]);
  const [profile, setProfile] = useState("");
  const [icon, setIcon] = useState("");
  const [badgeTitle, setBadgeTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [isFollow, setIsFollow] = useState(false);

  const [isVote, setIsVote] = useState(false);
  const totalVotes = options.reduce((sum, option) => sum + option.count, 0);

  useEffect(() => {
    const loadData = async () => {
      const res = await apiClient.get(`/api/polls/${pollId}`);
      const result = res.data;
      console.log(result.data);
      setUserId(result.data.userId);
      setTitle(result.data.title);
      setNickname(result.data.nickname);
      setCreatedAt(result.data.createdAt);
      setExpiredAt(result.data.expiredAt);
      setOptions(result.data.pollOptions);
      setIsVote(result.data.vote);
      setProfile(result.data.image);
      setIcon(result.data.icon);
      setBadgeTitle(result.data.badgeTitle);
      setIsFollow(result.data.followed);
    };
    loadData();
  }, [pollId]);

  const handleClick = async (optionId) => {
    if (!logId) {
      toast.warning("로그인 후 이용가능합니다.");
      return;
    }
    if (isVote) {
      toast.warning("이미 참여한 투표입니다.");
      return;
    }
    try {
      const res = await apiClient.post(`/api/polls/${pollId}/vote`, {
        optionId,
      });
      const result = res.data;
      console.log(res);
      console.log(res.data);
      console.log(result.data);
      setIsVote(result.data.voted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 max-w-[600px] w-full mx-auto shadow-lg mt-8 mb-6">
      <p className="inline-block text-sm text-black rounded-xl px-3 py-1 w-fit border border-orange-400 text-orange-400">
        {expiredAt}
      </p>
      <div className="mt-4 flex">
        <div className="flex-shrink-0 w-10 h-10 mr-2">
          <img
            src={profile}
            alt="유저 프로필"
            className="rounded-full w-full h-full"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center">
            <span
              className="font-medium text-gray-800 mr-1 cursor-pointer"
              onClick={() => navigate(`/userPage/${userId}`)}
            >
              {nickname}
            </span>

            <img src={icon} alt="유저 뱃지" className="w-5 h-5" />

            <span className="ml-2 text-sm text-gray-500">{createdAt}</span>
          </div>
          {badgeTitle && (
            <span className="mx-0.5 text-xs text-gray-500">{badgeTitle}</span>
          )}
        </div>

        <FollowButton targetId={userId} followed={isFollow} />
      </div>

      <div className="mt-4 border-b border-gray-300"></div>

      <p className="pt-10 text-2xl font-bold text-center mb-[60px]">{title}</p>
      {options.map((option) => (
        <div className="optionBox mb-5">
          <div key={option.id}>
            {isVote ? (
              <div className="mx-13">
                <p className="mb-2">{option.content}</p>
                <div className="flex items-center gap-2">
                  <progress
                    max={totalVotes}
                    value={option.count}
                    className="flex-8 voted-progress"
                  ></progress>
                  <span className="flex-1 text-center border border-orange-400 text-orange-400 font-medium text-sm rounded-full py-1">
                    {option.count}표
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="mx-13">
                  <p className="mb-2">{option.content}</p>
                  <div className="flex items-center gap-2">
                    <progress
                      max={totalVotes}
                      value={option.count}
                      className="flex-8 default-progress"
                    ></progress>
                    <span
                      className={`flex-1 text-center flex-1 text-center bg-orange-100 text-orange-700 font-medium text-sm rounded-full py-1
                        ${!isVote ? "cursor-pointer hover:bg-orange-200" : ""}`}
                      onClick={() => !isVote && handleClick(option.id)}
                    >
                      {option.count}표
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
}
