import express, { type Express } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";
import { authRouter } from "./routes/auth.js";
import { workspaceRouter } from "./routes/workspaces.js";
import { taskRouter } from "./routes/tasks.js";
import { invitationRouter, workspacePeopleRouter } from "./routes/invitations.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { rateLimit } from "./middleware/rateLimit.js";

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");
  // Vercel is the only trusted reverse proxy. Locally, do not trust forwarded headers.
  app.set("trust proxy", process.env.VERCEL === "1" ? 1 : false);
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(cors({ origin: env.corsOrigin, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(morgan(env.nodeEnv === "test" ? "tiny" : "dev"));

  // Authenticated API data must never be stored by shared caches or browsers.
  app.use((_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });

  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  app.get("/health", async (_req, res) => {
    if (env.useMemory) {
      return res.json({ status: "ok", db: "memory" });
    }
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ status: "ok", db: "up" });
    } catch {
      res.status(503).json({ status: "degraded", db: "down" });
    }
  });

  const authLimiter = rateLimit({
    name: "auth",
    windowMs: env.authRateLimitWindowMs,
    max: env.authRateLimitMax,
  });
  const apiLimiter = rateLimit({
    name: "api",
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMax,
  });

  app.use("/api/auth", authLimiter);
  app.use("/api", apiLimiter);
  app.use("/api/auth", authRouter);
  app.use("/api/workspaces", workspaceRouter);
  app.use("/api/workspaces", workspacePeopleRouter);
  app.use("/api/invitations", invitationRouter);
  app.use("/api", taskRouter);

  app.use(errorHandler);
  return app;
}

export const app = createApp();
