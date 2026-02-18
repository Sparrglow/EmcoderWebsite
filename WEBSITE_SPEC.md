# EmcoderCLI 官方网站开发规范

> **版本**: v1.0  
> **最后更新**: 2025-02-15  
> **适用范围**: EmcoderCLI 官方网站前端开发

---

## 〇、技术架构基石

本规范基于以下精选技术栈制定，旨在构建高性能、安全且易于维护的静态优先（Static-First）应用。所选技术必须与下文规范紧密配合：

| 领域 | 选型 | 结合策略 |
|------|------|----------|
| **核心框架** | **Vue 3 (Composition API) & TS** | 利用 `setup` 语法糖和 Hooks 逻辑复用，TS 接口确保数据一致性（详见 2.2 节） |
| **构建工具** | **Vite** | 利用其极速 HMR 提升开发体验，通过 `import.meta.env` 管理构建时环境变量（详见 2.3 节） |
| **路由方案** | **Vue Router 4** | 配合动态导入实现路由级代码分割，确保首屏加载速度（详见 3.3 节） |
| **UI 基础** | **Radix Vue + CSS Modules** | 使用 Radix Vue Headless 组件保证无障碍访问（详见 8.1 节），配合 SCSS/CSS Modules 实现高保真像素风 |
| **国际化** | **vue-i18n** | 采用 Key-Value 分离模式，利用 Composition API (`useI18n`) 实现动态切换（详见 6.2 节） |
| **数据流** | **Native Fetch + Reactivity** | 摒弃复杂状态管理库，利用 Vue 响应式系统 (`ref/reactive`) 处理 Chat 流式响应（详见 5.2 节） |

---

## 目录

