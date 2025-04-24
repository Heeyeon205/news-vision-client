import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./utils/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./routes/Layout";
import Main from "./pages/news/Main";
import LoginHub from "./pages/user/Login";
import DomainLogin from "./pages/user/loginComponant/DomainLogin";
import Join from "./pages/user/Join";
import Mypage from "./pages/mypage/Mypage";
import UpdatePage from "./pages/mypage/UpdatePage";
import FollowerPage from "./pages/mypage/FollowerPage";
import FollowingPage from "./pages/mypage/FollowingPage";
import ArticlePage from "./pages/mypage/ArticlePage";

// 컴포넌트를 불러와 레이아웃을 구성하고 컴포넌트를 조합해 화면에 랜더링 한다.
// 상태관리나 이벤트 헨들링도 처리한다.

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/user/login" element={<LoginHub />} />
            <Route path="/user/domain-login" element={<DomainLogin />} />
            <Route path="/user/join" element={<Join />} />
            <Route path="/user/mypage" element={<Mypage />} />
            <Route path="user/update" element={<UpdatePage />} />
            <Route path="/api/mypage/follower" element={<FollowerPage />} />
            <Route path="/api/mypage/following" element={<FollowingPage />} />
            <Route path="/api/mypage/Article" element={<ArticlePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
