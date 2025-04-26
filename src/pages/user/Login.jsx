import { useNavigate } from "react-router-dom";
import SocialLoginButton from "./loginComponent/SocialLoginButton";

export default function LoginHub() {
  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate("/user/domain-login");
  };
  const moveToJoin = () => {
    navigate("/user/join");
  };
  const moveToPassword = () => {
    navigate("/user/password");
  };

  return (
    <div className="loginContainer">
      <h3>NEWSION</h3>
      <p>로그인하고 매일 나의 지식을 채워보세요</p>
      <div className="loginBtnGroup">
        <button onClick={moveToLogin}>뉴션 로그인</button>
        <br />
        <SocialLoginButton provider={"google"}>
          Google로 로그인
        </SocialLoginButton>
        <br />
        <SocialLoginButton provider={"naver"}>Naver로 로그인</SocialLoginButton>
        <br />
        <SocialLoginButton provider={"kakao"}>Kakao로 로그인</SocialLoginButton>
        <br />
        <span onClick={moveToJoin}>회원가입</span>
        <span onClick={moveToPassword}>비밀번호 찾기</span>
      </div>
    </div>
  );
}
