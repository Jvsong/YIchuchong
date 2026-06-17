export const ADMIN_SESSION_COOKIE = "yqc_admin_session";

/** 生产环境从环境变量读取，本地开发使用演示值 */
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "demo-admin-session";
export const ADMIN_SESSION_VALUE = ADMIN_SESSION_SECRET;

export function verifyAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
