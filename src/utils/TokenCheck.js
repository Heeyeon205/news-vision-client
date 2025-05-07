import apiClient from '../api/axios';

export async function checkAuthAndMove(navigate, targetUrl) {
  try {
    await apiClient.get('/api/auth/check');
    navigate(targetUrl);
    return true;
  } catch (error) {
    console.log(error);
  }
}
