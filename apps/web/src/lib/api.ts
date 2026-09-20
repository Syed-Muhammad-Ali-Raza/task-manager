const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/proxy${endpoint}`, {
    ...options,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (response.status === 401 && typeof window !== "undefined") {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `API error ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function loginRequest(email: string, password: string) {
  const response = await fetch("/api/session/login", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? "Could not sign in");
  }
  return response.json() as Promise<{ user: { id: string; email: string; name: string | null } }>;
}

export async function joinInviteRequest(token: string, name: string, password: string) {
  const response = await fetch("/api/session/join", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, name, password }),
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? "Could not join");
  }
  return response.json() as Promise<{ user: { id: string; email: string; name: string | null } }>;
}

export async function logoutRequest() {
  await fetch("/api/session/logout", { method: "POST", credentials: "same-origin" });
}

export async function uploadFile<T>(endpoint: string, file: File, extra?: Record<string, string>): Promise<T> {
  const data = new FormData();
  data.append("file", file);
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      data.append(key, value);
    }
  }
  const response = await fetch(`/api/proxy${endpoint}`, {
    method: "POST",
    credentials: "same-origin",
    body: data,
  });
  if (response.status === 401 && typeof window !== "undefined") {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `Upload failed ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export { API_URL };

