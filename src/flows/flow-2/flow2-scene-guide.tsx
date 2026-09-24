// =============================================
// FLOW: Scene Shooting Guide (5 screens)
// Scenario: Camera & Photo (Tutorial App)
// Platform: H5 (Ant Design Mobile)
// =============================================

import { useState, useEffect } from 'react'
import {
  NavBar, Button, Steps, List, Tag, Collapse,
  ProgressBar, Toast, SafeArea, Skeleton, Empty,
} from 'antd-mobile'
import { useNavigate, useParams } from 'react-router-dom'
import { scenes } from '../shared/mock-data'
import type { StepData } from '../shared/types'

/* ================================================
   FLOW: Scene Shooting Guide
   SCREEN 1 of 5: Scene Params Overview
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  首页场景卡片 tapped / Flow 1 Screen 4 选择场景
   EXIT:   "开始拍摄指导" → SCREEN 2: Step-by-step Guide
   BRANCH: "返回" → 首页 / Flow 1 Screen 4
   ================================================ */
export function Screen1_ParamsOverview() {
  const navigate = useNavigate()
  const { sceneId } = useParams<{ sceneId: string }>()
  const [loading, setLoading] = useState(true)

  // 模拟数据加载（后续替换为真实 API 调用）
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [sceneId])

  const scene = scenes.find((s) => s.id === sceneId)

  // STATE: loading — 骨架屏
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
        <SafeArea position="top" />
        <NavBar onBack={() => navigate(-1)}>拍摄参数</NavBar>
        <div style={{ flex: 1, padding: '16px' }}>
          <Skeleton animated style={{ width: '60%', height: 24, marginBottom: 12, borderRadius: 8 }} />
          <Skeleton animated style={{ width: '40%', height: 16, marginBottom: 24, borderRadius: 8 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ padding: 16, borderRadius: 12, background: 'var(--adm-color-fill-content)' }}>
                <Skeleton animated style={{ width: '30%', height: 18, marginBottom: 12, borderRadius: 6 }} />
                <Skeleton animated style={{ width: '80%', height: 14, marginBottom: 8, borderRadius: 6 }} />
                <Skeleton animated style={{ width: '60%', height: 14, borderRadius: 6 }} />
              </div>
            ))}
          </div>
        </div>
        <SafeArea position="bottom" />
      </div>
    )
  }

  // STATE: empty — 场景未找到
  if (!scene) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
        <SafeArea position="top" />
        <NavBar onBack={() => navigate(-1)}>拍摄参数</NavBar>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Empty description="未找到该场景信息" />
          <Button color="primary" fill="outline" style={{ marginTop: 16, borderRadius: 8 }}
            onClick={() => navigate('/')}>
            返回首页
          </Button>
        </div>
        <SafeArea position="bottom" />
      </div>
    )
  }

  // STATE: default — 参数卡片展示
  // 参数分组展示（依赖 scene 数据）
  const paramGroups = [
    {
      title: '画质设置',
      icon: '🎬',
      items: [
        { label: '分辨率', value: scene.params.resolution },
        { label: '帧率', value: `${scene.params.frameRate}fps` },
        { label: '视野', value: scene.params.fov },
      ],
    },
    {
      title: '曝光与色彩',
      icon: '☀️',
      items: [
        { label: '曝光补偿', value: scene.params.exposure },
        { label: 'ISO', value: scene.params.iso },
        { label: '白平衡', value: scene.params.whiteBalance },
        { label: '快门速度', value: scene.params.shutterSpeed },
      ],
    },
    {
      title: '云台设置',
      icon: '🎯',
      items: [
        {
          label: '云台模式',
          value: scene.params.gimbalMode === 'follow' ? 'Follow 跟随'
            : scene.params.gimbalMode === 'lock' ? 'Lock 锁定'
            : scene.params.gimbalMode === 'fpv' ? 'FPV 第一视角'
            : '竖拍',
        },
      ],
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>{scene.name}拍摄参数</NavBar>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {/* 场景标题区 */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 20, padding: 16, borderRadius: 12,
          background: 'var(--adm-color-fill-content)',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: 'var(--adm-color-background)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28,
          }}>
            {scene.thumbnail}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--adm-color-text)' }}>
              {scene.name}
            </div>
            <div style={{ fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.6, marginTop: 4 }}>
              {scene.description}
            </div>
          </div>
        </div>

        {/* 参数分组 */}
        {paramGroups.map((group) => (
          <div key={group.title} style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 15, fontWeight: 600, color: 'var(--adm-color-text)',
              marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span>{group.icon}</span>
              <span>{group.title}</span>
            </div>
            <List style={{ '--border-inner': '1px solid var(--adm-border-color)' } as React.CSSProperties}>
              {group.items.map((item) => (
                <List.Item
                  key={item.label}
                  extra={
                    <span style={{
                      fontWeight: 500, fontVariantNumeric: 'tabular-nums',
                      color: 'var(--adm-color-primary)',
                    }}>
                      {item.value}
                    </span>
                  }
                >
                  {item.label}
                </List.Item>
              ))}
            </List>
          </div>
        ))}

        {/* 参数说明 */}
        <div style={{
          padding: 12, borderRadius: 8,
          background: 'var(--color-primary-bg)', fontSize: 13,
          color: 'var(--adm-color-primary)', lineHeight: 1.6,
          marginTop: 8,
        }}>
          💡 以上参数已针对「{scene.name}」场景优化，按推荐值设置即可获得不错的拍摄效果。你也可以在拍摄过程中随时调整。
        </div>
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid var(--adm-border-color)' }}>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => navigate(`/scene/${scene.id}/guide`)}
        >
          开始拍摄指导 →
        </Button>
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User taps "开始拍摄指导" → SCREEN 2: Step-by-step Guide */}
{/* → User taps back → SCREEN 1 或 首页 */}

