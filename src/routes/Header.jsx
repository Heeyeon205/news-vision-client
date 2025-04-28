import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useUserStore";
import LogoutButton from "./headerComponamt/LogoutButton";
import Mypage from "./headerComponamt/MypageButton";

export default function Header() {
  const navigate = useNavigate();
  const { userId } = useStore();

  const handleStartClick = () => {
    navigate("/user/login");
  };

  return (
    <header>
      <Link to="/" className="logo mx-5">
        NEWSION
      </Link>
      <Link to="/" className="newsMain mx-5">
        홈
      </Link>
      <Link to="/article" className="mx-5">
        아티클
      </Link>
      <Link to="/gpt-info" className="mx-5">
        시간 없음!
      </Link>
      <Link to="/board" className="mx-5">
        커뮤니티
      </Link>
      <Link to="/search" className="mx-5">
        검색
      </Link>
      <nav>
        {userId ? (
          <>
            <Mypage />
            <LogoutButton />
          </>
        ) : (
          <button className="border rounded mx-5" onClick={handleStartClick}>
            뉴션 시작하기
          </button>
        )}
      </nav>
      <hr />
    </header>
  );
}
