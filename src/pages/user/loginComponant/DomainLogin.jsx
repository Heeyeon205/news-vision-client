import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios'
import { useUser } from '../../../utils/UserContext'
import ErrorAlert from '../../../utils/ErrorAlert';

function DomainLogin() {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();

  const loginBtn = async (e) => {
    e.preventDefault(); 
    try{
      const response = await axios.post('/api/auth/login', {username, password});
      const result = response.data;
      const { nickname, accessToken, refreshToken } = result.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(nickname);
      alert('로그인 성공!');
      navigate('/');
    }catch(error){
      console.log(error)
      ErrorAlert('아이디 및 비밀번호를 확인해 주세요.');
    }
  }

  return(
    <div>
      <h3>NEWSION</h3>
      <p>로그인하고 매일 나의 지식을 채워보세요</p>
      <form className="loginContainer" onSubmit={loginBtn}>
        <input
          type="text"
          placeholder='아이디를 입력해 주세요.'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />       
        <input
          type="password"
          placeholder='비밀번호를 입력해 주세요.'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button type="submit">로그인</button>
        </form>
    </div>
  );
}

export default DomainLogin;