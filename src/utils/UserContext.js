// 유저 정보를 전역에서 관리하기 위한 컴포넌트
import { createContext, useContext, useState } from 'react'

// createContext() => context API 함수로 전역으로 공유할 수 있는 상태 저장소를 생성한다.
// 리액트 트리 구조 어디서든 데이터를 공유할 수 있는 기반이 된다.
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    // context.Provider => context를 하위 컴포넌트에 공급한다.
    <UserContext.Provider value={{user, setUser}}>
      {children} 
    </UserContext.Provider>
  );
}
// useUser은 [user, setUser]를 감싼 커스텀 훅.
// useUser()만 호출하면 바로 {user, setUser}를 얻을 수 있다.
export const useUser = () => useContext(UserContext)