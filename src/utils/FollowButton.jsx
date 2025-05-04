import { useState, useEffect } from "react";
import apiClient from "../api/axios";
import { toast } from "sonner";
import { useStore } from "../store/useUserStore";

export default function FollowButton({ targetId, followed }) {
  const logId = useStore((state) => state.userId);
  const [isFollow, setIsFollow] = useState(followed);

  useEffect(() => {
    setIsFollow(followed);
  }, [followed]);

  const handleClick = async () => {
    if (!logId) {
      toast.warning("로그인 후 이용 가능합니다.");
      return;
    } else if (logId === targetId) {
      return;
    }
    try {
      let res;
      if (isFollow) {
        res = await apiClient.delete(`/api/follow/${targetId}`);
        toast.success("팔로우 취소");
      } else {
        res = await apiClient.post(`/api/follow/${targetId}`);
        toast.success("팔로우 성공!");
      }
      const result = res.data;
      setIsFollow(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {logId &&
        logId !== targetId &&
        (isFollow ? (
          <button
            className="text-orange-600 text-sm font-medium hover:underline cursor-pointer"
            onClick={handleClick}
          >
            팔로잉
          </button>
        ) : (
          <button
            className="text-orange-400 text-sm font-medium hover:underline cursor-pointer"
            onClick={handleClick}
          >
            팔로우
          </button>
        ))}
    </>
  );
}
