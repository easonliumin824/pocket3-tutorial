// =============================================
// FLOW: Advanced Tips Exploration (3 screens)
// Scenario: Camera & Photo (Tutorial App)
// Platform: H5 (Ant Design Mobile)
// =============================================

import { useState, useEffect } from 'react'
import {
  NavBar, Button, List, Tag, Steps, Toast,
  SafeArea, Empty, Collapse, Skeleton,
} from 'antd-mobile'
import { useNavigate, useParams } from 'react-router-dom'
import { advancedTips, scenes } from '../shared/mock-data'
import type { AdvancedTip } from '../shared/types'

/* ================================================
   FLOW: Advanced Tips Exploration
   SCREEN 1 of 3: Tips Category List
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  底部 Tab "进阶" / 首页进阶入口 / 检查完成页
   EXIT:   选择某个技巧 → SCREEN 2: Tip Detail
   BRANCH: "返回" → 首页
   ================================================ */
export function Screen1_TipsList() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  // 模拟数据加载（后续替换为真实 API 调用）
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // 难度标签映射
  const difficultyMap: Record<string, { label: string; color: string }> = {
    beginner: { label: '入门', color: 'var(--adm-color-success)' },
    intermediate: { label: '进阶', color: 'var(--adm-color-warning)' },
    advanced: { label: '高级', color: 'var(--adm-color-danger)' },
  }

  // 过滤技巧列表
  const filteredTips = filter === 'all'
    ? advancedTips
    : advancedTips.filter((tip) => tip.difficulty === filter)

  // 获取技巧适用的场景名称
  const getApplicableSceneNames = (tip: AdvancedTip) =>
    tip.applicableScenes
      .map((sceneId) => scenes.find((s) => s.id === sceneId)?.name)
      .filter(Boolean)
      .join('、')

  // STATE: loading — 骨架屏
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
        <SafeArea position="top" />
        <NavBar>进阶技巧</NavBar>
        <div style={{ flex: 1, padding: '16px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} animated style={{ width: 64, height: 32, borderRadius: 16 }} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ padding: 16, borderRadius: 12, background: 'var(--adm-color-fill-content)' }}>
                <Skeleton animated style={{ width: '60%', height: 18, marginBottom: 8, borderRadius: 6 }} />
                <Skeleton animated style={{ width: '90%', height: 14, marginBottom: 6, borderRadius: 6 }} />
                <Skeleton animated style={{ width: '40%', height: 14, borderRadius: 6 }} />
              </div>
            ))}
          </div>
        </div>
        <SafeArea position="bottom" />
      </div>
    )
  }

  // STATE: default — 技巧列表展示
  // STATE: filtered — 按难度筛选后展示
  // STATE: empty — 无匹配技巧
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar>进阶技巧</NavBar>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {/* 筛选器 */}
        <div style={{
          display: 'flex', gap: 8, marginBottom: 16,
          overflowX: 'auto', paddingBottom: 4,
        }}>
          {[
            { value: 'all', label: '全部' },
            { value: 'beginner', label: '入门' },
            { value: 'intermediate', label: '进阶' },
          ].map((opt) => (
            <div
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              style={{
                padding: '10px 16px', borderRadius: 20,
                fontSize: 14, fontWeight: 500,
                background: filter === opt.value
                  ? 'var(--adm-color-primary)'
                  : 'var(--adm-color-fill-content)',
                color: filter === opt.value
                  ? '#fff'
                  : 'var(--adm-color-text)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>

        {/* 技巧列表 */}
        {filteredTips.length === 0 ? (
          <div style={{ padding: '40px 0' }}>
            <Empty description="暂无该难度的技巧" />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredTips.map((tip) => {
              const diff = difficultyMap[tip.difficulty]
              return (
                <div
                  key={tip.id}
                  onClick={() => navigate(`/tips/${tip.id}`)}
                  style={{
                    padding: 16, borderRadius: 12,
                    border: '1px solid var(--adm-border-color)',
                    background: 'var(--adm-color-background)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {/* 标题行 */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 8,
                  }}>
                    <h3 style={{
                      fontSize: 16, fontWeight: 600, color: 'var(--adm-color-text)',
                      margin: 0,
                    }}>
                      {tip.title}
                    </h3>
                    <Tag
                      color={diff.color as string}
                      fill="outline"
                      style={{
                        '--border-color': diff.color,
                        '--text-color': diff.color,
                        '--background-color': 'transparent',
                        '--border-radius': '4px',
                      } as React.CSSProperties}
                    >
                      {diff.label}
                    </Tag>
                  </div>

                  {/* 描述 */}
                  <p style={{
                    fontSize: 14, color: 'var(--adm-color-text)', opacity: 0.7,
                    lineHeight: 1.6, margin: '0 0 12px',
                  }}>
                    {tip.description}
                  </p>

                  {/* 底部信息 */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{
                      fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.5,
                    }}>
                      {tip.steps.length} 个步骤
                    </span>
                    <span style={{
                      fontSize: 12, color: 'var(--adm-color-primary)',
                    }}>
                      适用：{getApplicableSceneNames(tip)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User taps a tip card → SCREEN 2: Tip Detail */}

/* ================================================
   FLOW: Advanced Tips Exploration
   SCREEN 2 of 3: Tip Detail
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  Screen 1 技巧卡片 tapped
   EXIT:   "标记已学会" → SCREEN 3: Completion
   BRANCH: "返回" → Screen 1 (retain progress)
   ================================================ */
export function Screen2_TipDetail() {
  const navigate = useNavigate()
  const { tipId } = useParams<{ tipId: string }>()
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const tip = advancedTips.find((t) => t.id === tipId)

  // STATE: default — 技巧详情 + 步骤引导
  // STATE: empty — 技巧不存在
  // STATE: all-completed — 所有步骤已标记完成
  if (!tip) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SafeArea position="top" />
        <NavBar onBack={() => navigate(-1)}>技巧详情</NavBar>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Empty description="未找到该技巧" />
        </div>
        <SafeArea position="bottom" />
      </div>
    )
  }

  const allStepsDone = completedSteps.size === tip.steps.length

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(stepId)) {
        next.delete(stepId)
      } else {
        next.add(stepId)
      }
      return next
    })
  }

  // 适用场景名称
  const applicableSceneNames = tip.applicableScenes
    .map((sceneId) => scenes.find((s) => s.id === sceneId)?.name)
    .filter(Boolean)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>{tip.title}</NavBar>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {/* 技巧概览 */}
        <div style={{
          padding: 16, borderRadius: 12, marginBottom: 16,
          background: 'var(--adm-color-fill-content)',
        }}>
          <p style={{
            fontSize: 15, color: 'var(--adm-color-text)', lineHeight: 1.7,
            margin: 0,
          }}>
            {tip.description}
          </p>
          <div style={{
            display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap',
          }}>
            {applicableSceneNames.map((name) => (
              <Tag
                key={name}
                fill="outline"
                style={{
                  '--border-color': 'var(--adm-color-primary)',
                  '--text-color': 'var(--adm-color-primary)',
                  '--background-color': 'transparent',
                  '--border-radius': '4px',
                } as React.CSSProperties}
              >
                {name}
              </Tag>
            ))}
          </div>
        </div>

        {/* 步骤列表 */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 12,
          }}>
            <span style={{
              fontSize: 15, fontWeight: 600, color: 'var(--adm-color-text)',
            }}>
              操作步骤
            </span>
            <span style={{
              fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.5,
              fontVariantNumeric: 'tabular-nums',
            }}>
              {completedSteps.size} / {tip.steps.length}
            </span>
          </div>

          <Steps direction="vertical" current={completedSteps.size}>
            {tip.steps.map((step) => {
              const isDone = completedSteps.has(step.id)
              return (
                <Steps.Step
                  key={step.id}
                  title={
                    <div
                      onClick={() => toggleStep(step.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        cursor: 'pointer', padding: '4px 0',
                      }}
                    >
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 22, height: 22, borderRadius: '50%',
                        background: isDone ? 'var(--adm-color-success)' : 'var(--adm-color-fill-content)',
                        color: isDone ? '#fff' : 'var(--adm-color-text)',
                        fontSize: 12, fontWeight: 600,
                        transition: 'all 0.2s',
                      }}>
                        {isDone ? '✓' : step.id}
                      </span>
                      <span style={{
                        fontSize: 15, fontWeight: 500,
                        color: isDone ? 'var(--adm-color-success)' : 'var(--adm-color-text)',
                        textDecoration: isDone ? 'line-through' : 'none',
                        opacity: isDone ? 0.7 : 1,
                      }}>
                        {step.title}
                      </span>
                    </div>
                  }
                  description={
                    <div style={{ marginTop: 4, paddingLeft: 30 }}>
                      <p style={{
                        fontSize: 14, color: 'var(--adm-color-text)', opacity: 0.7,
                        lineHeight: 1.6, margin: '0 0 8px',
                      }}>
                        {step.description}
                      </p>
                    </div>
                  }
                  status={isDone ? 'finish' : 'wait'}
                />
              )
            })}
          </Steps>
        </div>

        {/* 完成状态提示 */}
        {allStepsDone && (
          <div style={{
            padding: 12, borderRadius: 8,
            background: 'var(--color-success-bg)', textAlign: 'center',
            fontSize: 14, color: 'var(--adm-color-success)',
            fontWeight: 500,
          }}>
            ✓ 所有步骤已学会，可以实际操练了！
          </div>
        )}

        {/* 相关技巧推荐 */}
        <Collapse defaultActiveKey={[]}>
          <Collapse.Panel key="related" title="相关技巧推荐">
            <List>
              {advancedTips
                .filter((t) => t.id !== tip.id)
                .slice(0, 3)
                .map((relatedTip) => (
                  <List.Item
                    key={relatedTip.id}
                    onClick={() => {
                      navigate(`/tips/${relatedTip.id}`)
                    }}
                    description={`${relatedTip.steps.length} 个步骤`}
                  >
                    {relatedTip.title}
                  </List.Item>
                ))}
            </List>
          </Collapse.Panel>
        </Collapse>
      </div>

      <div style={{
        padding: '16px', borderTop: '1px solid var(--adm-border-color)',
      }}>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => navigate('/tips/done')}
        >
          {allStepsDone ? '标记已学会 →' : '先记住，稍后练习'}
        </Button>
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User taps "标记已学会" / "先记住" → SCREEN 3: Completion */}
{/* → User taps back → SCREEN 1: Tips List */}

