import { FaGoogle, FaApple } from "react-icons/fa";
import { SiNaver, SiKakaotalk } from "react-icons/si";

export default function SocialLoginButton({ provider, children }) {
  const handleLogin = () => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  let IconComponent;

  switch (provider) {
    case "google":
      IconComponent = FaGoogle;
      break;
    case "kakao":
      IconComponent = SiKakaotalk;
      break;
    case "naver":
      IconComponent = SiNaver;
      break;
    default:
      IconComponent = null;
      break;
  }

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
    >
      {IconComponent && <IconComponent className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
}
