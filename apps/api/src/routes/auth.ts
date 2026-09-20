import { Router } from "express";
import bcrypt from "bcryptjs";
import { loginSchema } from "@taskflow/shared";
import { prisma } from "../config/database.js";
import { authMiddleware, signToken, type AuthedRequest } from "../middleware/auth.js";
import { env } from "../config/env.js";
import { findUserByEmail, memory, publicUser } from "../store/memory.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    if (env.useMemory) {
      const user = findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = signToken({ id: user.id, email: user.email });
      return res.json({ token, user: publicUser(user) });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user?.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = signToken({ id: user.id, email: user.email });
    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, image: user.image },
    });
  } catch (error) {
    return next(error);
  }
});

authRouter.get("/me", authMiddleware, async (req: AuthedRequest, res, next) => {
  try {
    if (env.useMemory) {
      const user = memory.users.find((item) => item.id === req.user!.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(publicUser(user));
    }
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ id: user.id, email: user.email, name: user.name, image: user.image });
  } catch (error) {
    return next(error);
  }
});