/* ================================================
   FLOW: Scene Shooting Guide
   SCREEN 2 of 5: Step-by-step Shooting Guide
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  Screen 1 "开始拍摄指导" tapped
   EXIT:   所有步骤完成 → SCREEN 3: Example Comparison
   BRANCH: "返回" → Screen 1 (retain step progress)
   ================================================ */
export function Screen2_StepGuide() {
  const navigate = useNavigate()
  const { sceneId } = useParams<{ sceneId: string }>()
  const scene = scenes.find((s) => s.id === sceneId) ?? scenes[0]
  const [currentStep, setCurrentStep] = useState(0)

  const totalSteps = scene.steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100
  const step: StepData = scene.steps[currentStep]

  // STATE: default — 步骤进行中
  // STATE: completed — 最后一步已完成
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>拍摄指导</NavBar>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {/* 进度指示 */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.6,
            marginBottom: 8,
          }}>
            <span>步骤 {currentStep + 1} / {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar percent={progress} />
        </div>

        {/* 当前步骤卡片 */}
        <div style={{
          padding: 20, borderRadius: 12,
          border: '1px solid var(--adm-border-color)',
          background: 'var(--adm-color-background)',
          marginBottom: 16,
        }}>
          {/* 步骤编号 */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--adm-color-primary)', color: '#fff',
            fontSize: 14, fontWeight: 600, marginBottom: 12,
          }}>
            {step.id}
          </div>

          {/* 步骤标题 */}
          <h3 style={{
            fontSize: 18, fontWeight: 600, color: 'var(--adm-color-text)',
            marginBottom: 12,
          }}>
            {step.title}
          </h3>

          {/* 步骤描述 */}
          <p style={{
            fontSize: 15, color: 'var(--adm-color-text)', opacity: 0.8,
            lineHeight: 1.7, marginBottom: 16,
          }}>
            {step.description}
          </p>

          {/* 参数高亮 */}
          {step.paramHighlight && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 8,
              background: 'var(--color-primary-bg)',
            }}>
              <span style={{ fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.6 }}>
                {step.paramHighlight.label}
              </span>
              <Tag color="primary" fill="solid" style={{
                '--background-color': 'var(--adm-color-primary)',
                '--text-color': '#ffffff',
                '--border-radius': '6px',
              } as React.CSSProperties}>
                {step.paramHighlight.value}
              </Tag>
            </div>
          )}
        </div>

        {/* 步骤进度点 */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 6,
          marginBottom: 16,
        }}>
          {scene.steps.map((_, index) => (
            <div
              key={index}
              style={{
                width: index === currentStep ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: index <= currentStep
                  ? 'var(--adm-color-primary)'
                  : 'var(--adm-color-fill-content)',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        {/* 已完成步骤概览 */}
        {currentStep > 0 && (
          <Collapse defaultActiveKey={[]}>
            <Collapse.Panel key="completed" title={`已完成 ${currentStep} 步（点击展开）`}>
              <Steps direction="vertical" current={currentStep}>
                {scene.steps.slice(0, currentStep).map((s) => (
                  <Steps.Step
                    key={s.id}
                    title={
                      <span style={{ fontSize: 14, color: 'var(--adm-color-text)', opacity: 0.6 }}>
                        {s.title}
                      </span>
                    }
                    status="finish"
                  />
                ))}
              </Steps>
            </Collapse.Panel>
          </Collapse>
        )}
      </div>

      <div style={{
        padding: '16px', borderTop: '1px solid var(--adm-border-color)',
        display: 'flex', gap: 12,
      }}>
        <Button
          block
          fill="outline"
          size="large"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          上一步
        </Button>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => {
            if (currentStep < totalSteps - 1) {
              setCurrentStep(currentStep + 1)
            } else {
              Toast.show({ content: '指导完成！', icon: 'success' })
              navigate(`/scene/${scene.id}/examples`)
            }
          }}
        >
          {currentStep < totalSteps - 1 ? '下一步' : '查看示例 →'}
        </Button>
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User completes all steps & taps "查看示例" → SCREEN 3: Example Comparison */}
{/* → User taps "上一步" → previous step in Screen 2 */}
{/* → User taps back → Screen 1 (retain step progress) */}

/* ================================================
   FLOW: Scene Shooting Guide
   SCREEN 3 of 5: Example Comparison
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  Screen 2 所有步骤完成，"查看示例" tapped
   EXIT:   "查看拍摄技巧" → SCREEN 4: Scene Tips
   BRANCH: "返回" → Screen 2 (retain progress)
   ================================================ */
export function Screen3_ExampleComparison() {
  const navigate = useNavigate()
  const { sceneId } = useParams<{ sceneId: string }>()
  const scene = scenes.find((s) => s.id === sceneId) ?? scenes[0]

  // 基于场景生成对比示例
  const comparisons: Record<string, Array<{ good: string; bad: string; label: string; goodDesc: string; badDesc: string }>> = {
    'outdoor-portrait': [
      {
        label: '光线方向',
        good: '侧逆光拍摄',
        bad: '正午顶光直射',
        goodDesc: '柔和的侧光勾勒面部轮廓，肤色均匀通透',
        badDesc: '头顶强光造成眼窝、鼻下深重阴影，肤色不均',
      },
      {
        label: '构图',
        good: '三分法构图',
        bad: '人物居中',
        goodDesc: '人物位于三分线交叉点，画面有呼吸感',
        badDesc: '人物居中显得呆板，画面缺少层次',
      },
      {
        label: '云台运用',
        good: '跟随模式缓推',
        bad: '手持晃动',
        goodDesc: '云台增稳 + 缓慢推进，画面如电影般平滑',
        badDesc: '手持抖动明显，观看体验差',
      },
    ],
    'landscape': [
      {
        label: '时段选择',
        good: '黄金时段',
        bad: '正午强光',
        goodDesc: '日出/日落前后 1 小时，光线柔和、色彩丰富',
        badDesc: '正午阳光强烈，画面反差过大、色彩平淡',
      },
      {
        label: '构图',
        good: '三分法 + 引导线',
        bad: '地平线居中',
        goodDesc: '地平线放在三分之一线，配合道路/河流引导视线',
        badDesc: '地平线将画面一分为二，缺少视觉焦点',
      },
      {
        label: '运镜',
        good: '缓慢平移',
        bad: '快速甩镜头',
        goodDesc: '5-10 秒缓慢平移，展现壮阔场景',
        badDesc: '快速晃动让人头晕，画面无法使用',
      },
    ],
    'indoor-life': [
      {
        label: '光源',
        good: '窗边自然光',
        bad: '头顶暖光灯',
        goodDesc: '靠近窗户，光线柔和均匀，肤色自然',
        badDesc: '头顶灯光造成面部阴影和绿色偏色',
      },
      {
        label: '曝光',
        good: '+0.7 补偿提亮',
        bad: '默认曝光偏暗',
        goodDesc: '适当提高曝光补偿，室内画面明亮通透',
        badDesc: '室内光线不足，默认曝光下画面偏暗',
      },
      {
        label: '持机',
        good: '双手贴肘稳定',
        bad: '单手悬空',
        goodDesc: '双手持机、手肘贴紧身体，画面稳定',
        badDesc: '单手悬空拍摄，轻微抖动在画面中很明显',
      },
    ],
  }

  const sceneComparisons = comparisons[scene.id] ?? comparisons['outdoor-portrait']

  // STATE: default — 对比卡片展示
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>示例对比</NavBar>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        <p style={{
          fontSize: 14, color: 'var(--adm-color-text)', opacity: 0.6,
          marginBottom: 16, lineHeight: 1.6,
        }}>
          以下是「{scene.name}」场景中常见的正确与错误拍法对比，帮助你快速理解关键要点。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {sceneComparisons.map((comp, index) => (
            <div key={comp.label} style={{
              borderRadius: 12, overflow: 'hidden',
              border: '1px solid var(--adm-border-color)',
            }}>
              {/* 对比标题 */}
              <div style={{
                padding: '12px 16px',
                background: 'var(--adm-color-fill-content)',
                fontSize: 14, fontWeight: 600, color: 'var(--adm-color-text)',
              }}>
                {index + 1}. {comp.label}
              </div>

              {/* 正确示例 */}
              <div style={{
                padding: 16, borderBottom: '1px dashed var(--adm-border-color)',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
                }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'var(--color-success-bg)', color: 'var(--adm-color-success)',
                    fontSize: 12, fontWeight: 600,
                  }}>✓</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-color-success)' }}>
                    {comp.good}
                  </span>
                </div>
                <p style={{
                  fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.7,
                  lineHeight: 1.6, margin: 0, paddingLeft: 28,
                }}>
                  {comp.goodDesc}
                </p>
              </div>

              {/* 错误示例 */}
              <div style={{ padding: 16 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
                }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'var(--color-danger-bg)', color: 'var(--adm-color-danger)',
                    fontSize: 12, fontWeight: 600,
                  }}>✕</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-color-danger)' }}>
                    {comp.bad}
                  </span>
                </div>
                <p style={{
                  fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.7,
                  lineHeight: 1.6, margin: 0, paddingLeft: 28,
                }}>
                  {comp.badDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid var(--adm-border-color)' }}>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => navigate(`/scene/${scene.id}/tips`)}
        >
          查看拍摄技巧 →
        </Button>
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User taps "查看拍摄技巧" → SCREEN 4: Scene Tips */}
{/* → User taps back → SCREEN 2: Step-by-step Guide */}

/* ================================================
   FLOW: Scene Shooting Guide
   SCREEN 4 of 5: Scene Tips
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  Screen 3 "查看拍摄技巧" tapped
   EXIT:   "保存参考卡" → SCREEN 5: Quick Reference Card
   BRANCH: "返回" → Screen 3
   ================================================ */
export function Screen4_SceneTips() {
  const navigate = useNavigate()
  const { sceneId } = useParams<{ sceneId: string }>()
  const scene = scenes.find((s) => s.id === sceneId) ?? scenes[0]

  // STATE: default — 技巧列表展示
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>拍摄技巧</NavBar>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        <p style={{
          fontSize: 14, color: 'var(--adm-color-text)', opacity: 0.6,
          marginBottom: 16, lineHeight: 1.6,
        }}>
          掌握以下技巧，让你的「{scene.name}」拍摄效果更进一步。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {scene.tips.map((tip, index) => (
            <div key={index} style={{
              padding: 16, borderRadius: 12,
              border: '1px solid var(--adm-border-color)',
              background: 'var(--adm-color-background)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'var(--color-primary-bg)', color: 'var(--adm-color-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 600, flexShrink: 0,
                }}>
                  {index + 1}
                </div>
                <p style={{
                  fontSize: 15, color: 'var(--adm-color-text)', lineHeight: 1.7,
                  margin: 0, flex: 1,
                }}>
                  {tip}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 额外提示 */}
        <div style={{
          marginTop: 20, padding: 12, borderRadius: 8,
          background: 'var(--color-warning-bg)', fontSize: 13,
          color: 'var(--color-warning-text)', lineHeight: 1.6,
        }}>
          ⚡ 小技巧：多练习这些技巧，形成肌肉记忆后拍摄效率会大幅提升。每次外出拍摄前可以回来复习一遍。
        </div>
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid var(--adm-border-color)' }}>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => navigate(`/scene/${scene.id}/reference`)}
        >
          保存参考卡 →
        </Button>
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User taps "保存参考卡" → SCREEN 5: Quick Reference Card */}
{/* → User taps back → SCREEN 3: Example Comparison */}

/* ================================================
   FLOW: Scene Shooting Guide
   SCREEN 5 of 5: Quick Reference Card
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  Screen 4 "保存参考卡" tapped
   EXIT:   "返回首页" → 首页 / "重新学习" → Screen 1
   BRANCH: "返回" → Screen 4
   ================================================ */
export function Screen5_ReferenceCard() {
  const navigate = useNavigate()
  const { sceneId } = useParams<{ sceneId: string }>()
  const scene = scenes.find((s) => s.id === sceneId) ?? scenes[0]

  // STATE: default — 参考卡展示
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>参考卡</NavBar>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {/* 参考卡主体 */}
        <div style={{
          borderRadius: 16, overflow: 'hidden',
          border: '2px solid var(--adm-color-primary)',
          boxShadow: '0 2px 12px rgba(22,119,255,0.10)',
        }}>
          {/* 卡片头部 */}
          <div style={{
            padding: '20px 16px',
            background: 'linear-gradient(135deg, var(--adm-color-primary) 0%, #69b4ff 100%)',
            color: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 36 }}>{scene.thumbnail}</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{scene.name}速查卡</div>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>
                  Pocket 3 拍摄参数参考
                </div>
              </div>
            </div>
          </div>

          {/* 核心参数 */}
          <div style={{ padding: '16px' }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: 'var(--adm-color-text)',
              opacity: 0.6, marginBottom: 8, textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              核心参数
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
            }}>
              {[
                { label: '分辨率', value: scene.params.resolution },
                { label: '帧率', value: `${scene.params.frameRate}fps` },
                { label: '视野', value: scene.params.fov },
                { label: '曝光', value: scene.params.exposure },
                { label: 'ISO', value: scene.params.iso },
                { label: '白平衡', value: scene.params.whiteBalance },
              ].map((p) => (
                <div key={p.label} style={{
                  padding: '8px 12px', borderRadius: 8,
                  background: 'var(--adm-color-fill-content)',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--adm-color-text)', opacity: 0.5 }}>
                    {p.label}
                  </div>
                  <div style={{
                    fontSize: 14, fontWeight: 600, color: 'var(--adm-color-text)',
                    fontVariantNumeric: 'tabular-nums', marginTop: 2,
                  }}>
                    {p.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 关键步骤 */}
          <div style={{
            padding: '0 16px 16px',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: 'var(--adm-color-text)',
              opacity: 0.6, marginBottom: 8, letterSpacing: 1,
            }}>
              关键步骤
            </div>
            {scene.steps.map((s) => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 8,
                padding: '8px 0',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'var(--adm-color-primary)', color: '#fff',
                  fontSize: 11, fontWeight: 600, flexShrink: 0, marginTop: 1,
                }}>
                  {s.id}
                </span>
                <span style={{
                  fontSize: 13, color: 'var(--adm-color-text)', lineHeight: 1.5,
                }}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>

          {/* 技巧提醒 */}
          <div style={{
            padding: '12px 16px',
            background: 'var(--adm-color-fill-content)',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: 'var(--adm-color-text)',
              opacity: 0.6, marginBottom: 6,
            }}>
              记住
            </div>
            {scene.tips.map((tip, i) => (
              <div key={i} style={{
                fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.7,
                lineHeight: 1.6, padding: '4px 0',
              }}>
                • {tip}
              </div>
            ))}
          </div>
        </div>

        {/* 操作提示 */}
        <p style={{
          textAlign: 'center', fontSize: 13,
          color: 'var(--adm-color-text)', opacity: 0.5,
          marginTop: 16,
        }}>
          可截图保存，拍摄时快速查阅
        </p>
      </div>

      <div style={{
        padding: '16px', borderTop: '1px solid var(--adm-border-color)',
        display: 'flex', gap: 12,
      }}>
        <Button
          block
          fill="outline"
          size="large"
          onClick={() => navigate(`/scene/${sceneId}`)}
        >
          重新学习
        </Button>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => {
            Toast.show({ content: '已返回首页' })
            navigate('/')
          }}
        >
          返回首页
        </Button>
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User taps "返回首页" → 首页 */}
{/* → User taps "重新学习" → SCREEN 1: Scene Params Overview */}

// =============================================
// Exit States — Scene Shooting Guide
// =============================================
// ✅ Success: 完成参数了解 → 步骤指导 → 示例对比 → 技巧 → 保存参考卡
// ❌ Error: 场景数据加载失败 → 全页错误提示 + "返回首页" CTA
// ↩ Abandon: 任意步骤返回 → 进度保留，可随时重新进入
