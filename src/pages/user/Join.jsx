import { useState } from "react";
import UsernameInput from "./joinComponent/UsernameInput";
import PasswordInput from "./joinComponent/PasswordInput";
import EmailInput from "./joinComponent/EmailInput";
import JoinButton from "./joinComponent/JoinButton";

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
    <div className="joinContainer">
      <h3>NEWSION</h3>
      <p>
        매일 새로운 소식과 함께,
        <br />
        여러분의 지식과 경험이 담긴 아티클을 만나보세요.
      </p>

      <UsernameInput
        username={username}
        setUsername={setUsername}
        setValidationState={setValidationState}
      />

      <PasswordInput
        password={password}
        setPassword={setPassword}
        checkPassword={checkPassword}
        setCheckPassword={setCheckPassword}
        setValidationState={setValidationState}
      />

      <EmailInput
        email={email}
        setEmail={setEmail}
        emailCode={emailCode}
        setEmailCode={setEmailCode}
        setValidationState={setValidationState}
      />

      <JoinButton
        username={username}
        password={password}
        email={email}
        validationState={validationState}
      />
    </div>
  );
}

export default Join;
