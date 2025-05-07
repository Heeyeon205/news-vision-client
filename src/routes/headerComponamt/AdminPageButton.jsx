import { useNavigate } from "react-router-dom";

export default function AdminPageButton({ setIsOpen }) {
  const navigate = useNavigate();
  const handleClick = () => {
    setIsOpen(false);
    navigate("/admin");
  };

  return (
    <button
      className="py-3 text-sm hover:bg-gray-100 transition"
      onClick={handleClick}
    >
      관리자 메뉴
    </button>
  );
}
