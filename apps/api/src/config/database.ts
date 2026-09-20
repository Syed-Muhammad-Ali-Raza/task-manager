import type { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

let client: PrismaClient | null = null;

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (env.useMemory) {
      throw new Error("Postgres is disabled while USE_IN_MEMORY=true");
    }
    if (!client) {
      // Dynamic require so local demo can boot without a generated Prisma client.
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PrismaClient } = require("@prisma/client") as typeof import("@prisma/client");
      client = new PrismaClient();
    }
    return client[prop as keyof PrismaClient];
  },
});
