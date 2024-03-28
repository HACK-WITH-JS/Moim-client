import { APIResponse } from "../types/api.response";
import { UserAuthInfo } from "../types/user";
import { axiosInstance } from "./axios.instance";

export const userAPI = {
  endPoint: {
    default: "/user",
    me: "/user/me",
    update: "/user",
    delete: "/user",
  },

  me: async () => {
    const ret = await axiosInstance.get<APIResponse<UserAuthInfo>>(
      userAPI.endPoint.me
    );

    return ret.data.data as UserAuthInfo;
  },

  update: async (data: UserAuthInfo) => {
    const ret = await axiosInstance.put<APIResponse<UserAuthInfo>>(
      userAPI.endPoint.update,
      data
    );

    return ret.data.data as UserAuthInfo;
  },

  delete: async () => {
    const ret = await axiosInstance.delete<APIResponse<UserAuthInfo>>(
      userAPI.endPoint.delete
    );

    return ret.data.data as UserAuthInfo;
  },
};
