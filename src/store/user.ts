import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserAuthInfo } from "../types/user";

interface UserAuthState {
  userAuth?: UserAuthInfo;
}

interface UserAuthAction {
  setUserAuth: (userAuth?: UserAuthInfo) => void;
}

export const useUserAuthStore = create<UserAuthState & UserAuthAction>()(
  devtools((set) => ({
    userAuth: undefined,
    setUserAuth: (userAuth) => set({ userAuth }),
  }))
);
