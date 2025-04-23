import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../utils/UserContext'
import LogoutButton from '../pages/user/LogoutButton'
import Mypage from './headerComponamt/Mypage'

export default function Header() {
  const navigate = useNavigate(); 
  const { user } = useUser();

  const handleStartClick = () => {
    navigate('/user/login');
  };

  return (
    <header>
      <Link to='/' className='logo'>Newsion</Link>
      <Link to='/' className='newsMain'>홈</Link>
      <Link>아티클</Link>
      <Link>AI요약</Link>
      <Link>커뮤니티</Link>
      <Link>검색</Link>
      <nav>
      {user ? (
        <>
        <Mypage />
        <LogoutButton/>
        </>
      ) : (
        <button onClick={handleStartClick}>뉴션 시작하기</button>
      )}
      </nav>
      <hr/>
    </header>
  )
}