import React from "react";
import { GuideProvider, GuideComponent } from "./components/Guide";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <GuideProvider>
      <div className="App">
        {/* 仪表板页面 */}
        <Dashboard />

        {/* 引导组件 */}
        <GuideComponent
          guideId="dashboard"
          autoStart={false}
          showProgress={true}
          continuous={true}
          onGuideComplete={(guideId) => {
            console.log(`引导 ${guideId} 已完成`);
          }}
          onGuideSkip={(guideId) => {
            console.log(`引导 ${guideId} 被跳过`);
          }}
        />
      </div>
    </GuideProvider>
  );
}

export default App;
