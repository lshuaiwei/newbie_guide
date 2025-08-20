import React, { useCallback, useEffect, useState } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useGuide } from './GuideProvider';
import { guidePresets, defaultGuideStyles } from './guideSteps';
import './guide.css';

const GuideComponent = ({
  guideId = 'dashboard',
  autoStart = false,
  customSteps = null,
  customStyles = {},
  onGuideComplete,
  onGuideSkip,
  showProgress = true,
  continuous = true,
  disableOverlayClose = false,
}) => {
  const {
    isGuideRunning,
    currentGuide,
    currentStep,
    startGuide,
    stopGuide,
    completeGuide,
    skipGuide,
    isGuideCompleted,
    getGuideProgress,
  } = useGuide();

  const [joyrideKey, setJoyrideKey] = useState(0);

  // 获取引导步骤
  const getSteps = useCallback(() => {
    if (customSteps) return customSteps;
    return guidePresets[guideId]?.steps || [];
  }, [guideId, customSteps]);

  // 合并样式配置
  const mergedStyles = {
    ...defaultGuideStyles,
    ...customStyles,
    styles: {
      ...defaultGuideStyles.styles,
      ...customStyles.styles,
    },
  };

  // 处理引导回调
  const handleJoyrideCallback = useCallback((data) => {
    const { action, index, status, type, lifecycle } = data;

    console.log('Joyride callback:', { action, index, status, type, lifecycle });

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // 更新步骤索引
      if (action === ACTIONS.NEXT) {
        // 下一步逻辑已在Provider中处理
      }
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // 引导完成或跳过
      if (status === STATUS.FINISHED) {
        completeGuide(guideId);
        onGuideComplete?.(guideId);
      } else if (status === STATUS.SKIPPED) {
        skipGuide();
        onGuideSkip?.(guideId);
      }
    }
  }, [guideId, completeGuide, skipGuide, onGuideComplete, onGuideSkip]);

  // 自动开始引导
  useEffect(() => {
    if (autoStart && !isGuideCompleted(guideId)) {
      startGuide(guideId);
    }
  }, [autoStart, guideId, startGuide, isGuideCompleted]);

  // 当引导ID改变时重置Joyride
  useEffect(() => {
    setJoyrideKey(prev => prev + 1);
  }, [guideId]);

  // 如果当前引导不匹配，不渲染
  if (currentGuide !== guideId) {
    return null;
  }

  const steps = getSteps();
  const progress = showProgress ? getGuideProgress(steps.length) : 0;

  return (
    <>
      {/* 进度指示器 */}
      {showProgress && isGuideRunning && (
        <div className="guide-progress-container">
          <div className="guide-progress-bar">
            <div
              className="guide-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="guide-progress-text">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
      )}

      {/* Joyride组件 */}
      <Joyride
        key={joyrideKey}
        steps={steps}
        run={isGuideRunning}
        continuous={continuous}
        showProgress={false} // 使用自定义进度条
        showSkipButton={true}
        disableOverlayClose={disableOverlayClose}
        disableScrollParentFix={true}
        callback={handleJoyrideCallback}
        styles={mergedStyles.styles}
        locale={mergedStyles.locale}
        options={{
          ...mergedStyles.options,
          primaryColor: mergedStyles.options.primaryColor,
        }}
        floaterProps={{
          disableAnimation: false,
        }}
      />
    </>
  );
};

// 快速启动引导的Hook
export const useStartGuide = () => {
  const { startGuide, isGuideCompleted } = useGuide();

  return useCallback((guideId) => {
    if (!isGuideCompleted(guideId)) {
      startGuide(guideId);
    }
  }, [startGuide, isGuideCompleted]);
};

// 引导状态检查Hook
export const useGuideStatus = (guideId) => {
  const { isGuideCompleted, isGuideRunning, currentGuide } = useGuide();

  return {
    isCompleted: isGuideCompleted(guideId),
    isRunning: isGuideRunning && currentGuide === guideId,
    isActive: currentGuide === guideId,
  };
};

// 引导控制按钮组件
export const GuideControls = ({ guideId, className = '' }) => {
  const { startGuide, stopGuide, resetGuide, isGuideCompleted, isGuideRunning } = useGuide();
  const isCompleted = isGuideCompleted(guideId);

  return (
    <div className={`guide-controls ${className}`}>
      {!isGuideRunning && !isCompleted && (
        <button
          className="guide-btn guide-btn-start"
          onClick={() => startGuide(guideId)}
        >
          开始引导
        </button>
      )}

      {isGuideRunning && (
        <button
          className="guide-btn guide-btn-stop"
          onClick={stopGuide}
        >
          停止引导
        </button>
      )}

      {isCompleted && (
        <>
          <span className="guide-status-completed">✓ 已完成</span>
          <button
            className="guide-btn guide-btn-restart"
            onClick={() => {
              resetGuide(guideId);
              startGuide(guideId);
            }}
          >
            重新开始
          </button>
        </>
      )}
    </div>
  );
};

export default GuideComponent;
