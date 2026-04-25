import { RequestHandler } from "express";
import { Role } from "@prisma/client";
import { verifyAccessToken } from "../services/tokens";
import { Forbidden, Unauthorized } from "../lib/errors";

export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;
  let token: string | undefined;

  if (header?.startsWith("Bearer ")) {
    token = header.slice("Bearer ".length);
  } else if (req.cookies?.access_token) {
    token = req.cookies.access_token;
  }

  if (!token) throw Unauthorized("Missing access token");

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    throw Unauthorized("Invalid or expired access token");
  }
};

export const requireRole =
  (...roles: Role[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) throw Unauthorized();
    if (!roles.includes(req.user.role)) throw Forbidden();
    next();
  };
