// 引导步骤配置文件
export const dashboardGuideSteps = [
  {
    target: '.welcome-section',
    content: '欢迎来到我们的平台！这里是您的个人仪表板，让我们开始新手引导之旅。',
    title: '欢迎！',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '.user-profile',
    content: '这里显示您的用户信息和头像。您可以点击这里查看和编辑个人资料。',
    title: '个人资料',
    placement: 'bottom',
  },
  {
    target: '.navigation-menu',
    content: '这是主导航菜单，您可以通过这里访问平台的各个功能模块。',
    title: '导航菜单',
    placement: 'right',
  },
  {
    target: '.recent-activities',
    content: '这里显示您最近的活动记录，帮助您快速了解账户动态。',
    title: '最近活动',
    placement: 'top',
  },
  {
    target: '.quick-actions',
    content: '快速操作区域提供了常用功能的快捷入口，让您更高效地使用平台。',
    title: '快速操作',
    placement: 'left',
  },
  {
    target: '.stats-overview',
    content: '数据概览显示了您账户的关键统计信息，一目了然地掌握重要数据。',
    title: '数据概览',
    placement: 'bottom',
  },
  {
    target: '.notification-center',
    content: '通知中心会显示系统消息和重要提醒，请记得定期查看。',
    title: '通知中心',
    placement: 'left',
  },
  {
    target: '.help-center',
    content: '如果您在使用过程中遇到问题，可以点击这里获取帮助和支持。',
    title: '帮助中心',
    placement: 'top',
  },
];

// 功能介绍引导步骤
export const featureGuideSteps = [
  {
    target: '.feature-list',
    content: '这里列出了平台的核心功能，让我们逐一了解它们。',
    title: '功能概览',
    placement: 'center',
  },
  {
    target: '.feature-analytics',
    content: '数据分析功能提供了详细的数据报表和可视化图表，帮助您做出明智决策。',
    title: '数据分析',
    placement: 'bottom',
  },
  {
    target: '.feature-management',
    content: '管理中心是您进行各类配置和管理操作的地方。',
    title: '管理中心',
    placement: 'right',
  },
  {
    target: '.feature-collaboration',
    content: '协作工具让您可以与团队成员高效协作，共同完成项目。',
    title: '团队协作',
    placement: 'left',
  },
  {
    target: '.feature-settings',
    content: '在设置中心，您可以个性化配置平台以满足您的使用习惯。',
    title: '设置中心',
    placement: 'top',
  },
];

// 默认的引导样式配置
export const defaultGuideStyles = {
  options: {
    primaryColor: '#2563eb',
    zIndex: 10000,
  },
  styles: {
    tooltip: {
      borderRadius: 8,
      fontSize: '14px',
    },
    tooltipTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px',
    },
    tooltipContent: {
      color: '#4b5563',
      lineHeight: '1.5',
    },
    buttonNext: {
      backgroundColor: '#2563eb',
      borderRadius: 6,
      fontSize: '14px',
      padding: '8px 16px',
    },
    buttonBack: {
      backgroundColor: 'transparent',
      color: '#6b7280',
      fontSize: '14px',
      padding: '8px 16px',
    },
    buttonSkip: {
      backgroundColor: 'transparent',
      color: '#9ca3af',
      fontSize: '14px',
    },
  },
  locale: {
    back: '上一步',
    close: '关闭',
    last: '完成',
    next: '下一步',
    skip: '跳过',
  },
};

// 引导配置预设
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

// 用户引导状态管理
export const GUIDE_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  SKIPPED: 'skipped',
};

// 本地存储键名
export const STORAGE_KEYS = {
  GUIDE_STATUS: 'user_guide_status',
  COMPLETED_GUIDES: 'completed_guides',
  GUIDE_PREFERENCES: 'guide_preferences',
};