/* ================================================
   FLOW: Advanced Tips Exploration
   SCREEN 3 of 3: Learning Completion
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  Screen 2 "标记已学会" / "先记住" tapped
   EXIT:   "返回首页" → 首页 / "继续学习" → Screen 1
   BRANCH: "返回" → Screen 2
   ================================================ */
export function Screen3_LearningCompletion() {
  const navigate = useNavigate()

  // 统计学习数据
  const totalTips = advancedTips.length
  const beginnerTips = advancedTips.filter((t) => t.difficulty === 'beginner').length
  const intermediateTips = advancedTips.filter((t) => t.difficulty === 'intermediate').length

  // 学习建议
  const learningSuggestions = [
    {
      icon: '🎯',
      title: '实地练习',
      description: '下次拍摄时尝试使用刚学会的技巧，实践出真知',
    },
    {
      icon: '📝',
      title: '记录心得',
      description: '拍摄后回看素材，记录哪些参数设置效果好',
    },
    {
      icon: '🔄',
      title: '反复迭代',
      description: '同一场景用不同参数多拍几次，对比找到最佳效果',
    },
  ]

  // STATE: default — 完成状态 + 建议
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      background: 'linear-gradient(180deg, var(--color-primary-bg) 0%, var(--adm-color-background) 40%)',
    }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>学习进度</NavBar>

      <div style={{ flex: 1, padding: '24px 16px', overflowY: 'auto' }}>
        {/* 完成状态 */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--color-primary-bg)', border: '2px solid var(--adm-color-primary)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, marginBottom: 16,
          }}>
            🎓
          </div>
          <h2 style={{
            fontSize: 22, fontWeight: 600, color: 'var(--adm-color-text)',
            marginBottom: 8,
          }}>
            持续进步中！
          </h2>
          <p style={{
            fontSize: 15, color: 'var(--adm-color-text)', opacity: 0.6,
            lineHeight: 1.6,
          }}>
            掌握更多技巧，拍摄水平稳步提升
          </p>
        </div>

        {/* 技巧统计 */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
          marginBottom: 24,
        }}>
          <div style={{
            padding: 16, borderRadius: 12, textAlign: 'center',
            background: 'var(--adm-color-fill-content)',
          }}>
            <div style={{
              fontSize: 24, fontWeight: 700, color: 'var(--adm-color-primary)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {totalTips}
            </div>
            <div style={{
              fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.5, marginTop: 4,
            }}>
              全部技巧
            </div>
          </div>
          <div style={{
            padding: 16, borderRadius: 12, textAlign: 'center',
            background: 'var(--color-success-bg)',
          }}>
            <div style={{
              fontSize: 24, fontWeight: 700, color: 'var(--adm-color-success)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {beginnerTips}
            </div>
            <div style={{
              fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.5, marginTop: 4,
            }}>
              入门技巧
            </div>
          </div>
          <div style={{
            padding: 16, borderRadius: 12, textAlign: 'center',
            background: 'var(--color-warning-bg)',
          }}>
            <div style={{
              fontSize: 24, fontWeight: 700, color: 'var(--color-warning-text)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {intermediateTips}
            </div>
            <div style={{
              fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.5, marginTop: 4,
            }}>
              进阶技巧
            </div>
          </div>
        </div>

        {/* 学习建议 */}
        <div style={{
          padding: 16, borderRadius: 12, marginBottom: 16,
          border: '1px solid var(--adm-border-color)',
        }}>
          <div style={{
            fontSize: 15, fontWeight: 600, color: 'var(--adm-color-text)',
            marginBottom: 16,
          }}>
            提升建议
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {learningSuggestions.map((suggestion) => (
              <div key={suggestion.title} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}>
                <span style={{
                  fontSize: 20, flexShrink: 0, marginTop: 2,
                }}>
                  {suggestion.icon}
                </span>
                <div>
                  <div style={{
                    fontSize: 14, fontWeight: 500, color: 'var(--adm-color-text)',
                    marginBottom: 4,
                  }}>
                    {suggestion.title}
                  </div>
                  <div style={{
                    fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.6,
                    lineHeight: 1.5,
                  }}>
                    {suggestion.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 鼓励语 */}
        <div style={{
          padding: 16, borderRadius: 12, textAlign: 'center',
          background: 'var(--adm-color-fill-content)',
        }}>
          <p style={{
            fontSize: 14, color: 'var(--adm-color-text)', opacity: 0.7,
            lineHeight: 1.7, margin: 0, fontStyle: 'italic',
          }}>
            "好的照片不是靠设备，而是靠对光线的理解和不断的练习。"
          </p>
          <p style={{
            fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.55,
            marginTop: 8, marginBottom: 0,
          }}>
            — Pocket 3 新手教程
          </p>
        </div>
      </div>

      <div style={{
        padding: '16px', borderTop: '1px solid var(--adm-border-color)',
        display: 'flex', gap: 12,
      }}>
        <Button
          block
          fill="outline"
          size="large"
          onClick={() => navigate('/tips')}
        >
          继续学习
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
{/* → User taps "继续学习" → SCREEN 1: Tips List */}

// =============================================
// Exit States — Advanced Tips Exploration
// =============================================
// ✅ Success: 浏览技巧 → 学习步骤 → 标记已学会 → 返回首页继续拍摄
// ❌ Error: 技巧数据加载失败 → 全页错误提示 + "重试" CTA
// ↩ Abandon: 中途退出 → 学习进度不保留（技巧可随时重新查看）
