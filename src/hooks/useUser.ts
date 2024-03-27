import { useUserAuthStore } from "../store/user";

function useUser() {
  const user = useUserAuthStore((state) => state.userAuth);
  return user;
}

export default useUser;
