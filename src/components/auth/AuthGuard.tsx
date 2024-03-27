import React, { useEffect } from "react";
import { useUserAuthStore } from "../../store/user";
import { userAPI } from "../../api/user.api";

// 유저가 로그인한 상태인지 확인하는 컴포넌트
// 모든 하위 컴포넌트에서 렌더링할때 me API를 호출하여 유저가 로그인한 상태인지 확인한다.
function AuthGuard({ children }: { children: React.ReactNode }) {
  const setUserAuth = useUserAuthStore((state) => state.setUserAuth);

  const fetchUserAuth = async () => {
    try {
      const userAuth = await userAPI.me();
      setUserAuth(userAuth);
    } catch (e) {
      setUserAuth(undefined);
    }
  };

  useEffect(() => {
    fetchUserAuth();
  });

  return <>{children}</>;
}

export default AuthGuard;
