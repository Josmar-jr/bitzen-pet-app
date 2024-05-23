import type { User } from "@/services/auth";
import { AUTH_USER, RESET_PASSWORD, TOKEN, TOKEN_STALE_TIME } from "@/utils/constants";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
// import dayjs from "dayjs";

import { useNavigate } from "react-router";
import { api } from "@/services/api";
import { queryClient } from "@/providers";

export type AuthUserInfo = User;

type ResetPasswordInfo = {
  code: string | undefined;
  email: string;
};

function getUserAtomValue() {
  // backwards compatibility
  if (localStorage.getItem(TOKEN) === "undefined") {
    return null;
  }

  const user = JSON.parse(localStorage.getItem(AUTH_USER) ?? "{}") as AuthUserInfo | unknown;

  if (JSON.stringify(user) === "{}") {
    return null;
  }

  return user as AuthUserInfo;
}

export function getUserTokenAtomValue() {
  // backwards compatibility
  if (localStorage.getItem(TOKEN) === "undefined") {
    return null;
  }

  const token = JSON.parse(localStorage.getItem(TOKEN) ?? "null") as string | null;

  return token;
}

export const resetPasswordAtom = atomWithStorage<ResetPasswordInfo | null>(
  RESET_PASSWORD,
  JSON.parse(localStorage.getItem(RESET_PASSWORD) ?? "null"),
);

export const tokenStaleTimeAtom = atomWithStorage<number | null>(
  TOKEN_STALE_TIME,
  Number(localStorage.getItem(TOKEN_STALE_TIME)),
);

export const tokenAtom = atomWithStorage<string | null>(TOKEN, getUserTokenAtomValue());

export const userAtom = atomWithStorage<AuthUserInfo | null>(AUTH_USER, getUserAtomValue());

export function useAuthStore() {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [tokenStaleTime, setTokenStaleTime] = useAtom(tokenStaleTimeAtom);
  const [resetPassword, setResetPassword] = useAtom(resetPasswordAtom);

  const isLoggedIn = Boolean(token && user?.id);

  // if tokenStaleTime is undefined, so this is false
  // This is true when there's one hour diference between stale time and current time
  // const isCloseToStaleTime = tokenStaleTime
  //   ? dayjs(tokenStaleTime.toString()).diff(new Date(), "hours") <= 1
  //   : false;

  function updateLatestTokenTimestamp() {
    const date = new Date();

    // one day ahead
    date.setDate(date.getDate() + 1);

    setTokenStaleTime(date.getTime());
  }

  function userAuthentication(newUser: AuthUserInfo, newToken: string) {
    api.defaults.headers.Authorization = `Bearer ${newToken}`;
    setUser(newUser);
    setToken(newToken);

    updateLatestTokenTimestamp();
  }

  function logout() {
    setUser(null);
    setToken(null);
    setTokenStaleTime(null);

    void queryClient.invalidateQueries();

    navigate("/login");
  }

  return {
    user,
    tokenStaleTime,
    userAuthentication,
    isLoggedIn,
    logout,
    setUser,
    resetPassword,
    setResetPassword,
  };
}
