import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { errorHandler } from "./middleware/error";
import authRoutes from "./routes/auth.routes";
import portfolioRoutes from "./routes/portfolio.routes";
import coachesRoutes from "./routes/coaches.routes";
import sessionsRoutes from "./routes/sessions.routes";
import jobsRoutes from "./routes/jobs.routes";
import goalsRoutes from "./routes/goals.routes";
import skillsRoutes from "./routes/skills.routes";
import usersRoutes from "./routes/users.routes";
import adminRoutes from "./routes/admin.routes";
import uploadRoutes, { UPLOAD_DIR } from "./routes/upload.routes";

export function createApp() {
  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );
  app.use(
    cors({
      origin: config.corsOrigin,
      credentials: true,
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  if (!config.isProd) app.use(morgan("dev"));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", env: config.nodeEnv });
  });

  // Static files (uploaded avatars, resumes, etc.)
  app.use("/uploads", express.static(UPLOAD_DIR, { maxAge: "7d" }));

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", usersRoutes);
  app.use("/api/v1/portfolio", portfolioRoutes);
  app.use("/api/v1/coaches", coachesRoutes);
  app.use("/api/v1/sessions", sessionsRoutes);
  app.use("/api/v1/jobs", jobsRoutes);
  app.use("/api/v1/goals", goalsRoutes);
  app.use("/api/v1/skills", skillsRoutes);
  app.use("/api/v1/admin", adminRoutes);
  app.use("/api/v1/upload", uploadRoutes);

  app.use((_req, res) => res.status(404).json({ error: "Not found" }));
  app.use(errorHandler);

  return app;
}
