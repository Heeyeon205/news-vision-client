import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./routes/Layout";
import Main from "./pages/news/Main";
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

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
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
          <Route path="user/update" element={<UpdatePage />} />
          <Route path="/api/mypage/follower" element={<FollowerPage />} />
          <Route path="/api/mypage/following" element={<FollowingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
