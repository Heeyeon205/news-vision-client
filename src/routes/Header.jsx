import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useUserStore';
import UserDropDownButton from './headerComponamt/UserDropDownButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faMagnifyingGlass);

export default function Header() {
  const navigate = useNavigate();
  const userId = useStore((state) => state.userId);

  const handleStartClick = () => {
    navigate('/user/login');
  };

  return (
    <header
      className="w-full  shadow-sm"
      style={{ fontFamily: 'ONE-Mobile-Title' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex items-center justify-between  sm:flex-row flex-wrap sm:flex-nowrap ">
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold text-orange-500 mt-1  "
        >
          NEWSION
        </Link>

        <nav className=" w-full sm:w-[500px]  flex  justify-center sm:mr-23 mr-0  mt-10   order-2 sm:order-none sm:mt-0 space-x-4 sm:space-x-8 text-base sm:text-lg font-semibold ">
          <Link
            to="/"
            className=" h-[32px] border-b-3 border-transparent text-black font-medium hover:text-orange-500  hover:border-orange-500 "
          >
            홈
          </Link>
          <Link
            to="/article"
            className="h-[32px]  border-b-3 border-transparent text-black font-medium hover:text-orange-500 hover:border-orange-500 "
          >
            아티클
          </Link>
          <Link
            to="/gpt-info"
            className="h-[32px]  border-b-3 border-transparent text-black  font-medium hover:text-orange-500 hover:border-orange-500 "
          >
            핵심 브리핑
          </Link>
          <Link
            to="/board"
            className="h-[32px]  border-b-3 border-transparent text-black  font-medium hover:text-orange-500 hover:border-orange-500 "
          >
            커뮤니티
          </Link>
          <Link
            to="/search"
            className="group h-[32px] border-b-3 border-transparent text-black font-medium hover:text-orange-500 hover:border-orange-500 "
          >
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              className="text-black font-medium hover:border-orange-500 hover:text-orange-500 "
            />
          </Link>
        </nav>

        <div className="mt-3 md:mt-0  ">
          {userId ? (
            <UserDropDownButton />
          ) : (
            <button
              onClick={handleStartClick}
              className="border border-orange-500 text-orange-500 px-4 py-1 rounded hover:bg-orange-100 transition text-base sm:text-lg font-medium"
            >
              뉴션 시작하기
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
