import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../utils/ErrorAlert';
import UsernameInput from '../user/joinComponant/UsernameInput'
import PasswordInput from '../user/joinComponant/PasswordInput'
import EmailInput from '../user/joinComponant/EmailInput'
import axios from '../../api/axios';
function Join() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const navigate = useNavigate();
  const [validationState, setValidationState] = useState({
    username: false,
    password: false,
    email: false
  });

  const joinBtn = async () => {
    try{
      if(!validationState.username || !validationState.password || !validationState.email){
        alert('모든 인증을 받아야합니다.')
        return;
      }
      const response = await axios.post('/api/user/join', { username, password, email });
      console.log(response)
      const result = response.data;
      console.log(response.data)
      if(!result.success) { ErrorAlert(); return }
      alert('회원가입 성공');
      navigate('/');
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

      <button onClick={joinBtn}>회원가입</button>
    </div>
  )
}

export default Join;