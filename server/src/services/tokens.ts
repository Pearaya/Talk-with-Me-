import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { Role } from "@prisma/client";
import { config } from "../config";

export type AccessPayload = {
  sub: string;
  email: string;
  role: Role;
};

export type RefreshPayload = {
  sub: string;
  jti: string;
};

export function signAccessToken(payload: AccessPayload): string {
  const opts: SignOptions = {
    expiresIn: config.jwt.accessTtl as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, config.jwt.accessSecret, opts);
}

export function signRefreshToken(userId: string): {
  token: string;
  jti: string;
  expiresAt: Date;
} {
  const jti = crypto.randomUUID();
  const opts: SignOptions = {
    expiresIn: config.jwt.refreshTtl as SignOptions["expiresIn"],
  };
  const token = jwt.sign({ sub: userId, jti } satisfies RefreshPayload, config.jwt.refreshSecret, opts);
  const decoded = jwt.decode(token) as { exp: number };
  return { token, jti, expiresAt: new Date(decoded.exp * 1000) };
}

export function verifyAccessToken(token: string): AccessPayload {
  return jwt.verify(token, config.jwt.accessSecret) as AccessPayload;
}

export function verifyRefreshToken(token: string): RefreshPayload {
  return jwt.verify(token, config.jwt.refreshSecret) as RefreshPayload;
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
