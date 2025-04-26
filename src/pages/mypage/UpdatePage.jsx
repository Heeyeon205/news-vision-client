import { useState, useEffect } from "react";
import EmailInput from "../user/joinComponent/EmailInput";
import NicknameInput from "./updateComponent/NicknameInput";
import IntroduceInput from "./updateComponent/IntroduceInput";
import ProfileImageInput from "./updateComponent/ProfileImageInput";
import ErrorAlert from "../../utils/ErrorAlert";
import axios from "../../api/axios";
import UpdateSubmitButton from "./updateComponent/UpdateSubmitButton";

export default function UpdatePage() {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [_validationState, setValidationState] = useState({
    nickname: false,
    email: false,
  });

  useEffect(() => {
    async function loadUpdatePage() {
      try {
        const response = await axios.get("/api/user/info");
        const result = response.data;
        if (!result.success) {
          return;
        }
        setImage(result.data.image);
        setNickname(result.data.nickname);
        setEmail(result.data.email);
        setIntroduce(result.data.introduce);
      } catch (error) {
        ErrorAlert(error);
      }
    }
    loadUpdatePage();
  }, []);

  return (
    <div className="updateContainer">
      <div>
        <h3>프로필 편집</h3>
      </div>

      <div>
        <ProfileImageInput image={image} setImage={setImage} />
      </div>

      <div>
        <NicknameInput
          nickname={nickname}
          setNickname={setNickname}
          setValidationState={setValidationState}
        />
        <EmailInput
          email={email}
          setEmail={setEmail}
          emailCode={emailCode}
          setEmailCode={setEmailCode}
          setValidationState={setValidationState}
        />
        <IntroduceInput introduce={introduce} setIntroduce={setIntroduce} />

        <UpdateSubmitButton
          image={image}
          nickname={nickname}
          email={email}
          introduce={introduce}
        />
      </div>
    </div>
  );
}
