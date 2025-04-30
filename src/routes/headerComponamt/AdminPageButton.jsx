import { useNavigate } from "react-router-dom";

export default function AdminPageButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin");
  };

  return <button onClick={handleClick}>관리자 메뉴</button>;
}
