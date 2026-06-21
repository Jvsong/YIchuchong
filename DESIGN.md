---
name: 易趣宠 Guardian Signal
description: 以清晰安全信号连接宠物科技与真实陪伴
colors:
  brand-leaf: "#1F4D43"
  brand-mint: "#63D7B0"
  mint-deep: "#27A985"
  living-white: "#FFFFFF"
  cool-ground: "#F7FAF9"
  body-ink: "#1F2933"
  quiet-ink: "#6B7280"
  structure-line: "#DCEDE7"
typography:
  display:
    fontFamily: "PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "clamp(3.25rem, 7.2vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "clamp(2.35rem, 4.6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.76
rounded:
  control: "999px"
  media: "16px"
  surface: "14px"
  field: "12px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  section: "clamp(88px, 10vw, 152px)"
components:
  button-primary:
    backgroundColor: "{colors.brand-mint}"
    textColor: "{colors.brand-leaf}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
    height: "50px"
  button-navigation:
    backgroundColor: "{colors.brand-leaf}"
    textColor: "{colors.living-white}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  media-card:
    backgroundColor: "{colors.cool-ground}"
    rounded: "{rounded.media}"
---

# Design System: 易趣宠 Guardian Signal

## 1. Overview

**Creative North Star: "Guardian Signal / 守护信号"**

易趣宠的界面像宠物安全设备发出的清晰信号：深森林色提供可信、稳定的技术底座，鲜明薄荷绿只在需要行动或确认安全状态时出现。真实宠物摄影承担情感表达，超大而紧凑的中文标题承担品牌力量。

系统拒绝浅米色 AI 落地页、紫蓝渐变科技感、重复图标卡片、装饰性玻璃拟态、过度圆角与宽大柔和阴影。页面用一屏一个观点的节奏推进，技术证明和生活场景交替出现。

**Key Characteristics:**

- 深森林色与高亮安全绿形成明确的品牌信号。
- 全幅摄影优先，产品状态和真实场景优先于抽象装饰。
- 标题紧凑有力量，正文克制且保持可读。
- 结构依靠留白、分隔线和色块，不依赖层层卡片。
- 移动端重新编排故事，而不是机械堆叠桌面布局。

## 2. Colors

配色使用一套偏绿的冷静中性色，唯一高亮角色是 Signal Mint。

### Primary

- **Brand Leaf** (`#1F4D43`): 导航 CTA、技术区、Footer 与高可信背景。
- **Brand Mint** (`#63D7B0`): 主操作、安全在线状态和少量关键信息。
- **Mint Deep** (`#27A985`): 浅色背景上的链接、标签和交互状态。

### Neutral

- **Living White** (`#FFFFFF`): 主要内容与清晰文字反差。
- **Cool Ground** (`#F7FAF9`): 页面底色和产品故事缓冲区。
- **Body Ink** (`#1F2933`): 主要正文。
- **Quiet Ink** (`#6B7280`): 次级正文。
- **Structure Line** (`#DCEDE7`): 分隔和输入边界。

**The Signal Rarity Rule.** `#63D7B0` 只用于行动、状态和少数品牌焦点；它的稀缺性就是识别力。

## 3. Typography

**Display Font:** PingFang SC（Hiragino Sans GB / Microsoft YaHei 回退）  
**Body Font:** PingFang SC（系统中文无衬线回退）

**Character:** 中文标题像可靠设备上的清楚标记，粗壮、紧凑、不卖弄；正文有足够行距，适合解释安全与照护信息。

### Hierarchy

- **Display** (800, `clamp(3.25rem, 7.2vw, 6rem)`, 0.98): Hero 和单一品牌观点。
- **Headline** (700, `clamp(2.35rem, 4.6vw, 4.5rem)`, 1): 主要章节标题。
- **Title** (700, `1.25rem`, 1.2): 功能、内容与产品名称。
- **Body** (400, `1rem`, 1.76): 解释性内容，建议控制在 65ch 内。
- **Label** (750, `0.92rem`, `0.02em`): 少量章节语境与状态，不使用全大写中文。

**The Compact Headline Rule.** 大标题字距不得紧于 `-0.04em`，正文不继承标题的紧凑字距。

## 4. Elevation

系统默认依靠色块、影像和 1px 分隔线表达层级。静止卡片不同时使用边框和宽阴影；只有漂浮在照片上的真实状态面板允许使用短距离阴影。

### Shadow Vocabulary

- **State Panel** (`0 8px 8px rgba(31, 77, 67, 0.08)`): 仅用于地图或影像上的状态面板。
- **Quiet Lift** (`0 4px 8px rgba(31, 77, 67, 0.06)`): 小型交互控件需要与背景分离时使用。

**The Flat-by-Default Rule.** 内容表面默认平坦；深度必须表达真实叠放或交互状态。

## 5. Components

### Buttons

- **Shape:** 仅按钮使用完整胶囊圆角（`999px`）。
- **Primary:** `#63D7B0` 背景、`#1F4D43` 文字、高度 `50px`。
- **Hover / Focus:** 上移 `2px`，使用可见的绿色焦点环；active 下移 `1px`。
- **Secondary:** 白底结构线边框，或无容器的文字箭头链接。

### Chips

- **Style:** 只用于真实筛选或状态，不作为每个章节的装饰标题。
- **State:** 选中态使用 Action Green，未选中态使用浅色表面和清晰边界。

### Cards / Containers

- **Corner Style:** 媒体 `16px`，普通表面 `14px`。
- **Background:** 白色或 Cool Ground。
- **Shadow Strategy:** 默认无阴影。
- **Border:** 必要时使用 `#DCEDE7` 1px 边界。
- **Internal Padding:** `16–32px`，由内容密度决定。

### Inputs / Fields

- **Style:** 白色或深色 Footer 上的透明底，常规圆角 `12px`。
- **Focus:** Action Green 边界与清楚的外圈焦点。
- **Error / Disabled:** 保持文字说明，不能只依赖颜色。

### Navigation

白色实底、76px 桌面高度、68px 移动高度；active 使用浅绿底而非阴影。移动端菜单保留 44px 以上触控目标，主要定位器 CTA 在空间不足时隐藏。

### Safety Signal Bar

Hero 底部使用细分隔线连接实时位置、电子围栏和家庭共享；它是状态说明，不使用大数字或漂浮卡片。

## 6. Do's and Don'ts

### Do:

- **Do** 把真实宠物摄影作为首要视觉内容，并为移动端调整裁切。
- **Do** 用 `#1F4D43` 承载技术可信度，用 `#63D7B0` 表达行动和安全状态。
- **Do** 保持正文至少 4.5:1 对比度和 44px 触控目标。
- **Do** 让每个视口讲一个主要观点，并在密集与宽松段落间建立节奏。

### Don't:

- **Don't** 使用浅米色 AI 落地页或紫蓝渐变科技感。
- **Don't** 重复图标加标题加正文的等大卡片网格。
- **Don't** 使用装饰性玻璃拟态、渐变文字或无意义的漂浮数据卡。
- **Don't** 使用超过 `16px` 的普通卡片圆角，也不要同时使用细边框与宽大柔和阴影。
- **Don't** 直接复制 Fi Tracking 的黄色、品牌资产或页面文案。
