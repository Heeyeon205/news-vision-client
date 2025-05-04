import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";
import { useStore } from "../../store/useUserStore";
import BoardDeleteButton from "./BoardDeleteButton";
import ShareButton from "../../utils/ShareButton";

export default function BoardDropDownButton({
  boardId,
  userId,
  onReportClick,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [own, setOwn] = useState(false);
  const logId = useStore((state) => state.userId);
  const [isLog, setLog] = useState(false);

  useEffect(() => {
    if (logId === userId) {
      setOwn(true);
    } else {
      setOwn(false);
    }
  }, [logId, userId]);

  useEffect(() => {
    if (logId) {
      setLog(true);
    } else {
      setLog(false);
    }
  }, [logId]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleEdit = async () => {
    try {
      await apiClient.get("/api/auth/check");
      navigate("/board/update-form", {
        state: {
          boardId: Number(boardId),
        },
      });
    } catch (error) {
      ErrorAlert(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        onClick={handleClick}
        className="cursor-pointer"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ShareButton />
          {own ? (
            <>
              <button
                onClick={handleEdit}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                게시글 수정
              </button>
              <BoardDeleteButton boardId={boardId} />
            </>
          ) : (
            isLog && (
              <button
                onClick={onReportClick} // 모달 열기 함수 호출
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                신고하기
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
