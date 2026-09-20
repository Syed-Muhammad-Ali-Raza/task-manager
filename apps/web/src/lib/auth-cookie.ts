export const ACCESS_COOKIE = "tf_access";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function accessCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  };
}
