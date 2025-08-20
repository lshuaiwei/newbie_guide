# React 新手引导系统

一个基于 `react-joyride` 的完整新手引导解决方案，提供丰富的引导功能和优秀的用户体验。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![React Joyride](https://img.shields.io/badge/react--joyride-2.5.2-green.svg)

## ✨ 特性

- 🚀 **开箱即用** - 基于 react-joyride 的完整封装
- 🎯 **功能丰富** - 支持多种引导模式和自定义配置
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎨 **主题定制** - 支持深色模式和高对比度模式
- 🔧 **易于集成** - 简单的 API 设计，快速接入现有项目
- 💾 **状态持久化** - 自动保存用户引导进度
- ♿ **无障碍支持** - 遵循 WCAG 无障碍标准
- 🌐 **国际化** - 支持多语言配置

![Demo](public/showdemo.gif)

## 📦 安装

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

## 🚀 快速开始

### 1. 启动开发服务器

```bash
npm start
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 2. 基础使用

```jsx
import React from 'react';
import { GuideProvider, GuideComponent } from './components/Guide';

function App() {
  return (
    <GuideProvider>
      <div className="App">
        {/* 你的应用内容 */}
        <YourAppContent />

        {/* 引导组件 */}
        <GuideComponent
          guideId="dashboard"
          autoStart={false}
          showProgress={true}
        />
      </div>
    </GuideProvider>
  );
}
```

### 3. 自定义引导步骤

```jsx
const customSteps = [
  {
    target: '.my-element',
    content: '这是一个自定义引导步骤',
    title: '步骤标题',
    placement: 'bottom',
  },
  // 更多步骤...
];

<GuideComponent
  guideId="custom"
  customSteps={customSteps}
  onGuideComplete={(guideId) => {
    console.log(`引导 ${guideId} 已完成`);
  }}
/>
```

## 📖 核心概念

### GuideProvider

引导系统的上下文提供者，管理全局引导状态。

```jsx
import { GuideProvider } from './components/Guide';

function App() {
  return (
    <GuideProvider>
      {/* 你的应用 */}
    </GuideProvider>
  );
}
```

### GuideComponent

核心引导组件，负责渲染引导界面。

**Props:**

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `guideId` | `string` | `'dashboard'` | 引导唯一标识 |
| `autoStart` | `boolean` | `false` | 是否自动开始引导 |
| `customSteps` | `Array` | `null` | 自定义引导步骤 |
| `showProgress` | `boolean` | `true` | 是否显示进度条 |
| `continuous` | `boolean` | `true` | 是否连续模式 |
| `onGuideComplete` | `function` | - | 引导完成回调 |
| `onGuideSkip` | `function` | - | 引导跳过回调 |

### useGuide Hook

用于在组件中访问引导状态和方法。

```jsx
import { useGuide } from './components/Guide';

function MyComponent() {
  const {
    isGuideRunning,
    currentGuide,
    startGuide,
    stopGuide,
    isGuideCompleted
  } = useGuide();

  return (
    <button onClick={() => startGuide('dashboard')}>
      开始引导
    </button>
  );
}
```

## 🎛️ API 参考

### useGuide

```typescript
interface GuideContextType {
  // 状态
  isGuideRunning: boolean;
  currentGuide: string | null;
  currentStep: number;
  guideStatus: string;
  completedGuides: string[];
  userPreferences: object;

  // 操作方法
  startGuide: (guideId: string) => void;
  stopGuide: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  completeGuide: (guideId: string) => void;
  skipGuide: () => void;
  updatePreferences: (preferences: object) => void;
  resetGuide: (guideId: string) => void;

  // 辅助方法
  isGuideCompleted: (guideId: string) => boolean;
  getGuideProgress: (totalSteps: number) => number;
}
```

### 引导步骤配置

```typescript
interface GuideStep {
  target: string;           // CSS 选择器
  content: string;          // 引导内容
  title?: string;           // 标题
  placement?: string;       // 位置：'top' | 'bottom' | 'left' | 'right' | 'center'
  disableBeacon?: boolean;  // 禁用信标
  isFixed?: boolean;        // 固定定位
  offset?: number;          // 偏移量
  spotlightClicks?: boolean; // 允许点击聚光灯区域
}
```

## 🎨 样式定制

### CSS 变量

系统使用 CSS 变量来定义主题，你可以通过覆盖这些变量来自定义样式：

```css
:root {
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --text-primary: #111827;
  --bg-primary: #ffffff;
  /* 更多变量... */
}
```

### 自定义样式

```jsx
const customStyles = {
  options: {
    primaryColor: '#ff6b6b',
    zIndex: 10000,
  },
  styles: {
    tooltip: {
      borderRadius: 8,
      fontSize: '16px',
    },
    buttonNext: {
      backgroundColor: '#ff6b6b',
    },
  },
  locale: {
    back: '返回',
    close: '关闭',
    last: '完成',
    next: '下一步',
    skip: '跳过',
  },
};

<GuideComponent customStyles={customStyles} />
```

## 🌐 国际化

系统支持多语言配置：

```jsx
const localeConfig = {
  back: 'Previous',
  close: 'Close',
  last: 'Finish',
  next: 'Next',
  skip: 'Skip',
};
```

## 📱 响应式支持

系统完全响应式设计，自动适配不同屏幕尺寸：

- **桌面端** (>1024px): 完整功能体验
- **平板端** (768px-1024px): 优化布局
- **移动端** (<768px): 精简界面

## ♿ 无障碍支持

- 键盘导航支持 (Tab, Enter, Esc)
- 屏幕阅读器友好
- 高对比度模式支持
- 减少动画选项支持

## 🔧 配置选项

### 全局配置

```jsx
// src/components/Guide/guideSteps.js
export const defaultGuideStyles = {
  options: {
    primaryColor: '#2563eb',
    zIndex: 10000,
  },
  locale: {
    back: '上一步',
    close: '关闭',
    last: '完成',
    next: '下一步',
    skip: '跳过',
  },
};
```

### 预设配置

```jsx
export const guidePresets = {
  dashboard: {
    steps: dashboardGuideSteps,
    continuous: true,
    showProgress: true,
    showSkipButton: true,
  },
  features: {
    steps: featureGuideSteps,
    continuous: true,
    showProgress: true,
    showSkipButton: true,
  },
};
```

## 📂 项目结构

```
src/
├── components/
│   └── Guide/
│       ├── GuideProvider.jsx      # 上下文提供者
│       ├── GuideComponent.jsx     # 核心引导组件
│       ├── guideSteps.js          # 引导步骤配置
│       ├── guide.css              # 引导样式
│       └── index.js               # 统一导出
├── pages/
│   ├── Dashboard.jsx              # 示例仪表板
│   └── Dashboard.css              # 仪表板样式
├── App.jsx                        # 主应用组件
├── App.css                        # 应用样式
├── index.js                       # 应用入口
└── index.css                      # 全局样式
```

## 🛠️ 开发指南

### 本地开发

1. 克隆项目
```bash
git clone <repository-url>
cd newbie_guide
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 运行测试
npm test

# 代码格式检查
npm run lint
```

### 添加新的引导

1. 在 `guideSteps.js` 中定义步骤：

```jsx
export const myGuideSteps = [
  {
    target: '.my-target',
    content: '引导内容',
    title: '步骤标题',
    placement: 'bottom',
  },
  // 更多步骤...
];
```

2. 在组件中使用：

```jsx
<GuideComponent
  guideId="my-guide"
  customSteps={myGuideSteps}
/>
```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 使用 ESLint 进行代码检查
- 遵循 React Hooks 最佳实践
- 编写有意义的注释
- 添加适当的 PropTypes 或 TypeScript 类型

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [react-joyride](https://github.com/gilbarbara/react-joyride) - 优秀的引导库
- [React](https://reactjs.org/) - 用户界面库
- 所有贡献者和社区成员


---

**如果这个项目对你有帮助，请给个 ⭐ Star！**
