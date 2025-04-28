import { FaGoogle, FaApple } from "react-icons/fa";
import { SiNaver, SiKakaotalk } from "react-icons/si"; // ✅ 수정

export default function SocialLoginButton({ provider, children, onClick }) {
  let IconComponent;

  switch (provider) {
    case "google":
      IconComponent = FaGoogle;
      break;
    case "apple":
      IconComponent = FaApple;
      break;
    case "kakao":
      IconComponent = SiKakaotalk; // ✅ SiKakaotalk로 수정
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
      onClick={onClick}
      className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
    >
      {IconComponent && <IconComponent className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
}
