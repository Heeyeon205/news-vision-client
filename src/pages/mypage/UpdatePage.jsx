import { useState, useEffect } from "react";
import EmailInput from "../user/joinComponent/EmailInput";
import NicknameInput from "./updateComponent/NicknameInput";
import IntroduceInput from "./updateComponent/IntroduceInput";
import ProfileImageInput from "./updateComponent/ProfileImageInput";
import apiClient from "../../api/axios";
import UpdateSubmitButton from "./updateComponent/UpdateSubmitButton";
import { useStore } from "../../store/useUserStore";

export default function UpdatePage() {
  const userId = useStore((state) => state.userId);
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
        const response = await apiClient.get(`/api/user/${userId}`);
        const result = response.data;
        setImage(result.data.image);
        setNickname(result.data.nickname);
        setEmail(result.data.email);
        setIntroduce(result.data.introduce);
      } catch (error) {
        console.log(error);
      }
    }
    loadUpdatePage();
  }, [userId]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-8">프로필 편집</h2>

      <div className="flex flex-col items-start mb-8">
        <ProfileImageInput image={image} setImage={setImage} />
      </div>

      <div className="mb-6 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          닉네임
        </label>
        <div className="w-full">
          <NicknameInput
            nickname={nickname}
            setNickname={setNickname}
            setValidationState={setValidationState}
          />
        </div>
      </div>

      <div className="mb-6 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          이메일
        </label>
        <div className="w-full">
          <EmailInput
            email={email}
            setEmail={setEmail}
            emailCode={emailCode}
            setEmailCode={setEmailCode}
            setValidationState={setValidationState}
          />
        </div>
      </div>

      <div className="mb-6 w-full">
        <div className="mb-6 w-full">
          <IntroduceInput introduce={introduce} setIntroduce={setIntroduce} />
        </div>
      </div>

      <div className="flex justify-end">
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
