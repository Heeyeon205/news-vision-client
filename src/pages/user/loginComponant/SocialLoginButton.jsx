export default function SocialLoginButton({provider, children}) {
  const handleLogin = () => {
    window.location.href=`http://localhost:8080/oauth2/authorization/${provider}`;
  }
  return <button onClick={handleLogin}>{children}</button>;
}