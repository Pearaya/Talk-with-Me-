import { Router } from "express";
import { validateBody } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../lib/asyncHandler";
import { clearAuthCookies, readRefreshCookie, setAuthCookies } from "../lib/cookies";
import { Unauthorized } from "../lib/errors";
import { loginSchema, registerSchema } from "../schemas/auth.schemas";
import * as authService from "../services/auth.service";
import { prisma } from "../lib/db";

const router = Router();

router.post(
  "/register",
  validateBody(registerSchema),
  asyncHandler(async (req, res) => {
    const tokens = await authService.register(req.body);
    setAuthCookies(res, tokens);
    res.status(201).json({ user: tokens.user });
  })
);

router.post(
  "/login",
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const tokens = await authService.login(req.body);
    setAuthCookies(res, tokens);
    res.json({ user: tokens.user });
  })
);

router.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const token = readRefreshCookie(req);
    if (!token) throw Unauthorized("Missing refresh token");
    const tokens = await authService.refresh(token);
    setAuthCookies(res, tokens);
    res.json({ user: tokens.user });
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    const token = readRefreshCookie(req);
    await authService.logout(token);
    clearAuthCookies(res);
    res.status(204).end();
  })
);

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        status: true,
        workType: true,
        currentPosition: true,
        company: true,
        createdAt: true,
      },
    });
    res.json({ user });
  })
);

export default router;
