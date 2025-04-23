import { useState } from 'react'
import EmailInput from '../user/joinComponant/EmailInput'
import NicknameInput from './NicknameInput'
import IntroduceInput from './IntroduceInput'

export default function UpdatePage() {
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [validationState, setValidationState] = useState({
    nickname: false,
    email: false,
    introduce: false
  })
  
  return (
    <div className="updateContainer">
        <div>
          <h3>프로필 편집</h3>
        </div>
        <div>
          <p>프로필이미지</p>
          <img src={image} alt='프로필 이미지' />
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

          <IntroduceInput 
            introduce={introduce}
            setIntroduce={setIntroduce}
            setValidationState={setValidationState}
            />

          <button>완료</button>
        </div>
    </div>
  )
}