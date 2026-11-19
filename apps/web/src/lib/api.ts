import { apiErrors, type ApiErrorKey } from "@/i18n/api-errors";
import { defaultLocale, hasLocale, localizedPath, type Locale } from "@/i18n/config";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function currentLocale(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const lang = document.documentElement.lang;
  return hasLocale(lang) ? lang : defaultLocale;
}

function message(key: ApiErrorKey, status?: number): string {
  const text = apiErrors[currentLocale()][key];
  return status === undefined ? text : `${text} ${status}`;
}

const knownApiErrors: Record<string, ApiErrorKey> = {
  Unauthorized: "unauthorized",
};

function errorMessage(
  body: { error?: string },
  fallback: ApiErrorKey,
  status?: number,
): string {
  const known = body.error ? knownApiErrors[body.error] : undefined;
  if (known) return message(known);
  return body.error ?? message(fallback, status);
}

function redirectToLogin() {
  if (typeof window !== "undefined") {
    window.location.assign(localizedPath(currentLocale(), "/login"));
  }
}

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/proxy${endpoint}`, {
    ...options,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (response.status === 401) {
    redirectToLogin();
    throw new Error(message("unauthorized"));
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(errorMessage(body, "apiError", response.status));
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
    throw new Error(errorMessage(body, "couldNotSignIn"));
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
    throw new Error(errorMessage(body, "couldNotJoin"));
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
  if (response.status === 401) {
    redirectToLogin();
    throw new Error(message("unauthorized"));
  }
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(errorMessage(body, "uploadFailed", response.status));
  }
  return response.json() as Promise<T>;
}

export { API_URL };
