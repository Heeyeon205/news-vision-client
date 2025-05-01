import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useUserStore';
import UserDropDownButton from './headerComponamt/UserDropDownButton';

export default function Header() {
  const navigate = useNavigate();
  const userId = useStore((state) => state.userId);

  const handleStartClick = () => {
    navigate('/user/login');
  };

  return (
    <header className="w-full  shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex items-center justify-between  md:flex-row flex-wrap md:flex-nowrap ">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-orange-500 "
        >
          NEWSION
        </Link>

        <nav className="w-full md:w-[600px] flex justify-center mt-3 order-2 md:order-none md:mt-0 space-x-4 md:space-x-8 text-base md:text-lg font-semibold ">
          <Link to="/" className="hover:text-orange-500">
            홈
          </Link>
          <Link to="/article" className="hover:text-orange-500">
            아티클
          </Link>
          <Link to="/gpt-info" className="hover:text-orange-500">
            시간 없음!
          </Link>
          <Link to="/board" className="hover:text-orange-500">
            커뮤니티
          </Link>
          <Link to="/search" className="hover:text-orange-500">
            검색
          </Link>
        </nav>

        <div className="mt-3 md:mt-0  ">
          {userId ? (
            <UserDropDownButton />
          ) : (
            <button
              onClick={handleStartClick}
              className="border border-orange-500 text-orange-500 px-4 py-1 rounded hover:bg-orange-100 transition text-base md:text-lg font-medium"
            >
              뉴션 시작하기
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
