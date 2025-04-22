import {useCallback, useState} from 'react'
import axios  from '../../../api/axios';
import ErrorAlert from '../../../utils/ErrorAlert';
import { debounce } from 'lodash';

export default function UsernameCheck({username, setUsername}) {
  const [msg, setMsg] = useState('');
  const [color, setColor] = useState('');

  const debounceCheck = useCallback(
    debounce(async (input) => {
      try{
      const id = username.trim();
      const response = await axios.get('/api/user/check-username', {
        params: {username: id}
    })
    const result = response.data;
    if(result.data.exists){
      setMsg('이미 사용중인 아이디입니다.')
      setColor('red')
    }else{
      setMsg('사용 가능한 아이디입니다.')
      setColor('green')
    }
    } catch (error) {
    ErrorAlert();
    console.log('에러: ' + error)
    }
  }, 500),
  []
);

const handleChange = (e) => {
  const value = e.target.value;
  setUsername(value);
  debounceCheck(value);
};

  return (
    <>
      <label>아이디</label>
      <input
      type="text"
      value={username}
      placeholder="아이디를 입력해주세요."
      onChange={handleChange}
      /> 
    <span style={{ color }}>{ msg }</span>
    </>
  )
}