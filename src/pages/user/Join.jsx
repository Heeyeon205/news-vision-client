import { useState } from "react";
import UsernameInput from "./joinComponent/UsernameInput";
import PasswordInput from "./joinComponent/PasswordInput";
import EmailInput from "./joinComponent/EmailInput";
import JoinButton from "./joinComponent/JoinButton";
// import "../../assets/styles/pages/join.css"; // 이건 없어도 됨 (Tailwind로 처리)

function Join() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [validationState, setValidationState] = useState({
    username: false,
    password: false,
    email: false,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Title */}
      <div className="text-center my-4">
        <h1 className="text-2xl font-bold">회원가입</h1>
        <p className="text-gray-500 text-sm mt-2">매일 새로운 소식과 함께,</p>
        <p className="text-gray-500 text-sm mt-2">여러분의 지식과 경험이 담긴 아티클을 만나보세요.</p>
      </div>

      {/* Form */}
      <form className="space-y-4 flex flex-col items-center">
        {/* 아이디 */}
        <div className="w-80">
          <UsernameInput
            username={username}
            setUsername={setUsername}
            setValidationState={setValidationState}
          />
        </div>

        {/* 비밀번호 */}
        <div className="w-80">
          <PasswordInput
            password={password}
            setPassword={setPassword}
            checkPassword={checkPassword}
            setCheckPassword={setCheckPassword}
            setValidationState={setValidationState}
          />
        </div>

        {/* 이메일 */}
        <div className="w-80">
          <EmailInput
            email={email}
            setEmail={setEmail}
            emailCode={emailCode}
            setEmailCode={setEmailCode}
            setValidationState={setValidationState}
          />
        </div>

        {/* 가입 버튼 */}
        <div className="mt-6 w-80">
          <JoinButton
            username={username}
            password={password}
            email={email}
            validationState={validationState}
          />
        </div>
      </form>
    </div>
  );
}

export default Join;
