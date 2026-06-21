# Product Showcase Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将易趣宠设备相关页面升级为适合持续添加真实硬件与商用图的展示型商品目录。

**Architecture:** 保留现有 Product 数据结构、双语系统和路由；新增展示专用组件样式，不添加虚假价格、购物车或后端交易逻辑。借鉴 Tractive 的商品发现顺序，但沿用易趣宠原有薄荷绿主题。

**Tech Stack:** Next.js 14, React 18, TypeScript, next/image, vanilla CSS.

---

### Task 1: Product catalog

**Files:**
- Modify: `src/app/devices/page.tsx`
- Modify: `src/components/Cards.tsx`
- Modify: `src/app/globals.css`

- [ ] 将设备页改为紧凑产品 Hero、分类选择器、结果数量和展示型商品网格。
- [ ] 为 ProductCard 增加独立媒体区、状态、能力摘要和清晰详情 CTA。
- [ ] 保持筛选状态、双语文本与现有链接正常。

### Task 2: Product detail template

**Files:**
- Modify: `src/app/devices/[slug]/page.tsx`
- Modify: `src/app/globals.css`

- [ ] 使用主图、缩略图图集、产品摘要和咨询 CTA 构建首屏。
- [ ] 将能力、场景和未来联动改为可扫描的规格区块。
- [ ] 为所有现有产品 slug 保持同一模板。

### Task 3: Tracker showcase

**Files:**
- Modify: `src/app/locator/page.tsx`
- Modify: `src/app/globals.css`

- [ ] 强化定位器主产品首屏、能力规格、场景大图与 FAQ。
- [ ] 删除重复等大卡片，改为横向规格和分隔列表。

### Task 4: Verification

- [ ] 浏览器验证 `/devices`、一个动态详情页和 `/locator`。
- [ ] 检查 390px 与 1440px 无横向溢出。
- [ ] 运行 `npm run lint`、`npm run build` 和 `git diff --check`。
