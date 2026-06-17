# 易趣宠 — 阿里云宝塔服务器部署设计

**日期**: 2026-06-17
**目标**: 将 Next.js 项目部署到阿里云 ECS（8.138.31.44，宝塔 Linux 面板）

## 架构

```
用户 → Nginx(:80) → next start(:3000) ← PM2 守护
                         ↓
               /api/pet-advice → DeepSeek API (env: DEEPSEEK_API_KEY)
```

## 第一节：代码修复

1. `src/lib/admin-auth.ts` — 凭证从环境变量读取，不再硬编码
2. `src/app/api/admin/login/route.ts` — Cookie 加 `secure: true`
3. `next.config.mjs` — 加 `output: 'standalone'`

## 第二节：服务器环境

- 宝塔面板安装 Node.js v20 + Nginx
- npm i -g pm2
- 项目目录: `/www/wwwroot/yiquchong`

## 第三节：部署

- 本地 build → 打包 `.next` + `public` + `node_modules` + `package.json` → 上传
- 创建 `.env.production` 配置环境变量
- PM2 start + Nginx 反向代理

## 第四节：验证

- 首页可访问
- /admin/login 可登录
- PM2 守护正常
