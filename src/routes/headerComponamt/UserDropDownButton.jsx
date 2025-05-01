import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store/useUserStore";
import AdminPageButton from "./AdminPageButton.jsx";
import LogoutButton from "./LogoutButton";
import MypageBtn from "./MypageButton.jsx";
import { FaUserCircle } from "react-icons/fa";

export default function UserDropDownButton() {
  const nickname = useStore((state) => state.nickname);
  const email = useStore((state) => state.email);
  const image = useStore((state) => state.image); // ✅ 프로필 이미지
  const logRole = useStore((state) => state.role);
  const isAuth = logRole === "ROLE_ADMIN" || logRole === "ROLE_CREATOR";

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* 클릭 아이콘 */}
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 bg-white"
      >
        {image ? (
          <img src={image} alt="프로필" className="w-full h-full object-cover" />
        ) : (
          <FaUserCircle className="w-full h-full text-gray-400" />
        )}
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-md z-50 overflow-hidden">
          {/* 프로필 상단 영역 */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-300">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
              {image ? (
                <img src={image} alt="프로필" className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400" />
              )}
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-sm mb-1">{nickname || "유저명"}</p>
              <p className="text-xs text-gray-500 break-all">{email || "email@example.com"}</p>
            </div>
          </div>

          {/* 메뉴 버튼 영역 */}
          <div className="flex flex-col divide-y divide-gray-200 text-center">
            <MypageBtn />
            <LogoutButton />
            {isAuth && <AdminPageButton />}
          </div>
        </div>
      )}
    </div>
  );
}
