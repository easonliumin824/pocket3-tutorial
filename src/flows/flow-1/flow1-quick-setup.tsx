// =============================================
// FLOW: Quick Setup Onboarding (4 screens)
// Scenario: Camera & Photo (Tutorial App)
// Platform: H5 (Ant Design Mobile)
// =============================================

import { useState } from 'react'
import { NavBar, Button, Steps, Selector, ProgressBar, Toast, SafeArea } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import type { DeviceModel } from '../shared/types'

/* ================================================
   FLOW: Quick Setup Onboarding
   SCREEN 1 of 4: Welcome
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  App 首次启动
   EXIT:   "开始设置" → SCREEN 2: Select Device
   BRANCH: "跳过" → 首页（保留设置进度）
   ================================================ */
export function Screen1_Welcome() {
  const navigate = useNavigate()
  // STATE: default — 欢迎页，两个 CTA 可用
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', width: '100%', minHeight: '100vh', padding: '24px',
      background: 'var(--adm-color-fill-content)',
    }}>
      <SafeArea position="top" />

      {/* 品牌插画区域 */}
      <div style={{
        width: 120, height: 120, borderRadius: 28,
        background: 'var(--adm-color-primary)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: 56, marginBottom: 24,
        boxShadow: '0 8px 24px rgba(22,119,255,0.20)',
      }}>
        📷
      </div>

      <h1 style={{
        fontSize: 28, fontWeight: 700, color: 'var(--adm-color-text)',
        marginBottom: 12, textAlign: 'center',
      }}>
        Pocket 3 新手教程
      </h1>

      <p style={{
        fontSize: 16, color: 'var(--adm-color-text)', opacity: 0.6,
        textAlign: 'center', lineHeight: 1.6, marginBottom: 40,
        maxWidth: 280,
      }}>
        5 分钟完成首次设置，按场景推荐参数，边看边拍
      </p>

      <div style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => navigate('/onboarding/device')}
        >
          开始设置
        </Button>
        <Button
          block
          fill="none"
          size="large"
          onClick={() => {
            Toast.show({ content: '已跳过，可随时在设置中重新开始' })
            navigate('/')
          }}
        >
          跳过，稍后设置
        </Button>
      </div>

      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User taps "开始设置" → SCREEN 2: Select Device */}
{/* → User taps "跳过" → 首页 (retain progress) */}

/* ================================================
   FLOW: Quick Setup Onboarding
   SCREEN 2 of 4: Select Device Model
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  "开始设置" tapped on Screen 1
   EXIT:   选择机型 → SCREEN 3: Basic Setup
   BRANCH: "返回" → Screen 1 (Welcome)
   ================================================ */
export function Screen2_SelectDevice() {
  const navigate = useNavigate()
  const [selectedModel, setSelectedModel] = useState<DeviceModel | null>(null)

  const modelOptions = [
    {
      label: (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Pocket 3</div>
          <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>标准版</div>
        </div>
      ),
      value: 'pocket-3' as DeviceModel,
    },
    {
      label: (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎬</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Pocket 3</div>
          <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>创作者套装</div>
          <div style={{ fontSize: 11, color: 'var(--adm-color-primary)', marginTop: 4 }}>含 ND 滤镜 / 麦克风</div>
        </div>
      ),
      value: 'pocket-3-creator' as DeviceModel,
    },
  ]

  // STATE: default — 未选择机型，"下一步" disabled
  // STATE: selected — 已选择机型，"下一步" enabled
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>选择机型</NavBar>

      <div style={{ flex: 1, padding: '24px 16px' }}>
        <h2 style={{
          fontSize: 20, fontWeight: 600, color: 'var(--adm-color-text)',
          marginBottom: 8,
        }}>
          你的 Pocket 3 是哪个版本？
        </h2>
        <p style={{
          fontSize: 14, color: 'var(--adm-color-text)', opacity: 0.6,
          marginBottom: 24,
        }}>
          不同版本的配件和教程内容略有差异
        </p>

        <Selector
          options={modelOptions}
          value={selectedModel ? [selectedModel] : []}
          onChange={(val) => setSelectedModel(val[0] as DeviceModel)}
          columns={2}
          style={{
            '--border-radius': '12px',
            '--border': '1px solid var(--adm-border-color)',
            '--checked-border': '1px solid var(--adm-color-primary)',
          }}
        />

        {selectedModel === 'pocket-3-creator' && (
          <div style={{
            marginTop: 16, padding: 12, borderRadius: 8,
            background: 'var(--color-primary-bg)', fontSize: 13, color: 'var(--adm-color-primary)',
            lineHeight: 1.6,
          }}>
            💡 创作者套装包含 ND 滤镜套装和 DJI Mic 2 麦克风，后续教程会包含相关配件的使用指导。
          </div>
        )}
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid var(--adm-border-color)' }}>
        <Button
          block
          color="primary"
          size="large"
          disabled={!selectedModel}
          onClick={() => navigate('/onboarding/setup')}
        >
          下一步
        </Button>
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User selects model & taps "下一步" → SCREEN 3: Basic Setup */}
{/* → User taps back → SCREEN 1: Welcome */}

