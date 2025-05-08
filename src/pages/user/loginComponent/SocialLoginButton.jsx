import { SiNaver, SiKakaotalk } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { BsChatFill } from "react-icons/bs";

export default function SocialLoginButton({
  provider,
  children,
  className = "",
}) {
  const handleLogin = () => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  let IconComponent;
  let iconColor = "";
  switch (provider) {
    case "google":
      IconComponent = FcGoogle;
      break;
    case "kakao":
      IconComponent = BsChatFill;
      iconColor = "#FEE500";
      break;
    case "naver":
      IconComponent = SiNaver;
      iconColor = "#03C75A";
      break;
    default:
      IconComponent = null;
      break;
  }

  return (
    <button
      onClick={handleLogin}
      className={`w-full flex items-center justify-center border border-gray-300 rounded-md py-3 px-4 text-sm font-medium cursor-pointer ${className}`}
    >
      {IconComponent && (
        <IconComponent
          className="w-5 h-5 mr-2"
          color={iconColor || undefined}
        />
      )}
      {children}
    </button>
  );
}
