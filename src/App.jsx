import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Toaster } from "sonner";

import Layout from "./routes/Layout";

import Login from "./pages/user/Login";
import DomainLogin from "./pages/user/loginComponent/DomainLogin";
import Authentication from "./pages/user/Authentication";
import FindPassword from "./pages/user/FindPassword";
import UpdatePassword from "./pages/user/UpdatePassword";
import Join from "./pages/user/Join";

import Mypage from "./pages/mypage/Mypage";
import UpdatePage from "./pages/mypage/UpdatePage";
import FollowerPage from "./pages/mypage/profileComponent/FollowerPage";
import FollowingPage from "./pages/mypage/profileComponent/FollowingPage";

import Main from "./pages/news/Main";
import NewsDetail from "./pages/news/NewsDetailPage";
import NewsCreatePage from "./pages/news/NewsCreatePage";
import NewsCreateNewsPage from "./pages/news/NewsCreateNewsPage";
import NewsUpdatePage from "./pages/news/NewsUpdatePage";

import ArticleMainPage from "./pages/article/ArticleMainPage";

import InfoPage from "./pages/ai/InfoPage";
import GptMainPage from "./pages/ai/GptMainPage";

import BoardMainPage from "./pages/board/BoardMainPage";
import BoardDetailPage from "./pages/board/BoardDetailPage";

import SearchMainPage from "./pages/search/SearchMainPage";
import BoardCreatePage from "./pages/board/BoardCreatePage";
import BoardUpdatePage from "./pages/board/BoardUpdatePage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />

          <Route path="/user/join" element={<Join />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/domain-login" element={<DomainLogin />} />
          <Route path="/oauth2/redirect" element={<Authentication />} />
          <Route path="/user/password" element={<FindPassword />} />
          <Route path="/user/update-password" element={<UpdatePassword />} />
          <Route path="/user/mypage" element={<Mypage />} />
          <Route path="/user/update" element={<UpdatePage />} />
          <Route path="/api/mypage/follower" element={<FollowerPage />} />
          <Route path="/api/mypage/following" element={<FollowingPage />} />

          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/news/create-form" element={<NewsCreatePage />} />
          <Route path="/news/create-news" element={<NewsCreateNewsPage />} />
          <Route path="/news/update-form" element={<NewsUpdatePage />} />

          <Route path="/article" element={<ArticleMainPage />} />

          <Route path="/gpt-info" element={<InfoPage />} />
          <Route path="/gpt-news" element={<GptMainPage />} />

          <Route path="/board" element={<BoardMainPage />} />
          <Route path="/board/:id" element={<BoardDetailPage />} />
          <Route path="/board/create-form" element={<BoardCreatePage />} />
          <Route path="/board/update-form" element={<BoardUpdatePage />} />

          <Route path="/search" element={<SearchMainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
