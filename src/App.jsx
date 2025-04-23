import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './utils/UserContext'
import Layout from './routes/Layout'
import Main from  './pages/news/Main'
import LoginHub from './pages/user/LoginHub'
import DomainLogin from './pages/user/loginComponant/DomainLogin'
import Join from './pages/user/Join'
import Mypage from './pages/mypage/Mypage'
import UpdatePage from './pages/mypage/UpdatePage'


// 컴포넌트를 불러와 레이아웃을 구성하고 컴포넌트를 조합해 화면에 랜더링 한다.
// 상태관리나 이벤트 헨들링도 처리한다.

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/user/login" element={<LoginHub />} />
            <Route path="/user/domain-login" element={<DomainLogin />} />
            <Route path="/user/join" element={<Join />} />
            <Route path="/user/mypage" element={<Mypage />} />
            <Route path="user/update" element={<UpdatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
