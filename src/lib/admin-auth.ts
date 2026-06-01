export const ADMIN_SESSION_COOKIE = "yqc_admin_session";
export const ADMIN_SESSION_VALUE = "demo-admin-session";

export function verifyAdminCredentials(username: string, password: string) {
  return username === "admin" && password === "admin123";
}
