// =============================================
// Settings — 设置页
// Platform: H5 (Ant Design Mobile)
// =============================================

import { useState } from 'react'
import { List, Switch, Toast, SafeArea, Button, Dialog } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

export function Settings() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [largeText, setLargeText] = useState(false)

  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <SafeArea position="top" />

      <h2 style={{
        fontSize: 20, fontWeight: 600,
        color: 'var(--adm-color-text)', marginBottom: 16,
      }}>
        设置
      </h2>

      {/* 显示设置 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.6,
          marginBottom: 8, paddingLeft: 4,
        }}>
          显示
        </div>
        <List style={{ borderRadius: 12, overflow: 'hidden' }}>
          <List.Item
            extra={<Switch checked={darkMode} onChange={(val) => {
              setDarkMode(val)
              Toast.show({ content: val ? '已开启深色模式' : '已关闭深色模式' })
            }} />}
            description="降低屏幕亮度，保护眼睛"
          >
            深色模式
          </List.Item>
          <List.Item
            extra={<Switch checked={largeText} onChange={(val) => {
              setLargeText(val)
              Toast.show({ content: val ? '已放大字体' : '已恢复默认字体' })
            }} />}
            description="放大教程中的文字尺寸"
          >
            大字体模式
          </List.Item>
        </List>
      </div>

      {/* 通知设置 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.6,
          marginBottom: 8, paddingLeft: 4,
        }}>
          通知
        </div>
        <List style={{ borderRadius: 12, overflow: 'hidden' }}>
          <List.Item
            extra={<Switch checked={notifications} onChange={(val) => {
              setNotifications(val)
              Toast.show({ content: val ? '已开启通知' : '已关闭通知' })
            }} />}
            description="接收练习提醒和新技巧推送"
          >
            练习提醒
          </List.Item>
        </List>
      </div>

      {/* 关于 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.6,
          marginBottom: 8, paddingLeft: 4,
        }}>
          关于
        </div>
        <List style={{ borderRadius: 12, overflow: 'hidden' }}>
          <List.Item description="Pocket 3 新手拍摄教程 v1.0">
            版本信息
          </List.Item>
          <List.Item
            clickable
            onClick={() => navigate('/onboarding')}
            description="重新体验首次设置引导流程"
          >
            重新设置
          </List.Item>
        </List>
      </div>

      {/* 重置数据 */}
      <div style={{ padding: '16px 0' }}>
        <Button
          block
          fill="outline"
          color="danger"
          size="large"
          style={{ borderRadius: 12 }}
          onClick={() => {
            Dialog.confirm({
              content: '确定要重置所有学习进度吗？此操作不可撤销。',
              onConfirm: () => {
                Toast.show({ content: '已重置所有进度' })
              },
            })
          }}
        >
          重置学习进度
        </Button>
      </div>

      <SafeArea position="bottom" />
    </div>
  )
}
