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
    <div className="p-4 max-w-[600px] w-full mx-auto shadow-lg mt-8 mb-6">
      <div classNmae="flex justify-between items-center my-2">
        <p className="inline-block bg-gray-100 text-sm text-black rounded-xl px-3 py-0.5 w-fit">{expiredAt}</p>
      </div>
      <div className="flex flex-col text-sm text-gray-500 mt-2 space-y-2">
        <div className="flex items-center">
          <span>프로필</span>
          <span className="ml-2">{nickname}</span>
          <span className="ml-2">뱃지부분</span>
          <span className="ml-2 text-gray-400">{createdAt}</span>
        </div>
      </div>

      <p className="pt-10 text-2xl font-bold text-center mb-[60px]">{title}</p>
      {
        options.map((option) => (
          <div className="optionBox mb-5">
            <div key={option.id}>
              {isVote ? (
                <div className="mx-13">
                  <p className="mb-2">{option.content}</p>
                  <div className="flex items-center gap-2">
                    <progress max={totalVotes} value={option.count} className="flex-8 voted-progress"></progress>
                    <span className="flex-1 text-center flex-1 text-center bg-orange-100 text-orange-700 font-medium text-sm rounded-full py-1">{option.count}표</span>
                  </div>
                </div> // 투표 완료 했을때 보여주는 막대
              ) : (
                <>
                  <div className="mx-13">
                    <p className="mb-2">
                      {option.content}
                    </p>
                    <div className="flex items-center gap-2">
                      <progress max={totalVotes} value={option.count} className="flex-8 default-progress"></progress>
                      <span className={`flex-1 text-center flex-1 text-center bg-orange-100 text-orange-700 font-medium text-sm rounded-full py-1
                        ${!isVote ? "cursor-pointer hover:bg-orange-200" : ""

                        }`}
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
        ))
      }
      <div></div>
    </div>
  );
}
