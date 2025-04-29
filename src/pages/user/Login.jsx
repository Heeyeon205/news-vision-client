import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialLoginButton from "./loginComponent/SocialLoginButton";
import DomainLogin from "./loginComponent/DomainLogin";


export default function LoginHub() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const moveToJoin = () => navigate("/user/join");
  const moveToPassword = () => navigate("/user/password");

  return (
    <div className="p-6 min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">NEWSION</h3>
        <p className="text-gray-500 mt-2 text-sm">로그인하고 매일 나의 지식을 채워보세요</p>
      </div>

      {/* 로그인 버튼 그룹 */}
      <div className="flex flex-col gap-4 w-80">
        <button
          className="w-full border border-gray-300 hover:bg-gray-100 rounded py-3 text-sm font-medium"
          onClick={openModal}
        >
          뉴션 로그인
        </button>
        <SocialLoginButton provider="google" className="hover:bg-gray-200">
          Google로 로그인
        </SocialLoginButton>
        <SocialLoginButton provider="naver" className="hover:bg-[#03C75A33]">
          Naver로 로그인
        </SocialLoginButton>
        <SocialLoginButton provider="kakao" className="hover:bg-[#FEE50033]">
          Kakao로 로그인
        </SocialLoginButton>
      </div>

      {/* 추가 링크 */}
      <div className="mt-6 flex justify-between text-sm text-orange-500 font-medium w-80">
        <span className="cursor-pointer" onClick={moveToJoin}>회원가입</span>
        <span className="cursor-pointer" onClick={moveToPassword}>비밀번호 찾기</span>
      </div>

      {/* 로그인 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 relative">
            <button className="absolute top-2 right-2 text-gray-400" onClick={closeModal}>✕</button>
            <DomainLogin closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}


