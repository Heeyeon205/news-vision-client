import { FaUserCircle } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";

import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store/useUserStore";
import AdminPageButton from "./AdminPageButton.jsx";
import LogoutButton from "./LogoutButton";
import MypageBtn from "./MypageButton.jsx";

export default function UserDropDownButton() {
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className=" text-orange-500 px-3 py-2 rounded hover:bg-orange-100 transition"
      >
        <FaUserCircle className="inline-block" size={30} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
          <div className="flex flex-col px-4 py-2 space-y-2">
            <MypageBtn />
            <LogoutButton />
            {isAuth && <AdminPageButton />}
          </div>
        </div>
      )}
    </div>
  );
}
