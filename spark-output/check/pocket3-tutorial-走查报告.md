# 设计走查报告

**走查目标**：Pocket 3 新手拍摄教程 — Mobile 页面（4 flows, 15 screens, 9 files）
**走查时间**：2026-09-24
**走查模式**：自动走查（Mode A）

## 总览

| 严重度 | 数量 |
| --- | --- |
| 🔴 Blocker | 0 |
| 🟠 Major | 5 |
| 🟡 Minor | 11 |
| ✅ Pass（未出现问题的类别） | 1 / 10（内容文案） |

## Findings（按严重度排序）

### 🟠 Major

1. **[components] 约 34 处硬编码十六进制色值**
   - 出现位置：flow1-4 全部文件（lines 28, 161, 327-328, 367, 80, 149, 415, 425, 474, 280, 78, 301, 338, 482, 429, 439, 498, 501 等）
   - 问题描述：使用 `#f0f7ff`、`#f0fff4`、`#fff2f0`、`#fffbe6`、`#ad6800`、`#69b4ff`、`#b7eb8f`、`#f5f7fa` 等硬编码色值，未使用 antd-mobile CSS 变量（`var(--adm-color-*)`）。不利于主题切换和深色模式适配。
   - 修复建议：将所有硬编码色值替换为 antd-mobile CSS 变量或语义化自定义变量（如 `--color-success-bg`、`--color-warning-bg`）。

2. **[edge-states] 所有屏幕均无加载态设计**
   - 出现位置：所有 Screen1_* 组件（flow1-4）
   - 问题描述：15 个屏幕均无 skeleton / spinner 加载态。虽然当前数据来自本地 mock-data，但架构上应预留异步数据加载的 UI 状态。
   - 修复建议：为数据列表页添加 loading 状态判断，使用 antd-mobile 的 Skeleton 或 SpinLoading 组件，预留 `isLoading` 状态。

3. **[edge-states] 无全局错误边界（Error Boundary）**
   - 出现位置：`src/App.tsx` 或 `src/flows/pocket3-tutorial/AppShell.tsx`
   - 问题描述：任何组件的渲染错误会导致整个应用白屏，无友好提示和恢复路径。
   - 修复建议：在 AppShell 层添加 React Error Boundary，捕获渲染错误后展示 antd-mobile 的 ErrorBlock 组件 + "重新加载" 按钮。

4. **[brief-consistency] 未实现离线可用约束**
   - 出现位置：`vite.config.ts`（缺失 PWA 配置）
   - 问题描述：约束条件要求"需离线可用"，但当前实现未做任何离线支持（无 Service Worker、无资源缓存策略）。Vite 构建的 SPA 在离线环境下需要 SW 才能工作。
   - 修复建议：添加 `vite-plugin-pwa` 配置，生成 Service Worker 实现离线缓存。

5. **[brief-consistency] 户外强光可读性标准未满足**
   - 出现位置：全项目，尤其是 flow1-quick-setup.tsx、flow2-scene-guide.tsx、Settings.tsx
   - 问题描述：设计标准要求"户外强光下文字清晰可读"，但大量文字使用 `opacity: 0.4~0.7` 降低对比度。在户外强光下，低对比度文字几乎不可读。
   - 修复建议：将辅助文字的最低 opacity 提升到 0.7（正文）和 0.6（标签/说明），避免使用 `opacity < 0.5` 的文字。

### 🟡 Minor

6. **[visual-hierarchy] flow1 字号层级过多（12+ 种）**
   - 出现位置：`src/flows/flow-1/flow1-quick-setup.tsx`
   - 修复建议：收敛到 5-6 个标准字号档位（caption 12 / body-sm 13 / body 15 / title-sm 17 / title 20 / display 24）。

7. **[visual-hierarchy] flow2 存在非 4px 倍数的间距值**
   - 出现位置：`src/flows/flow-2/flow2-scene-guide.tsx` (lines 442, 699, 732)
   - 修复建议：10px → 12px，6px → 8px，2px → 4px。

8. **[ia] flow3 Screen1 NavBar 缺少 onBack 回调**
   - 出现位置：`src/flows/flow-3/flow3-checklist.tsx` (Screen1_ChecklistOverview)
   - 修复建议：添加 `onBack={() => navigate('/')}` 或隐藏返回按钮（`backIcon={null}`）。

9. **[ia] flow3/f4 Screen2 使用 window.location.pathname 解析路由参数**
   - 出现位置：`src/flows/flow-3/flow3-checklist.tsx` (line 234); `src/flows/flow-4/flow4-advanced-tips.tsx` (line 184)
   - 修复建议：改用 react-router-dom 的 `useParams()` 获取路由参数。

10. **[accessibility] 部分文字对比度可能低于 WCAG AA 4.5:1**
    - 出现位置：全项目中 `opacity < 0.5` 的文字元素
    - 修复建议：确保所有正文文字对比度 ≥ 4.5:1，将最低 opacity 设为 0.55 以上。

11. **[accessibility] 颜色信息传达基本合规**
    - 出现位置：`src/flows/flow-4/flow4-advanced-tips.tsx` (difficultyMap)
    - 说明：难度标签已有文字辅助（"入门"/"进阶"/"高级"），基本合规。建议持续检查其他仅靠颜色传达信息的场景。

12. **[feedback] 首页场景卡片点击无过渡反馈**
    - 出现位置：`src/flows/shared/Home.tsx` (场景卡片 onClick)
    - 修复建议：添加 CSS `:active` 伪类或 navigate 前调用 Toast.show。

13. **[feedback] 设置页开关未连接实际功能**
    - 出现位置：`src/flows/shared/Settings.tsx` (darkMode / largeText / notifications)
    - 修复建议：原型阶段可在 Toast 文案中注明"演示模式"，或后续迭代接入 CSS 变量切换逻辑。

14. **[responsive] 未定义响应式断点行为**
    - 出现位置：全项目布局文件
    - 修复建议：添加 `@media (max-width: 320px)` 降级规则，确保 iPhone SE 等小屏不溢出。

15. **[flow-continuity] flow2 Screen5 缺少明确的"下一步"引导**
    - 出现位置：`src/flows/flow-2/flow2-scene-guide.tsx` (Screen5_ReferenceCard)
    - 修复建议：在 Screen5 底部添加导航按钮（如"返回场景参数"或"查看其他场景"）。

16. **[components] flow1 Screen3/Screen4 根 div 缺少 width: '100%'**
    - 出现位置：`src/flows/flow-1/flow1-quick-setup.tsx` (Screen3 line 229, Screen4)
    - 修复建议：为所有屏幕根 div 统一添加 `width: '100%'`。

## 修复优先级建议

- **必须修复**（Major 中影响主流程的项）：5 项
  - 硬编码色值（影响深色模式适配和整体一致性）
  - 加载态缺失（影响架构扩展性）
  - 错误边界缺失（影响用户体验）
  - 离线支持缺失（违反约束条件）
  - 户外对比度不足（违反设计标准）

- **建议修复**（影响一致性的 Minor）：6 项
  - 间距非 4px 倍数、NavBar onBack 缺失、useParams 替换、对比度提升、点击反馈、根 div width

- **可延后**（不影响功能的 Minor）：5 项
  - 字号收敛、设置页功能接入、响应式断点、Screen5 导航引导、颜色信息辅助
