# Guardian Signal Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将易趣宠现有首页与全站品牌外壳升级为受 Fi Tracking 设计逻辑启发、但具有独立绿色品牌识别的高端影像型体验。

**Architecture:** 保留 Next.js 14 App Router、现有数据服务和页面路由，只重构首页展示结构、全局设计 token、Header/Footer 与字体加载。首页继续由服务层同步取数，避免新增客户端状态和依赖。

**Tech Stack:** Next.js 14, React 18, TypeScript, vanilla CSS, next/image, next/font, Lucide React.

---

### Task 1: Establish the Guardian Signal design foundation

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1:** 用 `next/font` 在根布局加载适合中文界面的 Noto Sans SC，并暴露 CSS 变量。
- [ ] **Step 2:** 将现有薄荷渐变 token 收敛为深森林、信号绿、纯白、冷灰和高对比文字色。
- [ ] **Step 3:** 把标题字距、行高、容器宽度、焦点环、按钮状态和 reduced-motion 统一为新设计基线。
- [ ] **Step 4:** 运行 `npm run lint`，预期无 ESLint error。

### Task 2: Recompose the homepage narrative

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/Cards.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1:** 将双栏漂浮卡 Hero 改为全幅影像 Hero，保留标题、双 CTA 与真实安全能力信号条。
- [ ] **Step 2:** 将六个等大 Collection 卡改成内容驱动的非对称媒体网格。
- [ ] **Step 3:** 将三段产品故事改成更强的全幅影像与交替文字节奏。
- [ ] **Step 4:** 将生态链路与七个定位能力卡改成克制的结构化列表，删除无意义装饰卡。
- [ ] **Step 5:** 为所有 `next/image` 补充正确的 `sizes`，Hero 保持 `priority`。

### Task 3: Simplify global navigation and conversion surfaces

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1:** 收敛桌面导航密度，强化品牌与主要产品入口，同时保留全部路由和移动菜单。
- [ ] **Step 2:** 移除 Footer 中的内联样式，把订阅区改为清楚的深色转换区，并简化服务承诺与链接层级。
- [ ] **Step 3:** 确认导航 active、hover、focus、菜单开关和 Footer 表单在移动端可用。

### Task 4: Document the resulting visual system

**Files:**
- Create: `DESIGN.md`
- Create: `.impeccable/design.json`

- [ ] **Step 1:** 将最终颜色、字体、圆角、间距和组件状态写入 Stitch-compatible frontmatter。
- [ ] **Step 2:** 记录 Guardian Signal 的使用规则和明确禁用项。
- [ ] **Step 3:** 检查文档没有 TBD、TODO 或与实际 CSS 不一致的 token。

### Task 5: Verify the redesign

**Files:**
- Verify: all modified frontend files

- [ ] **Step 1:** 运行 `npm run lint`，预期 0 error。
- [ ] **Step 2:** 运行 `npm run build`，预期 Next.js production build 成功。
- [ ] **Step 3:** 使用浏览器检查首页 DOM、导航链接、标题层级和图片 alt 文本。
- [ ] **Step 4:** 检查 `git diff --check`，预期无空白错误。
