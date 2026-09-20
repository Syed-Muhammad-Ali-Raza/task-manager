import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("demo1234", 10);
  const user = await prisma.user.upsert({
    where: { email: "syed.ali@taskflow.dev" },
    update: { name: "Syed Ali" },
    create: {
      email: "syed.ali@taskflow.dev",
      name: "Syed Ali",
      password,
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { slug: "northwind-studio" },
    update: {},
    create: {
      name: "Northwind Studio",
      slug: "northwind-studio",
      description: "Product, design, and launch work in one place.",
      members: { create: { userId: user.id, role: "owner" } },
    },
  });

  const existingBoard = await prisma.board.findFirst({ where: { workspaceId: workspace.id } });
  const board =
    existingBoard ??
    (await prisma.board.create({
      data: {
        workspaceId: workspace.id,
        name: "Launch board",
        description: "Shipping TaskFlow as a portfolio product",
        lists: {
          create: [
            { name: "To do", position: 0 },
            { name: "In progress", position: 1 },
            { name: "Done", position: 2 },
          ],
        },
      },
      include: { lists: true },
    }));

  const lists = await prisma.list.findMany({ where: { boardId: board.id }, orderBy: { position: "asc" } });
  const count = await prisma.task.count({ where: { boardId: board.id } });
  if (count === 0 && lists.length >= 3) {
    await prisma.task.createMany({
      data: [
        {
          boardId: board.id,
          listId: lists[0].id,
          title: "Invite a design reviewer",
          description: "Share the board and capture first comments.",
          createdBy: user.id,
          status: "todo",
          priority: "medium",
        },
        {
          boardId: board.id,
          listId: lists[1].id,
          title: "Polish kanban keyboard flow",
          description: "Move cards with arrow keys without losing focus.",
          createdBy: user.id,
          status: "in_progress",
          priority: "high",
        },
        {
          boardId: board.id,
          listId: lists[2].id,
          title: "Auth + workspace bootstrap",
          description: "Demo user and Northwind workspace seeded.",
          createdBy: user.id,
          status: "done",
          priority: "low",
        },
      ],
    });
  }

  console.log("Seeded Syed Ali — syed.ali@taskflow.dev / demo1234");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
