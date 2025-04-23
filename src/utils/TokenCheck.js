import axios from '../api/axios';
import ErrorAlert from './ErrorAlert';

export async function checkAuthAndMove(navigate, targetUrl) {
  try {
    const response = await axios.get('/api/auth/check');
    const result = response.data;

    if (!result.success) {
      alert('로그인 후 이용해 주세요.');
      navigate('/user/login');
      return false;
    }
    navigate(targetUrl);
    return true;
  } catch (error) {
    ErrorAlert();
    console.log(error);
    return false;
  }
}
