import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";

export default function DropDownButton({ newsId }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleEdit = async () => {
    try {
      const response = await apiClient.get("/api/auth/check");
      const result = response.data;
      if (!result.success) {
        alert("접근 권한이 없습니다.");
        return;
      }
      navigate("/news/update-form", {
        state: {
          newsId,
        },
      });
    } catch (error) {
      ErrorAlert(error);
    }
  };

  const handleInquiry = () => {
    alert("개발 예정");
  };
  const handleShare = () => {
    alert("개발 예정");
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
          <button
            onClick={handleEdit}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            게시글 수정
          </button>
          <button
            onClick={handleInquiry}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            문의하기
          </button>
          <button
            onClick={handleShare}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            공유하기
          </button>
        </div>
      )}
    </div>
  );
}
