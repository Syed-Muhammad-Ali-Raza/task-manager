import "dotenv/config";

function positiveNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const nodeEnv = process.env.NODE_ENV ?? "development";
const jwtSecret = process.env.JWT_SECRET;

if (nodeEnv === "production" && !jwtSecret) {
  throw new Error("JWT_SECRET must be set in production");
}

export const env = {
  nodeEnv,
  port: positiveNumber(process.env.PORT, 3001),
  jwtSecret: jwtSecret ?? "dev-only-change-me",
  databaseUrl: process.env.DATABASE_URL ?? "",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
  useMemory: process.env.USE_IN_MEMORY !== "false",
  rateLimitWindowMs: positiveNumber(process.env.RATE_LIMIT_WINDOW_MS, 300_000),
  rateLimitMax: positiveNumber(process.env.RATE_LIMIT_MAX, 300),
  authRateLimitWindowMs: positiveNumber(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 900_000),
  authRateLimitMax: positiveNumber(process.env.AUTH_RATE_LIMIT_MAX, 10),
};