/* ================================================
   FLOW: Quick Setup Onboarding
   SCREEN 3 of 4: Basic Setup Steps
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  机型已选择，进入基础设置引导
   EXIT:   所有步骤完成 → SCREEN 4: Select Scene
   BRANCH: "返回" → Screen 2 (retain model selection)
   ================================================ */
export function Screen3_BasicSetup() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const setupSteps = [
    {
      title: '开机',
      description: '长按右侧电源键 2 秒，直到屏幕亮起。首次使用请先充电至 20% 以上。',
      icon: '🔋',
    },
    {
      title: '安装 SD 卡',
      description: '打开电池仓盖，将 microSD 卡（金手指朝下）插入卡槽，听到「咔嗒」声即安装到位。',
      icon: '💾',
    },
    {
      title: '等待云台自检',
      description: '开机后云台臂会自动展开并自检，约 3 秒。确认云台可自由转动、屏幕显示实时画面。',
      icon: '🎯',
    },
    {
      title: '连接 DJI Mimo（可选）',
      description: '扫描屏幕上的二维码或前往 App Store 下载 DJI Mimo App，通过蓝牙连接可解锁更多操控功能。',
      icon: '📱',
    },
  ]

  const progress = ((currentStep + 1) / setupSteps.length) * 100

  // STATE: default — 步骤引导进行中
  // STATE: completed — 所有步骤已完成，CTA 变为"选择拍摄场景"
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>基础设置</NavBar>

      <div style={{ flex: 1, padding: '16px' }}>
        {/* 进度条 */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.6,
            marginBottom: 8,
          }}>
            <span>设置进度</span>
            <span>{currentStep + 1} / {setupSteps.length}</span>
          </div>
          <ProgressBar percent={progress} />
        </div>

        {/* 步骤列表 */}
        <Steps current={currentStep} direction="vertical">
          {setupSteps.map((step, index) => (
            <Steps.Step
              key={step.title}
              title={
                <span style={{ fontSize: 15, fontWeight: index === currentStep ? 600 : 400 }}>
                  {step.icon} {step.title}
                </span>
              }
              description={
                index <= currentStep ? (
                  <div style={{ marginTop: 8 }}>
                    <p style={{
                      fontSize: 14, color: 'var(--adm-color-text)', opacity: 0.7,
                      lineHeight: 1.6, marginBottom: 12,
                    }}>
                      {step.description}
                    </p>
                    {index === currentStep && (
                      <Button
                        size="small"
                        color="primary"
                        fill="outline"
                        onClick={() => {
                          if (currentStep < setupSteps.length - 1) {
                            setCurrentStep(currentStep + 1)
                          } else {
                            Toast.show({ content: '设置完成！', icon: 'success' })
                          }
                        }}
                      >
                        {index === currentStep ? '完成，下一步' : '已完成'}
                      </Button>
                    )}
                    {index < currentStep && (
                      <Tag color="success" fill="outline">✓ 已完成</Tag>
                    )}
                  </div>
                ) : (
                  <p style={{
                    fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.55,
                    marginTop: 4,
                  }}>
                    请先完成上一步
                  </p>
                )
              }
            />
          ))}
        </Steps>
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid var(--adm-border-color)' }}>
        <Button
          block
          color="primary"
          size="large"
          disabled={currentStep < setupSteps.length - 1}
          onClick={() => {
            if (currentStep >= setupSteps.length - 1) {
              navigate('/onboarding/scene')
            }
          }}
        >
          {currentStep >= setupSteps.length - 1 ? '选择拍摄场景 →' : `还有 ${setupSteps.length - currentStep - 1} 步`}
        </Button>
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}

