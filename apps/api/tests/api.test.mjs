import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import path from "node:path";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";

const apiDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = "http://127.0.0.1:3101";
const demoEmail = "syed.ali@taskflow.dev";
const demoPassword = "demo1234";

let server;
let serverOutput = "";
let token;

async function apiRequest(route, { method = "GET", authToken, body } = {}) {
  return fetch(`${baseUrl}${route}`, {
    method,
    headers: {
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function waitForHealth() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/health`);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`API did not become healthy:\n${serverOutput}`);
}

before(async () => {
  server = spawn(process.execPath, ["--import", "tsx", "src/index.ts"], {
    cwd: apiDir,
    env: {
      ...process.env,
      PORT: "3101",
      USE_IN_MEMORY: "true",
      JWT_SECRET: "test-only-secret",
      CORS_ORIGIN: baseUrl,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });

  await waitForHealth();

  const response = await apiRequest("/api/auth/login", {
    method: "POST",
    body: { email: demoEmail, password: demoPassword },
  });
  assert.equal(response.status, 200, `Demo login failed:\n${serverOutput}`);
  token = (await response.json()).token;
});

after(async () => {
  if (server && server.exitCode === null) {
    server.kill("SIGTERM");
  }
});

test("health endpoint reports the in-memory store", async () => {
  const response = await apiRequest("/health");
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok", db: "memory" });
});

test("demo login returns a token and public user", async () => {
  const response = await apiRequest("/api/auth/login", {
    method: "POST",
    body: { email: demoEmail, password: demoPassword },
  });
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(typeof data.token, "string");
  assert.equal(data.user.email, demoEmail);
});

test("login rejects an invalid password", async () => {
  const response = await apiRequest("/api/auth/login", {
    method: "POST",
    body: { email: demoEmail, password: "wrong-password" },
  });
  assert.equal(response.status, 401);
  assert.match((await response.json()).error, /invalid/i);
});

test("protected routes require a bearer token", async () => {
  const response = await apiRequest("/api/workspaces");
  assert.equal(response.status, 401);
});

test("demo user can read workspaces and the seeded board", async () => {
  const workspacesResponse = await apiRequest("/api/workspaces", { authToken: token });
  assert.equal(workspacesResponse.status, 200);
  const workspaces = await workspacesResponse.json();
  assert.ok(Array.isArray(workspaces));
  assert.ok(workspaces.some((workspace) => workspace.id === "ws_northwind"));

  const boardResponse = await apiRequest("/api/boards/board_launch", { authToken: token });
  assert.equal(boardResponse.status, 200);
  const board = await boardResponse.json();
  assert.equal(board.id, "board_launch");
  assert.ok(board.lists.length > 0);
  assert.ok(board.tasks.some((task) => task.id === "task_1"));
});

test("moving a task updates its list and status", async () => {
  const response = await apiRequest("/api/tasks/task_1", {
    method: "PATCH",
    authToken: token,
    body: { listId: "list_doing" },
  });
  assert.equal(response.status, 200);
  const moved = await response.json();
  assert.equal(moved.listId, "list_doing");
  assert.equal(moved.status, "in_progress");

  const followUp = await apiRequest("/api/tasks/task_1", { authToken: token });
  assert.equal(followUp.status, 200);
  const stored = await followUp.json();
  assert.equal(stored.listId, "list_doing");
  assert.equal(stored.status, "in_progress");
});

test("a comment can be added to a task and read back", async () => {
  const body = "Verified by the API integration test.";
  const response = await apiRequest("/api/tasks/task_1/comments", {
    method: "POST",
    authToken: token,
    body: { body },
  });
  assert.equal(response.status, 201);
  assert.equal((await response.json()).body, body);

  const followUp = await apiRequest("/api/tasks/task_1", { authToken: token });
  const task = await followUp.json();
  assert.ok(task.comments.some((comment) => comment.body === body));
});
