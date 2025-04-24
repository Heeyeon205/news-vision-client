import { useState } from "react";
import UsernameInput from "../user/joinComponant/UsernameInput";
import PasswordInput from "../user/joinComponant/PasswordInput";
import EmailInput from "../user/joinComponant/EmailInput";
import JoinButton from "../user/joinComponant/JoinButton";

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

      <JoinButton validationState={validationState} />
    </div>
  );
}

export default Join;
