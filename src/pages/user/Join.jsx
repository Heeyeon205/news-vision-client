import { useState } from 'react'
import ErrorAlert from '../../utils/ErrorAlert';
import UsernameInput from '../user/joinComponant/UsernameInput'
import PasswordInput from '../user/joinComponant/PasswordInput'

function Join() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');

  const codeBtn = async () => {

  }

  const joinBtn = async () => {
    try{

    }catch(error){
      ErrorAlert();
      console.log('에러: ', error);
    }
  }

  return (
    <div className="joinContainer">
      <h3>NEWSION</h3>
      <p>매일 새로운 소식과 함께,<br/>
      여러분의 지식과 경험이 담긴 아티클을 만나보세요.</p>

      <UsernameInput username={username} setUsername={setUsername}/>
      <br/>

      <PasswordInput password={password} setPassword={setPassword}/>
      <br/>

        <label>비밀번호 (8자 이상)</label><br/>
      <input
        type="text"
        value={password}
        placeholder="비밀번호를 입력해주세요."
        onChange={setPassword}
        /> 
        <span>체크</span> <br/>

        <label>비밀번호 확인</label><br/>
      <input
        type="text"
        value={checkPassword}
        placeholder="비밀번호를 한번 더 입력해주세요."
        onChange={setCheckPassword}
        /> 
        <span>체크</span> <br/>

        <label>이메일</label><br/>
      <input
        type="email"
        value={email}
        placeholder="이메일을 입력해주세요."
        onChange={setEmail}
        />
      <button onClick={codeBtn}>인증하기 </button><br/>

        <label>인증번호</label><br/>
      <input
        type="text"
        value={emailCode}
        placeholder="인증번호를 입력해주세요."
        onChange={setEmailCode}
        /> 
        <button onClick={codeBtn}>인증확인 </button> <br/>

        <button onClick={joinBtn}>회원가입</button>
    </div>
  )
}

export default Join;