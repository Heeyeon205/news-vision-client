import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useUserStore";
import LogoutButton from "./headerComponamt/LogoutButton";
import Mypage from "./headerComponamt/MypageButton";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useStore();

  const handleStartClick = () => {
    navigate("/user/login");
  };

  return (
    <header>
      <Link to="/" className="logo">
        Newsion
      </Link>
      <Link to="/" className="newsMain">
        홈
      </Link>
      <Link>아티클</Link>
      <Link to="/gpt-info">AI요약</Link>
      <Link>커뮤니티</Link>
      <Link>검색</Link>
      <nav>
        {user ? (
          <>
            <Mypage />
            <LogoutButton />
          </>
        ) : (
          <button className="border rounded" onClick={handleStartClick}>
            뉴션 시작하기
          </button>
        )}
      </nav>
      <hr />
    </header>
  );
}
