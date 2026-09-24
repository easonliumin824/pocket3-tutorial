// =============================================
// Home — 首页（场景入口 + 快速导航）
// Platform: H5 (Ant Design Mobile)
// =============================================

import { useNavigate } from 'react-router-dom'
import { SafeArea, Button } from 'antd-mobile'
import { scenes } from '../shared/mock-data'

export function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ width: '100%', padding: '16px', paddingBottom: '8px' }}>
      <SafeArea position="top" />

      {/* 欢迎区域 */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontSize: 24, fontWeight: 700,
          color: 'var(--adm-color-text)', marginBottom: 8,
        }}>
          Pocket 3 新手教程
        </h1>
        <p style={{
          fontSize: 14, color: 'var(--adm-color-text)', opacity: 0.6,
          lineHeight: 1.6,
        }}>
          选择拍摄场景，学习对应参数和技巧
        </p>
      </div>

      {/* 场景卡片 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {scenes.map((scene) => (
          <div
            key={scene.id}
            onClick={() => navigate(`/scene/${scene.id}`)}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: 16, borderRadius: 12,
              border: '1px solid var(--adm-border-color)',
              background: 'var(--adm-color-background)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--adm-color-primary)'
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(22,119,255,0.10)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--adm-border-color)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'var(--adm-color-fill-content)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, flexShrink: 0,
            }}>
              {scene.thumbnail}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 16, fontWeight: 600,
                color: 'var(--adm-color-text)', marginBottom: 4,
              }}>
                {scene.name}
              </div>
              <div style={{
                fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.6,
                lineHeight: 1.5,
              }}>
                {scene.description}
              </div>
            </div>
            <div style={{
              fontSize: 18, color: 'var(--adm-color-text)', opacity: 0.5,
            }}>
              ›
            </div>
          </div>
        ))}
      </div>

      {/* 快速入口 */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
        marginBottom: 16,
      }}>
        <Button
          block
          size="large"
          fill="outline"
          onClick={() => navigate('/checklist')}
          style={{ height: 56, fontSize: 15, borderRadius: 12 }}
        >
          📋 拍前检查
        </Button>
        <Button
          block
          size="large"
          fill="outline"
          onClick={() => navigate('/tips')}
          style={{ height: 56, fontSize: 15, borderRadius: 12 }}
        >
          💡 进阶技巧
        </Button>
      </div>

      <SafeArea position="bottom" />
    </div>
  )
}
