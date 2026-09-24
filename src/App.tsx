// =============================================
// App.tsx — Pocket 3 新手拍摄教程 · 路由总入口
// Platform: H5 (Ant Design Mobile)
// =============================================
// 路由结构：
//   /onboarding/*         — Flow 1: 首次设置引导（无 TabBar）
//   /scene/:id/*          — Flow 2: 场景拍摄指导（无 TabBar）
//   /checklist/*          — Flow 3: 拍前检查清单（TabBar 内）
//   /tips/*               — Flow 4: 进阶技巧探索（TabBar 内）
//   /                     — 首页（TabBar 内）
//   /settings             — 设置（TabBar 内）
// =============================================

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// App Shell（含 TabBar）
import { AppShell } from './flows/pocket3-tutorial/AppShell'

// 首页 + 设置
import { Home } from './flows/shared/Home'
import { Settings } from './flows/shared/Settings'

// Flow 1: 首次设置引导
import {
  Screen1_Welcome,
  Screen2_SelectDevice,
  Screen3_BasicSetup,
  Screen4_SelectScene,
} from './flows/flow-1/flow1-quick-setup'

// Flow 2: 场景拍摄指导
import {
  Screen1_ParamsOverview,
  Screen2_StepGuide,
  Screen3_ExampleComparison,
  Screen4_SceneTips,
  Screen5_ReferenceCard,
} from './flows/flow-2/flow2-scene-guide'

// Flow 3: 拍前检查清单
import {
  Screen1_ChecklistOverview,
  Screen2_ItemDetail,
  Screen3_CompletionSummary,
} from './flows/flow-3/flow3-checklist'

// Flow 4: 进阶技巧探索
import {
  Screen1_TipsList,
  Screen2_TipDetail,
  Screen3_LearningCompletion,
} from './flows/flow-4/flow4-advanced-tips'

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* ── Flow 1: Onboarding（无 TabBar，全屏沉浸） ── */}
        <Route path="/onboarding" element={<Screen1_Welcome />} />
        <Route path="/onboarding/device" element={<Screen2_SelectDevice />} />
        <Route path="/onboarding/setup" element={<Screen3_BasicSetup />} />
        <Route path="/onboarding/scene" element={<Screen4_SelectScene />} />

        {/* ── Flow 2: 场景拍摄指导（无 TabBar，全屏沉浸） ── */}
        <Route path="/scene/:id" element={<Screen1_ParamsOverview />} />
        <Route path="/scene/:id/steps" element={<Screen2_StepGuide />} />
        <Route path="/scene/:id/compare" element={<Screen3_ExampleComparison />} />
        <Route path="/scene/:id/tips" element={<Screen4_SceneTips />} />
        <Route path="/scene/:id/reference" element={<Screen5_ReferenceCard />} />

        {/* ── TabBar 包裹的 Tab 页面 ── */}
        <Route element={<AppShell />}>
          {/* 首页 */}
          <Route path="/" element={<Home />} />

          {/* Flow 3: 拍前检查清单 */}
          <Route path="/checklist" element={<Screen1_ChecklistOverview />} />
          <Route path="/checklist/item/:itemId" element={<Screen2_ItemDetail />} />
          <Route path="/checklist/complete" element={<Screen3_CompletionSummary />} />

          {/* Flow 4: 进阶技巧探索 */}
          <Route path="/tips" element={<Screen1_TipsList />} />
          <Route path="/tips/:tipId" element={<Screen2_TipDetail />} />
          <Route path="/tips/complete" element={<Screen3_LearningCompletion />} />

          {/* 设置 */}
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 兜底：重定向到首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
