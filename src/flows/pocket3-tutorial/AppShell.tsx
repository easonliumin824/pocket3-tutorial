// =============================================
// AppShell — TabBar 导航容器
// Platform: H5 (Ant Design Mobile)
// =============================================
// 底部 4 Tab：首页 / 清单 / 进阶 / 设置
// 布局：flex 列，TabBar 自然与内容等宽（禁止 position:fixed）
// =============================================

import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { TabBar, SafeArea } from 'antd-mobile'
import {
  AppOutline,
  CheckCircleOutline,
  CompassOutline,
  SetOutline,
} from 'antd-mobile-icons'

const tabs = [
  { key: '/', title: '首页', icon: <AppOutline /> },
  { key: '/checklist', title: '清单', icon: <CheckCircleOutline /> },
  { key: '/tips', title: '进阶', icon: <CompassOutline /> },
  { key: '/settings', title: '设置', icon: <SetOutline /> },
]

export function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()

  // 根据当前路径匹配活跃 Tab
  const activeKey = tabs.find((tab) => {
    if (tab.key === '/') return location.pathname === '/'
    return location.pathname.startsWith(tab.key)
  })?.key ?? '/'

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: '100%', minHeight: '100vh',
    }}>
      {/* 内容区域 */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </div>

      {/* TabBar — flex 列布局，禁止 position:fixed */}
      <div style={{
        flexShrink: 0,
        borderTop: '1px solid var(--adm-border-color)',
        background: 'var(--adm-color-background)',
      }}>
        <TabBar
          activeKey={activeKey}
          onChange={(key) => navigate(key)}
        >
          {tabs.map((tab) => (
            <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title} />
          ))}
        </TabBar>
        <SafeArea position="bottom" />
      </div>
    </div>
  )
}
