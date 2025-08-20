// 引导组件的统一导出文件

// 样式文件
import "./guide.css";

// 核心组件
export { GuideProvider, useGuide, GuideContext } from "./GuideProvider";
export { default as GuideComponent } from "./GuideComponent";

// 控制组件
export { GuideControls, useStartGuide, useGuideStatus } from "./GuideComponent";

// 配置文件
export {
  dashboardGuideSteps,
  featureGuideSteps,
  defaultGuideStyles,
  guidePresets,
  GUIDE_STATUS,
  STORAGE_KEYS,
} from "./guideSteps";

// 默认导出
export { default } from "./GuideComponent";

// 版本信息
export const GUIDE_VERSION = "1.0.0";
