import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import Notice from "./Notice";

export default function NoticeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex items-center relative" ref={dropdownRef}>
      <button onClick={handleClick} className="focus:outline-none ">
        <FontAwesomeIcon
          icon={faBell}
          className="text-orange-500 text-2xl mr-5"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-8 mt-0 w-80 bg-white border-1 border-gray-200 rounded-lg shadow-lg z-10 h-90">
          <Notice />
        </div>
      )}
    </div>
  );
}
