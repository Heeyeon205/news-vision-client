import apiClient from "../../api/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStore } from "../../store/useUserStore";
import "./PollDetail.css";

export default function PollDetailPage() {
  const logId = useStore((state) => state.userId);
  const { pollId } = useParams();
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [expiredAt, setExpiredAt] = useState("");
  const [options, setOptions] = useState([]);

  const [isVote, setIsVote] = useState(false);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    console.log(isVote);
    const loadData = async () => {
      const res = await apiClient.get(`/api/polls/${pollId}`);
      const result = res.data;
      console.log(result.data);
      setTitle(result.data.title);
      setNickname(result.data.nickname);
      setCreatedAt(result.data.createdAt);
      setExpiredAt(result.data.expiredAt);
      setOptions(result.data.pollOptions);
      setIsVote();
    };
    loadData();
  }, [pollId]);

  const handleClick = async (optionId) => {
    if (!logId) {
      toast.warning("로그인 후 이용가능합니다.");
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
      setIsVote(result.data.poll);
      setVoteCount(result.data.voteCount);
    } catch (error) {
      console.log(error);
    }
  };

  const totalVotes = options.reduce((sum, option) => sum + option.count, 0); //명보가 추가가

  return (
    <div className="p-4 max-w-[600px] w-full mx-auto">
      <div>
        <p>{expiredAt}</p>
        <p>{title}</p>
        <span>{nickname}</span>
        <span>{createdAt}</span>
      </div>

      <hr />
      {options.map((option) => (
        <div className="optionBox mb-5">
          <div key={option.id}>
            {isVote ? (
              <div>
                <p>{option.content}</p>
                <progress max={totalVotes} value={option.count} className="w-full voted-progress"></progress>
              </div> // 투표 완료 했을때 보여주는 막대
            ) : (
              <>
                <p>
                  {option.content}
                </p>
                <div>
                  <progress max={totalVotes} value={option.count} className="w-full default-progress"></progress>
                  <span>{option.count}</span>
                </div>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded mt-2"
                  onClick={() => handleClick(option.id)}
                >
                  투표하기
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
}
