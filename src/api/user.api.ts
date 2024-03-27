import { APIResponse } from "../types/api.response";
import { UserAuthInfo } from "../types/user";
import { axiosInstance } from "./axios.instance";

export const userAPI = {
  endPoint: {
    default: "/user",
    me: "/user/me",
  },

  me: async () => {
    // TODO : 에러 처리
    const ret = await axiosInstance.get<APIResponse<UserAuthInfo>>(
      userAPI.endPoint.me
    );

    return ret.data.data as UserAuthInfo;
  },
};
