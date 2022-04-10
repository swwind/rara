import { createContext } from "react";

export type UserInfo = {
  nickname: string;
  homepage: string;
  avatarType: "email" | "github" | "qq";
  email: string;
  github: string;
  qq: string;
};

export const defaultUserInfo: UserInfo = {
  nickname: "",
  homepage: "",
  avatarType: "email",
  email: "",
  github: "",
  qq: "",
};

export const UserInfoContext = createContext<{
  userInfo: UserInfo;
  setUserInfo: (userInfo: Partial<UserInfo>) => void;
}>({ userInfo: defaultUserInfo, setUserInfo: () => {} });
