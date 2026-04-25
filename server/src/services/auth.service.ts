import bcrypt from "bcryptjs";
import { prisma } from "../lib/db";
import { Conflict, Unauthorized } from "../lib/errors";
import {
  hashToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./tokens";

type RegisterInput = {
  email: string;
  password: string;
  name: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw Conflict("Email already in use", "EMAIL_TAKEN");

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      passwordHash,
    },
  });

  return issueTokens(user.id, user.email, user.role);
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw Unauthorized("Invalid email or password");

  const ok = await bcrypt.compare(input.password, user.passwordHash);
  if (!ok) throw Unauthorized("Invalid email or password");

  return issueTokens(user.id, user.email, user.role);
}

export async function refresh(token: string) {
  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw Unauthorized("Invalid refresh token");
  }

  const tokenHash = hashToken(token);
  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash },
  });

  if (!stored || stored.userId !== payload.sub || stored.revokedAt) {
    throw Unauthorized("Refresh token revoked or unknown");
  }
  if (stored.expiresAt < new Date()) {
    throw Unauthorized("Refresh token expired");
  }

  // Rotate: revoke old, issue new
  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { revokedAt: new Date() },
  });

  const user = await prisma.user.findUniqueOrThrow({ where: { id: payload.sub } });
  return issueTokens(user.id, user.email, user.role);
}

export async function logout(token: string | undefined) {
  if (!token) return;
  try {
    const tokenHash = hashToken(token);
    await prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  } catch {
    /* ignore */
  }
}

async function issueTokens(userId: string, email: string, role: import("@prisma/client").Role) {
  const accessToken = signAccessToken({ sub: userId, email, role });
  const { token: refreshToken, expiresAt } = signRefreshToken(userId);

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: hashToken(refreshToken),
      expiresAt,
    },
  });

  return { accessToken, refreshToken, user: { id: userId, email, role } };
}
