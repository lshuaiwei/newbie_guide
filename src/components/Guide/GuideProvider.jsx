import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { GUIDE_STATUS, STORAGE_KEYS } from "./guideSteps";

// 创建引导上下文
const GuideContext = createContext();

// 初始状态
const initialState = {
  isGuideRunning: false,
  currentGuide: null,
  currentStep: 0,
  guideStatus: GUIDE_STATUS.NOT_STARTED,
  completedGuides: JSON.parse(
    localStorage.getItem(STORAGE_KEYS.COMPLETED_GUIDES) || "[]",
  ),
  userPreferences: JSON.parse(
    localStorage.getItem(STORAGE_KEYS.GUIDE_PREFERENCES) || "{}",
  ),
};

// Action类型
const ACTIONS = {
  START_GUIDE: "START_GUIDE",
  STOP_GUIDE: "STOP_GUIDE",
  NEXT_STEP: "NEXT_STEP",
  PREVIOUS_STEP: "PREVIOUS_STEP",
  SET_STEP: "SET_STEP",
  COMPLETE_GUIDE: "COMPLETE_GUIDE",
  SKIP_GUIDE: "SKIP_GUIDE",
  UPDATE_PREFERENCES: "UPDATE_PREFERENCES",
  RESET_GUIDE: "RESET_GUIDE",
};

// Reducer函数
function guideReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_GUIDE:
      return {
        ...state,
        isGuideRunning: true,
        currentGuide: action.payload.guideId,
        currentStep: 0,
        guideStatus: GUIDE_STATUS.IN_PROGRESS,
      };

    case ACTIONS.STOP_GUIDE:
      return {
        ...state,
        isGuideRunning: false,
        currentGuide: null,
        currentStep: 0,
        guideStatus: GUIDE_STATUS.NOT_STARTED,
      };

    case ACTIONS.NEXT_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };

    case ACTIONS.PREVIOUS_STEP:
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
      };

    case ACTIONS.SET_STEP:
      return {
        ...state,
        currentStep: action.payload.step,
      };

    case ACTIONS.COMPLETE_GUIDE:
      const newCompletedGuides = [...state.completedGuides];
      if (!newCompletedGuides.includes(action.payload.guideId)) {
        newCompletedGuides.push(action.payload.guideId);
      }

      // 保存到本地存储
      localStorage.setItem(
        STORAGE_KEYS.COMPLETED_GUIDES,
        JSON.stringify(newCompletedGuides),
      );

      return {
        ...state,
        isGuideRunning: false,
        currentGuide: null,
        currentStep: 0,
        guideStatus: GUIDE_STATUS.COMPLETED,
        completedGuides: newCompletedGuides,
      };

    case ACTIONS.SKIP_GUIDE:
      return {
        ...state,
        isGuideRunning: false,
        currentGuide: null,
        currentStep: 0,
        guideStatus: GUIDE_STATUS.SKIPPED,
      };

    case ACTIONS.UPDATE_PREFERENCES:
      const newPreferences = { ...state.userPreferences, ...action.payload };
      localStorage.setItem(
        STORAGE_KEYS.GUIDE_PREFERENCES,
        JSON.stringify(newPreferences),
      );

      return {
        ...state,
        userPreferences: newPreferences,
      };

    case ACTIONS.RESET_GUIDE:
      const resetCompletedGuides = state.completedGuides.filter(
        (id) => id !== action.payload.guideId,
      );
      localStorage.setItem(
        STORAGE_KEYS.COMPLETED_GUIDES,
        JSON.stringify(resetCompletedGuides),
      );

      return {
        ...state,
        completedGuides: resetCompletedGuides,
        guideStatus: GUIDE_STATUS.NOT_STARTED,
      };

    default:
      return state;
  }
}

// Provider组件
export const GuideProvider = ({ children }) => {
  const [state, dispatch] = useReducer(guideReducer, initialState);

  // 开始引导
  const startGuide = useCallback((guideId) => {
    dispatch({ type: ACTIONS.START_GUIDE, payload: { guideId } });
  }, []);

  // 停止引导
  const stopGuide = useCallback(() => {
    dispatch({ type: ACTIONS.STOP_GUIDE });
  }, []);

  // 下一步
  const nextStep = useCallback(() => {
    dispatch({ type: ACTIONS.NEXT_STEP });
  }, []);

  // 上一步
  const previousStep = useCallback(() => {
    dispatch({ type: ACTIONS.PREVIOUS_STEP });
  }, []);

  // 跳转到指定步骤
  const goToStep = useCallback((step) => {
    dispatch({ type: ACTIONS.SET_STEP, payload: { step } });
  }, []);

  // 完成引导
  const completeGuide = useCallback((guideId) => {
    dispatch({ type: ACTIONS.COMPLETE_GUIDE, payload: { guideId } });
  }, []);

  // 跳过引导
  const skipGuide = useCallback(() => {
    dispatch({ type: ACTIONS.SKIP_GUIDE });
  }, []);

  // 更新用户偏好
  const updatePreferences = useCallback((preferences) => {
    dispatch({ type: ACTIONS.UPDATE_PREFERENCES, payload: preferences });
  }, []);

  // 重置引导状态
  const resetGuide = useCallback((guideId) => {
    dispatch({ type: ACTIONS.RESET_GUIDE, payload: { guideId } });
  }, []);

  // 检查引导是否已完成
  const isGuideCompleted = useCallback(
    (guideId) => {
      return state.completedGuides.includes(guideId);
    },
    [state.completedGuides],
  );

  // 获取引导进度
  const getGuideProgress = useCallback(
    (totalSteps) => {
      if (!state.isGuideRunning) return 0;
      return Math.round(((state.currentStep + 1) / totalSteps) * 100);
    },
    [state.isGuideRunning, state.currentStep],
  );

  // 上下文值
  const value = {
    // 状态
    ...state,

    // 操作方法
    startGuide,
    stopGuide,
    nextStep,
    previousStep,
    goToStep,
    completeGuide,
    skipGuide,
    updatePreferences,
    resetGuide,

    // 辅助方法
    isGuideCompleted,
    getGuideProgress,
  };

  return (
    <GuideContext.Provider value={value}>{children}</GuideContext.Provider>
  );
};

// 自定义Hook
export const useGuide = () => {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error("useGuide must be used within a GuideProvider");
  }
  return context;
};

// 导出上下文以供高级用法
export { GuideContext };

// 确保有默认导出
export default GuideProvider;
