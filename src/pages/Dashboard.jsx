import React, { useState } from 'react';
import { GuideControls, useStartGuide, useGuideStatus } from '../components/Guide';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const startGuide = useStartGuide();
  const { isCompleted, isRunning } = useGuideStatus('dashboard');

  const handleStartGuide = () => {
    startGuide('dashboard');
  };

  return (
    <div className="dashboard">
      {/* 顶部导航栏 */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="app-title">新手引导系统</h1>
            <span className="version-badge">v1.0</span>
          </div>

          <div className="user-profile">
            <div className="user-avatar">
              <img src="/api/placeholder/40/40" alt="用户头像" />
            </div>
            <div className="user-info">
              <span className="user-name">李师傅</span>
              <span className="user-role">产品经理</span>
            </div>
          </div>
        </div>
      </header>

      {/* 欢迎区域 */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h2>欢迎回来！</h2>
          <p>这是您的个人仪表板，您可以在这里查看重要信息和执行各种操作。</p>
          <div className="guide-starter">
            <GuideControls guideId="dashboard" />
            {!isCompleted && !isRunning && (
              <button
                className="quick-start-btn"
                onClick={handleStartGuide}
              >
                🚀 开始新手引导
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <main className="dashboard-main">
        {/* 导航菜单 */}
        <nav className="navigation-menu">
          <h3>导航菜单</h3>
          <ul className="nav-list">
            <li className={activeTab === 'overview' ? 'active' : ''}>
              <button onClick={() => setActiveTab('overview')}>
                📊 概览
              </button>
            </li>
            <li className={activeTab === 'analytics' ? 'active' : ''}>
              <button onClick={() => setActiveTab('analytics')}>
                📈 数据分析
              </button>
            </li>
            <li className={activeTab === 'management' ? 'active' : ''}>
              <button onClick={() => setActiveTab('management')}>
                ⚙️ 管理中心
              </button>
            </li>
            <li className={activeTab === 'collaboration' ? 'active' : ''}>
              <button onClick={() => setActiveTab('collaboration')}>
                👥 团队协作
              </button>
            </li>
            <li className={activeTab === 'settings' ? 'active' : ''}>
              <button onClick={() => setActiveTab('settings')}>
                🔧 设置
              </button>
            </li>
          </ul>
        </nav>

        {/* 内容区域 */}
        <div className="content-area">
          {/* 数据概览 */}
          <section className="stats-overview">
            <h3>数据概览</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <span className="stat-value">1,234</span>
                  <span className="stat-label">活跃用户</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <span className="stat-value">56.7%</span>
                  <span className="stat-label">转化率</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-value">¥89,432</span>
                  <span className="stat-label">月收入</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <span className="stat-value">99.9%</span>
                  <span className="stat-label">系统稳定性</span>
                </div>
              </div>
            </div>
          </section>

          {/* 最近活动 */}
          <section className="recent-activities">
            <h3>最近活动</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🎉</div>
                <div className="activity-content">
                  <p>新用户注册数量突破10,000！</p>
                  <span className="activity-time">2小时前</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📊</div>
                <div className="activity-content">
                  <p>月度报告已生成，请及时查看</p>
                  <span className="activity-time">4小时前</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🔧</div>
                <div className="activity-content">
                  <p>系统维护计划已安排在明天凌晨</p>
                  <span className="activity-time">1天前</span>
                </div>
              </div>
            </div>
          </section>

          {/* 快速操作 */}
          <section className="quick-actions">
            <h3>快速操作</h3>
            <div className="actions-grid">
              <button className="action-btn">
                <span className="action-icon">➕</span>
                <span className="action-text">创建新项目</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📤</span>
                <span className="action-text">导出数据</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">👥</span>
                <span className="action-text">邀请成员</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📋</span>
                <span className="action-text">查看报告</span>
              </button>
            </div>
          </section>
        </div>

        {/* 侧边栏 */}
        <aside className="sidebar">
          {/* 通知中心 */}
          <section className="notification-center">
            <h3>通知中心</h3>
            <div className="notification-list">
              <div className="notification-item unread">
                <div className="notification-dot"></div>
                <div className="notification-content">
                  <p>系统更新提醒</p>
                  <span className="notification-time">刚刚</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-content">
                  <p>新功能上线通知</p>
                  <span className="notification-time">1小时前</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-content">
                  <p>安全提醒</p>
                  <span className="notification-time">3小时前</span>
                </div>
              </div>
            </div>
          </section>

          {/* 帮助中心 */}
          <section className="help-center">
            <h3>帮助中心</h3>
            <div className="help-links">
              <a href="#" className="help-link">
                <span className="help-icon">📚</span>
                <span>使用文档</span>
              </a>
              <a href="#" className="help-link">
                <span className="help-icon">🎥</span>
                <span>视频教程</span>
              </a>
              <a href="#" className="help-link">
                <span className="help-icon">💬</span>
                <span>在线客服</span>
              </a>
              <a href="#" className="help-link">
                <span className="help-icon">📞</span>
                <span>联系我们</span>
              </a>
            </div>
          </section>

          {/* 功能列表 */}
          <section className="feature-list">
            <h3>功能模块</h3>
            <div className="feature-grid">
              <div className="feature-item feature-analytics">
                <div className="feature-icon">📊</div>
                <span className="feature-name">数据分析</span>
              </div>
              <div className="feature-item feature-management">
                <div className="feature-icon">⚙️</div>
                <span className="feature-name">系统管理</span>
              </div>
              <div className="feature-item feature-collaboration">
                <div className="feature-icon">👥</div>
                <span className="feature-name">团队协作</span>
              </div>
              <div className="feature-item feature-settings">
                <div className="feature-icon">🔧</div>
                <span className="feature-name">个人设置</span>
              </div>
            </div>
          </section>
        </aside>
      </main>

      {/* 底部信息 */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>&copy; 2024 新手引导系统. 保留所有权利.</p>
          <div className="footer-links">
            <a href="#">隐私政策</a>
            <a href="#">服务条款</a>
            <a href="#">帮助中心</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
