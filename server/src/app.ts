import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { errorHandler } from "./middleware/error";
import authRoutes from "./routes/auth.routes";
import portfolioRoutes from "./routes/portfolio.routes";

export function createApp() {
  const app = express();

  app.use(helmet());
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

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/portfolio", portfolioRoutes);

  app.use((_req, res) => res.status(404).json({ error: "Not found" }));
  app.use(errorHandler);

  return app;
}
