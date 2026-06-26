import type { Response, CookieOptions } from "express";

type CookieName = "access_token" | "refresh_token";

export const attachHttpCookie = (
  res: Response,
  name: CookieName,
  value: string,
  options: CookieOptions = {},
) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    ...options,
  });
};

export const clearHttpCookie = (res: Response, name: CookieName) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
};
