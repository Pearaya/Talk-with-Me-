import { CookieOptions, Response } from "express";
import { config } from "../config";

const REFRESH_COOKIE = "refresh_token";
const ACCESS_COOKIE = "access_token";

const baseOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: config.cookie.secure,
  path: "/",
};

export function setAuthCookies(
  res: Response,
  tokens: { accessToken: string; refreshToken: string }
) {
  res.cookie(ACCESS_COOKIE, tokens.accessToken, {
    ...baseOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie(REFRESH_COOKIE, tokens.refreshToken, {
    ...baseOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE, baseOptions);
  res.clearCookie(REFRESH_COOKIE, baseOptions);
}

export function readRefreshCookie(req: { cookies?: Record<string, string> }) {
  return req.cookies?.[REFRESH_COOKIE];
}
