export const ADMIN_SESSION_COOKIE = "yqc_admin_session";

// 运行时检查（next build 阶段跳过，node server.js 启动时生效）
if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build') {
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    throw new Error(
      '生产环境必须设置 ADMIN_USERNAME、ADMIN_PASSWORD、ADMIN_SESSION_SECRET 环境变量，' +
      '请参考 .env.example 进行配置。'
    );
  }
}

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "demo-admin-session";
export const ADMIN_SESSION_VALUE = ADMIN_SESSION_SECRET;

export function verifyAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