0. [技术架构基石](#零技术架构基石)
1. [核心设计原则](#一核心设计原则)
2. [内容可拔插架构](#二内容可拔插架构)
3. [页面结构规范](#三页面结构规范)
4. [组件设计规范](#四组件设计规范)
5. [API 数据层规范](#五api-数据层规范)
6. [多语言规范](#六多语言规范)
7. [UI 风格规范（商务像素风）](#七ui-风格规范商务像素风)
8. [无障碍访问规范](#八无障碍访问规范)
9. [性能规范](#九性能规范)
10. [开发者体验规范](#十开发者体验规范)
11. [变更适配指南](#十一变更适配指南)
12. [检查清单](#十二检查清单)

---

## 一、核心设计原则

### 1.1 四大原则

| 原则 | 定义 | 实践要求 |
|------|------|----------|
| **高效直达** | 用户在3步内完成核心任务 | 核心操作入口固定、路径清晰 |
| **无阻碍** | 零门槛访问核心内容 | 无强制登录、无弹窗干扰 |
| **贴心适配** | 全场景、全设备覆盖 | 响应式设计、暗色模式、无障碍 |
| **极致简洁** | 每像素都有意义 | 克制装饰、信息密度适中 |

### 1.2 可拔插优先原则

```
┌─────────────────────────────────────────────────────────────┐
│                    前端展示层（静态/SSG）                     │
│                                                              │
│  职责：页面框架、导航结构、交互逻辑                           │
│  特点：构建时生成，运行时除 Chat 外无数据依赖                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ 构建时注入 (Build Time)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    内容配置层（GitOps）                       │
│                                                              │
│  内容来源：                                                  │
│  ├── /content/*.json        静态内容配置（单一数据源）         │
│  └── /locales/*.json        多语言配置                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API 交互 (Runtime)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    AI 对话服务 (Chat API)                     │
│                                                              │
│  职责：处理用户与 AI Agent 的实时对话                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、内容可拔插架构

### 2.1 内容配置目录结构

```
frontend/
├── src/
│   ├── content/                    # 内容配置目录（Git 作为唯一数据源）
│   │   ├── meta.json              # 站点元数据
│   │   ├── navigation.json        # 导航配置
│   │   ├── skills/                # 技能模块内容
│   │   │   ├── index.json         # 技能索引
│   │   │   ├── stm32.json         # STM32 技能详情
│   │   │   └── esp32.json         # ESP32 技能详情
│   │   ├── docs/                  # 文档内容
│   │   └── faq.json               # FAQ 内容
│   │
│   ├── lib/
│   │   ├── content-loader.ts      # 构建时内容加载器
│   │   └── chat-client.ts         # Chat API 客户端
│   │
│   └── locales/                   # 标准多语言资源
│       ├── zh/
│       └── en/
```

### 2.2 内容配置格式规范

#### meta.json - 站点元数据

```json
{
  "site": {
    "name": "EmcoderCLI",
    "version": "2.0.0",
    "tagline": {
      "zh": "嵌入式 MCU 智能开发 AI Sidecar",
      "en": "AI-Powered Embedded MCU Development Sidecar"
    },
    "description": {
      "zh": "面向 STM32/ESP32 开发者的 AI 智能助手，提供代码生成、工程管理、固件烧录、硬件调试一站式体验",
      "en": "AI assistant for STM32/ESP32 developers with code generation, project management, firmware flashing, and hardware debugging"
    }
  },
  "brand": {
    "logo": "/assets/logo.svg",
    "logoDark": "/assets/logo-dark.svg",
    "favicon": "/assets/favicon.ico",
    "primaryColor": "#3B82F6",
    "accentColor": "#10B981"
  },
  "links": {
    "github": "https://github.com/xxx/emcoder-cli",
    "documentation": "/docs",
    "discord": "https://discord.gg/xxx"
  }
}
```

#### navigation.json - 导航配置

```json
{
  "main": [
    {
      "id": "home",
      "labelKey": "nav.home",
      "path": "/",
      "icon": "home"
    },
    {
      "id": "chat",
      "labelKey": "nav.chat",
      "path": "/chat",
      "icon": "message-square",
      "highlight": true
    },
    {
      "id": "skills",
      "labelKey": "nav.skills",
      "path": "/skills",
      "icon": "cpu",
      "dynamic": false
    },
    {
      "id": "docs",
      "labelKey": "nav.docs",
      "path": "/docs",
      "icon": "book-open"
    }
  ],
  "footer": [
    {
      "groupKey": "footer.product",
      "links": [
        { "labelKey": "nav.features", "path": "/features" },
        { "labelKey": "nav.chat", "path": "/chat" }
      ]
    }
  ]
}
```

#### skills/index.json - 技能索引（静态配置）

```json
{
  "skills": [
    {
      "id": "stm32",
      "status": "stable",
      "featured": true,
      "order": 1
    },
    {
      "id": "esp32",
      "status": "stable",
      "featured": true,
      "order": 2
    }
  ]
}
```

#### skills/stm32.json - 技能详情页内容

```json
{
  "id": "stm32",
  "meta": {
    "titleKey": "skills.stm32.title",
    "descriptionKey": "skills.stm32.desc"
  },
  "hero": {
    "titleKey": "skills.stm32.hero.title",
    "subtitleKey": "skills.stm32.hero.subtitle",
    "image": "/assets/skills/stm32-hero.png"
  },
  "features": [
    {
      "id": "cube-mx-protection",
      "icon": "shield-check",
      "titleKey": "skills.stm32.features.protection.title",
      "descriptionKey": "skills.stm32.features.protection.desc"
    }
  ]
}
```

### 2.3 关于 API 适配层与同步的移除

> **变更说明**：由于前端无法直接修改本地文件，且后端同步机制存在运行时风险，v1.0 版本已移除 `SkillSynchronizer` 和 `APIAdapter`。所有内容通过 Git 管理，构建时生成静态资源。


---

## 三、页面结构规范

### 3.1 页面层级结构

```
/                           # 首页
├── /features               # 功能特性
│   ├── /features/agent     # AI Agent 详情
│   └── /features/skills    # 技能系统详情
├── /skills                 # 支持平台列表（动态）
│   ├── /skills/stm32       # STM32 详情页（动态）
│   ├── /skills/esp32       # ESP32 详情页（动态）
│   └── /skills/:id         # 其他技能（动态生成）
├── /docs                   # 文档中心
│   ├── /docs/getting-started
│   ├── /docs/api
│   └── /docs/:slug
├── /download               # 下载中心
├── /changelog              # 更新日志
└── /support                # 服务支持
    └── /support/faq        # FAQ
```

### 3.2 页面组件结构

每个页面遵循统一的结构（Vue SFC）：

```vue
<!-- 页面组件结构模板 -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useSkillDetail } from '@/composables/useSkill'

const route = useRoute()
const { skill, isLoading } = useSkillDetail(route.params.id as string)

const breadcrumbs = computed(() => [
  { label: '首页', path: '/' },
  { label: '支持平台', path: '/skills' },
  { label: skill.value?.meta.title }
])
</script>

<template>
  <PageSkeleton v-if="isLoading" />
  <NotFoundPage v-else-if="!skill" />
  
  <PageLayout v-else>
    <PageHeader
      :title="skill.hero.title"
      :subtitle="skill.hero.subtitle"
      :breadcrumb="breadcrumbs"
    />
    <PageContent>
      <HeroSection :data="skill.hero" />
      <FeaturesSection :data="skill.features" />
      <CLIToolsSection :data="skill.cliTools" />
      <MCUFamiliesSection :data="skill.mcuFamilies" />
    </PageContent>
    <PageFooter />
  </PageLayout>
</template>
```

### 3.3 路由与组件映射规范

> **优化说明**：避免使用字符串引用组件，以支持 Tree-shaking 和类型安全。

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/skills/:id',
    // 路由懒加载
    component: () => import('@/pages/skills/detail.vue'),
    // 数据预加载（配合 Vue Router 守卫或 Suspense）
    meta: { preload: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404.vue')
  }
];

// 数据加载器 (组合式函数)
export function useLoadSkillDetail(id: string) {
  // 实现逻辑...
  const content = await import(`@/content/skills/${id}.json`)
  return content.default
}
```

---

## 四、组件设计规范

### 4.1 组件分类

| 分类 | 职责 | 示例 |
|------|------|------|
| **基础组件** | UI 原子，无业务逻辑 | Button, Input, Card, Badge |
| **布局组件** | 页面骨架 | PageLayout, Sidebar, Header, Footer |
| **内容组件** | 展示内容，数据驱动 | FeatureCard, SkillCard, DocSection |
| **交互组件** | 用户交互 | SearchBox, LanguageSwitcher, ChatWidget |
| **容器组件** | 数据获取与状态管理 | ChatContainer, DocsContainer |

### 4.2 内容组件规范

```vue
<!-- 内容组件使用 i18n 键值，而非硬编码对象 -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface FeatureData {
  id: string
  icon: string
  titleKey: string
  descriptionKey: string
}

const props = defineProps<{
  data: FeatureData
}>()

const { t } = useI18n()
</script>

<template>
  <Card class="feature-card">
    <Icon :name="props.data.icon" />
    <h3>{{ t(props.data.titleKey) }}</h3>
    <p>{{ t(props.data.descriptionKey) }}</p>
  </Card>
</template>
```

### 4.3 动态组件注册 (已移除)

> **优化说明**：移除运行时字符串到组件的动态映射，改为显式导入，提升代码安全性和可维护性。

---

## 五、客户端数据与 Chat 集成

### 5.1 数据策略

> **变更说明**：移除复杂的后端同步层，改为“静态内容 + 动态 Chat”模式。

| 数据类型 | 来源 | 更新频率 |
|----------|------|----------|
| 站点内容 | 本地 JSON 文件 | 构建时 |
| 技能列表 | 本地 JSON 文件 | 构建时 |
| Chat 对话 | `/api/v1/chat` | 实时 |

### 5.2 Chat API 规范

```typescript
// lib/chat-client.ts

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export const chatApi = {
  async sendMessage(messages: ChatMessage[]): Promise<ReadableStream> {
    const response = await fetch('/api/v1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    return response.body; // 支持流式响应
  }
};
```

---

## 六、多语言规范

### 6.1 语言配置

```typescript
interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

const supportedLanguages: LanguageConfig[] = [
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', rtl: false },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', rtl: false },
];

const defaultLanguage = 'zh';
```

### 6.2 翻译文件结构

```
locales/
├── zh/
│   ├── common.json      # 通用翻译
│   ├── navigation.json  # 导航翻译
│   ├── features.json    # 功能特性翻译
│   └── skills.json      # 技能相关翻译
└── en/
    ├── common.json
    ├── navigation.json
    ├── features.json
    └── skills.json
```

### 6.3 内容文件多语言 (基于 Key)

```json
{
  "id": "stm32",
  "titleKey": "skills.stm32.title",
  "descriptionKey": "skills.stm32.desc"
}
```

### 6.4 翻译使用规范

```vue
<!-- 使用 i18n Composition API -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div>
    <!-- 统一使用 key 进行翻译 -->
    <h1>{{ t('content.titleKey') }}</h1>
    <p>{{ t('content.descriptionKey') }}</p>
  </div>
</template>
```

---

## 七、UI 风格规范（商务像素风）

> **设计核心**：保留原方案的现代极简商务基调，利用 CSS/SVG 技术优化像素风在不同设备上的呈现，避免锯齿与廉价感。

### 7.1 整体风格定位

| 维度 | 定义 | 说明 |
|------|------|------|
| **主体风格** | 现代、极简、克制、商务/科技感 | 正经官方网站，突出专业性 |
| **像素定位** | **高保真网格 (Hi-Fi Grid)** | 使用矢量或 CSS 绘制的清晰像素，而非模糊位图 |
| **整体气质** | 干净、高级、有序 | 像素代表"数字化、精确"，而非"复古游戏" |
| **适配性** | **全分辨率适配** | 在 4K/Retina 屏幕上保持锐利，不使用模糊缩放 |

### 7.2 像素风使用规则（优化版）

#### ✅ 允许的像素元素

| 元素类型 | 优化实现方式 | 示例 |
|----------|----------|------|
| 小图标 | **SVG 路径绘制** (确保边缘对齐像素网格) | 功能图标 (16x16 grid) |
| 边框/描边 | `box-shadow` 硬阴影 | 卡片边框、按钮描边 |
| 分割线 | CSS `repeating-linear-gradient` | 章节分隔、虚线 |
| 背景纹理 | CSS `radial-gradient` (点阵) | 页面背景 |
| Chat 气泡 | CSS `clip-path` 或 `border-image` | 对话气泡 |

#### ❌ 禁止的像素元素

```
╔══════════════════════════════════════════════════════════════╗
║  ⛔ 绝对禁止以下元素（破坏商务感）：                           ║
║                                                              ║
║  • 位图缩放导致的模糊像素 (Nearest Neighbor 缩放除外)         ║
║  • 颜色过多的 8-bit 复古游戏角色                              ║
║  • 不等宽/变形的像素颗粒                                      ║
║  • 可能会引起摩尔纹的大面积密集纹理                           ║
╚══════════════════════════════════════════════════════════════╝
```

#### 像素样式规范 (High-DPI Ready)

```css
/* 优化：使用 CSS 绘制像素而非图片，确保任意缩放倍率清晰 */

/* 1. 像素边框 (使用 box-shadow 模拟，无抗锯齿模糊) */
.pixel-border {
  border: 1px solid var(--color-border);
  box-shadow: 2px 2px 0 0 var(--color-border); /* 硬阴影 */
}

/* 2. Chat 气泡 (仅作为一个 Chat Entry 时的核心样式) */
.chat-bubble {
  position: relative;
  border: 2px solid var(--color-primary);
  /* 简单的像素切角效果 */
  clip-path: polygon(
    2px 0, 100% 0, 
    100% calc(100% - 2px), calc(100% - 2px) 100%, 
    0 100%, 0 2px
  );
}

/* 3. 背景网格 (SVG 方案，比 CSS Gradient 性能更好且更锐利) */
.pixel-bg {
  background-image: url("data:image/svg+xml,..."); /* 1x1 像素点的 SVG */
  background-size: 20px 20px;
}
```

### 7.3 配色规范

#### 主色板（低饱和度）

```css
:root {
  /* 主色 - 低饱和蓝色，专业科技感 */
  --color-primary: #3B82F6;
  --color-primary-dark: #2563EB;
  --color-primary-light: #60A5FA;
  
  /* 强调色 - 低饱和绿色，成功/积极状态 */
  --color-accent: #10B981;
  --color-accent-dark: #059669;
  
  /* 中性色 - 黑白灰，克制统一 */
  --color-white: #FFFFFF;
  --color-background: #FAFAFA;
  --color-surface: #F5F5F5;
  --color-border: #E5E5E5;
  --color-text-muted: #737373;
  --color-text: #171717;
  --color-black: #0A0A0A;
}

/* 暗色模式 */
[data-theme="dark"] {
  --color-background: #0A0A0A;
  --color-surface: #171717;
  --color-border: #262626;
  --color-text-muted: #A3A3A3;
  --color-text: #FAFAFA;
}
```

#### 配色约束

| 规则 | 说明 |
|------|------|
| 低饱和度 | 所有颜色饱和度适中，不刺眼 |
| 统一主色 + 中性色 | 不引入额外艳色 |
| 像素元素颜色 | 必须从主色/浅灰/深灰里取 |
| 禁止渐变 | 不使用渐变色 |
| 禁止撞色 | 不使用对比过强的配色组合 |

### 7.4 排版规范

#### 字体

```css
:root {
  /* 正文字体 - 现代、清晰、专业 */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* 代码字体 - 等宽、清晰 */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* 禁止使用艺术字体、卡通字体 */
}
```

#### 排版规则

| 规则 | 说明 |
|------|------|
| 严格对齐 | 所有元素左对齐或居中对齐，无混乱布局 |
| 统一间距 | 使用 4px 基准间距系统 |
| 合理留白 | 内容区块间保持充足呼吸空间 |
| 清晰层级 | 通过字号、字重、颜色区分层级 |
| 可读性第一 | 文字永远优先于视觉装饰 |

```css
:root {
  /* 间距系统 - 4px 基准 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  
  /* 字号系统 */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}
```

### 7.5 图标与视觉元素

#### 图标规范 (优化版)

```css
/* 1. 线性极简图标 + SVG 像素化 */
.icon-linear {
  /* 使用 SVG path 确保高清 */
  stroke: currentColor;
  stroke-width: 1.5;
  fill: none;
}

/* 2. 避免使用 image-rendering: pixelated 处理矢量图标 */
/* 矢量图标应本身具备网格对齐特性 */
```

### 7.6 质感与特效 (优化版)

```css
/* 1. 像素边框 - 使用 Box Shadow 实现硬边 */
.card {
  border: 1px solid var(--color-border);
  box-shadow: 2px 2px 0 0 var(--color-border);
}

/* 2. Chat 输入框 */
.chat-input {
  border: 2px solid var(--color-border);
  border-radius: 0; /* 严格直角 */
  box-shadow: inset 2px 2px 0 rgba(0,0,0,0.05);
}

/* 3. 按钮交互 */
.btn-primary:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 0 var(--color-primary-dark);
}
```

### 7.7 响应式断点

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### 7.8 绝对禁止清单

> **AI Agent 自检清单**：以下任何一项出现，即为不合格

| 编号 | 禁止项 | 检查方法 |
|------|--------|----------|
| 1 | 卡通、萌系、幼稚、游戏化像素造型 | 视觉审查 |
| 2 | emoji、表情、卡通图案做装饰 | 代码搜索 emoji |
| 3 | 高饱和颜色、花哨渐变 | 颜色检查 |
| 4 | 像素元素大面积覆盖 | 像素占比 ≤ 10% |
| 5 | 对齐混乱、排版拥挤 | 布局审查 |
| 6 | 艺术字体、卡通字体 | 字体检查 |
| 7 | 发光、闪烁、夸张动效 | 动画审查 |
| 8 | **模糊的位图缩放** | 检查 High-DPI 表现 |

### 7.9 设计示例

#### 按钮

```css
/* 主按钮 - 像素描边风格 (High-DPI Safe) */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-white);
  background: var(--color-primary);
  border: 1px solid var(--color-primary);
  box-shadow: 2px 2px 0 0 var(--color-primary-dark); /* 无模糊半径 */
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.btn-primary:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 0 var(--color-primary-dark);
}
```

---

## 八、无障碍访问规范

### 8.1 键盘导航

```vue
<!-- 所有交互元素必须支持键盘 -->
<template>
  <Button
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    Click me
  </Button>
</template>

<!-- 焦点管理 -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// 推荐使用 @vueuse/core 的 useFocusTrap
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const target = ref()
const { activate, deactivate } = useFocusTrap(target)

onMounted(() => activate())
onUnmounted(() => deactivate())
</script>
```

### 8.2 ARIA 标签

```vue
<!-- 导航 -->
<nav aria-label="Main Navigation">
  <ul role="menubar">
    <li role="none">
      <router-link to="/chat" role="menuitem">AI Chat</router-link>
    </li>
  </ul>
</nav>

<!-- 加载状态 -->
<div role="status" aria-live="polite">
  <span v-if="isLoading">Thinking...</span>
</div>
```

### 8.3 色彩对比度 (同 WCAG 2.1 AA)
...

### 8.4 动画控制 (减弱动态)
...

---

## 九、性能规范

### 9.1 Core Web Vitals 目标
...

### 9.2 资源加载策略
...

### 9.3 缓存策略（静态资源优化）

```typescript
// 结合构建哈希 (Content Hash)
const cacheConfig = {
  immutable: {
    maxAge: 31536000,
    immutable: true,
  },
  mutable: {
    maxAge: 0,
    mustRevalidate: true,
  },
};
```

---

## 十、开发者体验规范

### 10.1 Chat API 调试

```vue
<!-- Chat 接口调试组件 -->
<template>
  <ChatDebugger>
    <MessageLog />
    <PayloadViewer />
  </ChatDebugger>
</template>
```

### 10.2 在线调试工具

```vue
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ endpoint: APIEndpoint }>()
const params = ref<Record<string, any>>({})
const response = ref<any>(null)
const loading = ref(false)

const handleExecute = async () => {
  loading.value = true
  try {
    const result = await executeAPI(props.endpoint, params.value)
    response.value = result
  } catch (error: any) {
    response.value = { error: error.message }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="api-debugger">
    <APIParameterForm
      :params="endpoint.parameters"
      v-model:values="params"
    />
    <Button @click="handleExecute" :loading="loading">
      执行
    </Button>
    <APIResponseViewer :response="response" />
  </div>
</template>
```

### 10.3 代码示例组件

```vue
<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  code: string
  language: string
  filename?: string
  showCopy?: boolean
  showLineNumbers?: boolean
}>(), {
  showCopy: true,
  showLineNumbers: true
})

const copied = ref(false)

const handleCopy = async () => {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<template>
  <div class="code-example">
    <div v-if="filename" class="code-filename">{{ filename }}</div>
    <button v-if="showCopy" @click="handleCopy" class="copy-button">
      {{ copied ? '已复制' : '复制' }}
    </button>
    <SyntaxHighlighter
      :language="language"
      :showLineNumbers="showLineNumbers"
    >
      {{ code }}
    </SyntaxHighlighter>
  </div>
</template>
```

---

## 十一、变更适配指南 (Git-based Workflow)

### 11.1 新增内容

当需要新增 Skill 或文档时：

1. **Git 操作**：在 `src/content/` 目录下创建新的 JSON 文件。
2. **提交代码**：提交到 Git 仓库。
3. **CI 构建**：触发 CI/CD 流程，重新构建静态站点。

> 不再需要后端同步服务。

### 11.2 聊天功能变更

当 Chat API 协议变更时，需更新 `lib/chat-client.ts` 适配新的流式协议。

---

## 十二、检查清单

### 12.1 架构检查

| 检查项 | 是否通过 | 说明 |
|--------|----------|------|
| 是否移除所有运行时文件写入？ | ☐ | 安全性 |
| 是否移除非 Chat 的 API 依赖？ | ☐ | 静态化 |
| 唯一动态入口是否只有 Chat？ | ☐ | 业务聚焦 |

### 12.2 UI 风格检查（High-FI Pixel）

| 编号 | 检查项 | 是否通过 | 说明 |
|------|--------|----------|------|
| 1 | 4K 屏下像素边框是否锐利？ | ☐ | 无模糊 |
| 2 | 是否使用了 SVG 替代位图？ | ☐ | 矢量化 |
| 3 | Chat 气泡是否符合像素风格？ | ☐ | 风格统一 |

---

**文档结束**