// 辅助组件：Tag（antd-mobile 的 Tag 在 Steps 内使用）
function Tag({ color, children }: { color: string; fill?: string; children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 4,
      fontSize: 12, fontWeight: 500,
      color: color === 'success' ? 'var(--adm-color-success)' : 'var(--adm-color-text)',
      background: color === 'success' ? 'var(--color-success-bg)' : 'var(--adm-color-fill-content)',
      border: `1px solid ${color === 'success' ? 'var(--color-success-border)' : 'var(--adm-border-color)'}`,
    }}>
      {children}
    </span>
  )
}

{/* → All steps completed & user taps "选择拍摄场景" → SCREEN 4: Select Scene */}

/* ================================================
   FLOW: Quick Setup Onboarding
   SCREEN 4 of 4: Select First Scene
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  基础设置全部完成
   EXIT:   选择场景 → Flow 2 Screen 2 (Scene Params)
   BRANCH: "稍后再选" → 首页
   ================================================ */
export function Screen4_SelectScene() {
  const navigate = useNavigate()

  const sceneCards = [
    { id: 'outdoor-portrait', emoji: '🧑', name: '户外人像', desc: '阳光下的人像拍摄' },
    { id: 'landscape', emoji: '🏔️', name: '风光', desc: '壮阔风景拍摄' },
    { id: 'indoor-life', emoji: '🏠', name: '室内生活', desc: '室内日常记录' },
  ]

  // STATE: default — 三张场景卡片可选
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>选择拍摄场景</NavBar>

      <div style={{ flex: 1, padding: '24px 16px' }}>
        <div style={{
          textAlign: 'center', marginBottom: 32,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--color-success-bg)', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 32, marginBottom: 16,
          }}>
            ✓
          </div>
          <h2 style={{
            fontSize: 22, fontWeight: 600, color: 'var(--adm-color-text)',
            marginBottom: 8,
          }}>
            设置完成！
          </h2>
          <p style={{
            fontSize: 15, color: 'var(--adm-color-text)', opacity: 0.6,
          }}>
            选择你想学习的第一个拍摄场景
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sceneCards.map((scene) => (
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
                width: 48, height: 48, borderRadius: 12,
                background: 'var(--adm-color-fill-content)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
              }}>
                {scene.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--adm-color-text)' }}>
                  {scene.name}
                </div>
                <div style={{ fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.6, marginTop: 4 }}>
                  {scene.desc}
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

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Button
            fill="none"
            onClick={() => navigate('/')}
          >
            稍后再选，先看看首页
          </Button>
        </div>
      </div>

      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User taps scene card → Flow 2: Scene Shooting Guide */}
{/* → User taps "稍后再选" → 首页 */}

// =============================================
// Exit States — Quick Setup Onboarding
// =============================================
// ✅ Success: 完成基础设置 + 选择首个场景 → 进入场景拍摄指导
// ❌ Error: 设备连接失败 → 显示排障提示 + "跳过，稍后设置"
// ↩ Abandon: 点击"跳过" → 直接进入首页，设置进度保留
