import { Router } from "express";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { inviteSchema, joinInviteSchema } from "@taskflow/shared";
import { prisma } from "../config/database.js";
import { authMiddleware, signToken, type AuthedRequest } from "../middleware/auth.js";
import { env } from "../config/env.js";
import { findUserByEmail, memory, publicUser } from "../store/memory.js";

export const invitationRouter = Router();

invitationRouter.get("/:token", async (req, res, next) => {
  try {
    if (env.useMemory) {
      const invitation = memory.invitations.find((item) => item.token === req.params.token);
      if (!invitation || invitation.expiresAt < new Date()) {
        return res.status(400).json({ error: "Invalid or expired invitation" });
      }
      const workspace = memory.workspaces.find((ws) => ws.id === invitation.workspaceId);
      return res.json({
        email: invitation.email,
        role: invitation.role,
        workspaceName: workspace?.name ?? "Workspace",
      });
    }
    const invitation = await prisma.invitation.findUnique({ where: { token: req.params.token } });
    if (!invitation || invitation.expiresAt < new Date()) {
      return res.status(400).json({ error: "Invalid or expired invitation" });
    }
    const workspace = await prisma.workspace.findUnique({ where: { id: invitation.workspaceId } });
    return res.json({
      email: invitation.email,
      role: invitation.role,
      workspaceName: workspace?.name ?? "Workspace",
    });
  } catch (error) {
    return next(error);
  }
});

invitationRouter.post("/:token/join", async (req, res, next) => {
  try {
    const body = joinInviteSchema.parse(req.body);
    if (env.useMemory) {
      const invitation = memory.invitations.find((item) => item.token === req.params.token);
      if (!invitation || invitation.expiresAt < new Date()) {
        return res.status(400).json({ error: "Invalid or expired invitation" });
      }
      const workspace = memory.workspaces.find((ws) => ws.id === invitation.workspaceId);
      if (!workspace) {
        return res.status(404).json({ error: "Workspace not found" });
      }
      let user = findUserByEmail(invitation.email);
      if (!user) {
        user = {
          id: memory.id(),
          email: invitation.email,
          name: body.name,
          password: await bcrypt.hash(body.password, 8),
          image: null,
        };
        memory.users.push(user);
      }
      if (!workspace.members.some((member) => member.userId === user.id)) {
        workspace.members.push({ userId: user.id, role: invitation.role });
      }
      memory.invitations.splice(memory.invitations.indexOf(invitation), 1);
      const token = signToken({ id: user.id, email: user.email });
      return res.json({ token, user: publicUser(user), workspaceId: workspace.id });
    }

    const invitation = await prisma.invitation.findUnique({ where: { token: req.params.token } });
    if (!invitation || invitation.expiresAt < new Date()) {
      return res.status(400).json({ error: "Invalid or expired invitation" });
    }
    let user = await prisma.user.findUnique({ where: { email: invitation.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: invitation.email,
          name: body.name,
          password: await bcrypt.hash(body.password, 10),
        },
      });
    }
    await prisma.workspaceMember.upsert({
      where: { workspaceId_userId: { workspaceId: invitation.workspaceId, userId: user.id } },
      update: { role: invitation.role },
      create: { workspaceId: invitation.workspaceId, userId: user.id, role: invitation.role },
    });
    await prisma.invitation.delete({ where: { id: invitation.id } });
    const token = signToken({ id: user.id, email: user.email });
    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, image: user.image },
      workspaceId: invitation.workspaceId,
    });
  } catch (error) {
    return next(error);
  }
});

export const workspacePeopleRouter = Router();
workspacePeopleRouter.use(authMiddleware);

workspacePeopleRouter.get("/:workspaceId/members", async (req: AuthedRequest, res, next) => {
  try {
    if (env.useMemory) {
      const workspace = memory.workspaces.find(
        (ws) => ws.id === req.params.workspaceId && ws.members.some((m) => m.userId === req.user!.id),
      );
      if (!workspace) {
        return res.status(404).json({ error: "Workspace not found" });
      }
      const members = workspace.members.map((member) => {
        const person = memory.users.find((item) => item.id === member.userId);
        return {
          userId: member.userId,
          role: member.role,
          name: person?.name ?? "Unknown",
          email: person?.email ?? "",
        };
      });
      const pending = memory.invitations
        .filter((item) => item.workspaceId === workspace.id)
        .map((item) => ({ id: item.id, email: item.email, role: item.role, token: item.token }));
      return res.json({ members, invitations: pending });
    }
    const workspace = await prisma.workspace.findFirst({
      where: { id: req.params.workspaceId, members: { some: { userId: req.user!.id } } },
      include: {
        members: { include: { user: true } },
        invitations: true,
      },
    });
    if (!workspace) {
      return res.status(404).json({ error: "Workspace not found" });
    }
    return res.json({
      members: workspace.members.map((member) => ({
        userId: member.userId,
        role: member.role,
        name: member.user.name,
        email: member.user.email,
      })),
      invitations: workspace.invitations.map((item) => ({
        id: item.id,
        email: item.email,
        role: item.role,
        token: item.token,
      })),
    });
  } catch (error) {
    return next(error);
  }
});

workspacePeopleRouter.post("/:workspaceId/invitations", async (req: AuthedRequest, res, next) => {
  try {
    const body = inviteSchema.parse({ ...req.body, workspaceId: req.params.workspaceId });
    const token = randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    if (env.useMemory) {
      const workspace = memory.workspaces.find(
        (ws) => ws.id === body.workspaceId && ws.members.some((m) => m.userId === req.user!.id),
      );
      if (!workspace) {
        return res.status(404).json({ error: "Workspace not found" });
      }
      const actor = workspace.members.find((m) => m.userId === req.user!.id);
      if (actor?.role !== "owner" && actor?.role !== "admin") {
        return res.status(403).json({ error: "Only owners and admins can invite people" });
      }
      const invitation = {
        id: memory.id(),
        workspaceId: workspace.id,
        email: body.email.toLowerCase(),
        role: body.role,
        token,
        expiresAt,
        createdBy: req.user!.id,
      };
      memory.invitations.push(invitation);
      const inviteLink = `${env.frontendUrl}/invite/${token}`;
      console.log(`Invite for ${invitation.email}: ${inviteLink}`);
      return res.status(201).json({ ...invitation, inviteLink });
    }

    const membership = await prisma.workspaceMember.findUnique({
      where: { workspaceId_userId: { workspaceId: body.workspaceId, userId: req.user!.id } },
    });
    if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
      return res.status(403).json({ error: "Only owners and admins can invite people" });
    }
    const invitation = await prisma.invitation.create({
      data: {
        email: body.email.toLowerCase(),
        role: body.role,
        token,
        expiresAt,
        createdBy: req.user!.id,
        workspaceId: body.workspaceId,
      },
    });
    const inviteLink = `${env.frontendUrl}/invite/${token}`;
    console.log(`Invite for ${invitation.email}: ${inviteLink}`);
    return res.status(201).json({ ...invitation, inviteLink });
  } catch (error) {
    return next(error);
  }
});
