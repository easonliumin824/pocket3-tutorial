// =============================================
// FLOW: Pre-shoot Checklist (3 screens)
// Scenario: Camera & Photo (Tutorial App)
// Platform: H5 (Ant Design Mobile)
// =============================================

import { useState, useEffect } from 'react'
import {
  NavBar, Button, List, Collapse, ProgressBar, Toast,
  SafeArea, Empty, Skeleton,
} from 'antd-mobile'
import { useNavigate, useParams } from 'react-router-dom'
import { checkItems, checkGroups } from '../shared/mock-data'
import type { CheckItemStatus } from '../shared/types'

/* ================================================
   FLOW: Pre-shoot Checklist
   SCREEN 1 of 3: Checklist Overview
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  底部 Tab "清单" / 首页检查清单入口
   EXIT:   所有必选项已检查 → SCREEN 3: Completion Summary
   BRANCH: 点击某个清单项 → SCREEN 2: Item Detail
   ================================================ */
export function Screen1_ChecklistOverview() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [itemStatuses, setItemStatuses] = useState<Record<string, CheckItemStatus>>(
    Object.fromEntries(checkItems.map((item) => [item.id, item.status]))
  )

  // 模拟数据加载（后续替换为真实 API 调用）
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // 计算进度
  const requiredItems = checkItems.filter((item) => item.required)
  const checkedRequired = requiredItems.filter(
    (item) => itemStatuses[item.id] === 'checked'
  )
  const totalProgress = (checkedRequired.length / requiredItems.length) * 100
  const allRequiredDone = checkedRequired.length === requiredItems.length

  // 按分组整理清单项
  const groupedItems = checkGroups.map((group) => ({
    ...group,
    items: checkItems.filter((item) => item.group === group.id),
  }))

  const toggleItem = (itemId: string) => {
    setItemStatuses((prev) => {
      const current = prev[itemId]
      const next: CheckItemStatus = current === 'unchecked' ? 'checked' : 'unchecked'
      return { ...prev, [itemId]: next }
    })
  }

  const getStatusIcon = (status: CheckItemStatus) => {
    switch (status) {
      case 'checked': return '✓'
      case 'warning': return '⚠'
      default: return '○'
    }
  }

  const getStatusColor = (status: CheckItemStatus) => {
    switch (status) {
      case 'checked': return 'var(--adm-color-success)'
      case 'warning': return 'var(--adm-color-warning)'
      default: return 'var(--adm-color-text)'
    }
  }

  // STATE: loading — 骨架屏
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
        <SafeArea position="top" />
        <NavBar onBack={() => navigate('/')}>拍前检查清单</NavBar>
        <div style={{ flex: 1, padding: '16px' }}>
          <Skeleton animated style={{ width: '50%', height: 20, marginBottom: 8, borderRadius: 8 }} />
          <Skeleton animated style={{ width: '30%', height: 14, marginBottom: 20, borderRadius: 8 }} />
          <div style={{ padding: 16, borderRadius: 12, background: 'var(--adm-color-fill-content)', marginBottom: 16 }}>
            <Skeleton animated style={{ width: '100%', height: 8, borderRadius: 4 }} />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ padding: 16, borderRadius: 12, background: 'var(--adm-color-fill-content)', marginBottom: 12 }}>
              <Skeleton animated style={{ width: '40%', height: 16, marginBottom: 12, borderRadius: 6 }} />
              <Skeleton animated style={{ width: '90%', height: 14, marginBottom: 8, borderRadius: 6 }} />
              <Skeleton animated style={{ width: '70%', height: 14, borderRadius: 6 }} />
            </div>
          ))}
        </div>
        <SafeArea position="bottom" />
      </div>
    )
  }

  // STATE: default — 清单分组展示，可逐项勾选
  // STATE: completed — 所有必选项已勾选，CTA 可用
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate('/')}>拍前检查清单</NavBar>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {/* 进度总览 */}
        <div style={{
          padding: 16, borderRadius: 12, marginBottom: 16,
          background: allRequiredDone ? 'var(--color-success-bg)' : 'var(--adm-color-fill-content)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 8,
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-color-text)' }}>
              必检项目进度
            </span>
            <span style={{
              fontSize: 14, fontWeight: 600,
              color: allRequiredDone ? 'var(--adm-color-success)' : 'var(--adm-color-primary)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {checkedRequired.length} / {requiredItems.length}
            </span>
          </div>
          <ProgressBar
            percent={totalProgress}
            style={{
              '--fill-color': allRequiredDone ? 'var(--adm-color-success)' : undefined,
            } as React.CSSProperties}
          />
          {!allRequiredDone && (
            <p style={{
              fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.5,
              marginTop: 8, marginBottom: 0,
            }}>
              完成所有必检项（标 * ）后即可出发拍摄
            </p>
          )}
          {allRequiredDone && (
            <p style={{
              fontSize: 12, color: 'var(--adm-color-success)',
              marginTop: 8, marginBottom: 0, fontWeight: 500,
            }}>
              ✓ 所有必检项已完成，可以出发了！
            </p>
          )}
        </div>

        {/* 分组清单项 */}
        <Collapse defaultActiveKey={checkGroups.map((g) => g.id)}>
          {groupedItems.map((group) => (
            <Collapse.Panel
              key={group.id}
              title={
                <span style={{ fontSize: 15, fontWeight: 600 }}>
                  {group.icon} {group.name}
                  <span style={{
                    fontSize: 12, fontWeight: 400, opacity: 0.5, marginLeft: 8,
                  }}>
                    ({group.items.filter((i) => itemStatuses[i.id] === 'checked').length}/{group.items.length})
                  </span>
                </span>
              }
            >
              <List>
                {group.items.map((item) => (
                  <List.Item
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    prefix={
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 24, height: 24, borderRadius: '50%',
                        border: `2px solid ${getStatusColor(itemStatuses[item.id])}`,
                        color: getStatusColor(itemStatuses[item.id]),
                        fontSize: 14, fontWeight: 600,
                        background: itemStatuses[item.id] === 'checked' ? 'var(--color-success-bg)' : 'transparent',
                      }}>
                        {getStatusIcon(itemStatuses[item.id])}
                      </span>
                    }
                    extra={
                      <span
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/checklist/item/${item.id}`)
                        }}
                        style={{
                          fontSize: 13, color: 'var(--adm-color-primary)',
                          padding: '8px 12px',
                          minWidth: 44, minHeight: 44,
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        详情
                      </span>
                    }
                    description={
                      <span style={{
                        fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.5,
                      }}>
                        {item.required && (
                          <span style={{ color: 'var(--adm-color-danger)', marginRight: 4 }}>*</span>
                        )}
                        {item.description.slice(0, 30)}...
                      </span>
                    }
                    style={{
                      opacity: itemStatuses[item.id] === 'checked' ? 0.6 : 1,
                    }}
                  >
                    <span style={{
                      fontSize: 15,
                      textDecoration: itemStatuses[item.id] === 'checked' ? 'line-through' : 'none',
                      color: 'var(--adm-color-text)',
                    }}>
                      {item.label}
                    </span>
                  </List.Item>
                ))}
              </List>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid var(--adm-border-color)' }}>
        <Button
          block
          color="primary"
          size="large"
          disabled={!allRequiredDone}
          onClick={() => {
            Toast.show({ content: '检查完毕，出发拍摄！', icon: 'success' })
            navigate('/checklist/done')
          }}
        >
          {allRequiredDone ? '检查完毕，出发拍摄！' : `还有 ${requiredItems.length - checkedRequired.length} 项必检`}
        </Button>
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User taps item "详情" → SCREEN 2: Item Detail */}
{/* → All required items checked & user taps CTA → SCREEN 3: Completion Summary */}

/* ================================================
   FLOW: Pre-shoot Checklist
   SCREEN 2 of 3: Item Detail
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  Screen 1 清单项 "详情" tapped
   EXIT:   "返回清单" → SCREEN 1 (retain status)
   BRANCH: "标记完成" → 返回 Screen 1（该项已勾选）
   ================================================ */
export function Screen2_ItemDetail() {
  const navigate = useNavigate()
  const { itemId } = useParams<{ itemId: string }>()

  const item = checkItems.find((i) => i.id === itemId)

  // STATE: default — 详情展示
  // STATE: empty — 清单项不存在
  if (!item) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SafeArea position="top" />
        <NavBar onBack={() => navigate(-1)}>清单项详情</NavBar>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Empty description="未找到该清单项" />
        </div>
        <SafeArea position="bottom" />
      </div>
    )
  }

  const groupInfo = checkGroups.find((g) => g.id === item.group)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>清单项详情</NavBar>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {/* 项目标题区 */}
        <div style={{
          padding: 20, borderRadius: 12, marginBottom: 16,
          border: '1px solid var(--adm-border-color)',
          background: 'var(--adm-color-background)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
          }}>
            <span style={{ fontSize: 14, opacity: 0.5 }}>{groupInfo?.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.5 }}>
              {groupInfo?.name}
            </span>
            {item.required && (
              <span style={{
                fontSize: 11, padding: '2px 6px', borderRadius: 4,
                background: 'var(--color-danger-bg)', color: 'var(--adm-color-danger)',
                fontWeight: 500,
              }}>
                必检
              </span>
            )}
          </div>
          <h2 style={{
            fontSize: 20, fontWeight: 600, color: 'var(--adm-color-text)',
            marginBottom: 0,
          }}>
            {item.label}
          </h2>
        </div>

        {/* 详细说明 */}
        <div style={{
          padding: 16, borderRadius: 12, marginBottom: 16,
          background: 'var(--adm-color-fill-content)',
        }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: 'var(--adm-color-text)',
            opacity: 0.6, marginBottom: 8,
          }}>
            检查说明
          </div>
          <p style={{
            fontSize: 15, color: 'var(--adm-color-text)', lineHeight: 1.7,
            margin: 0,
          }}>
            {item.description}
          </p>
        </div>

        {/* 操作指引 */}
        <div style={{
          padding: 16, borderRadius: 12,
          border: '1px solid var(--adm-border-color)',
        }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: 'var(--adm-color-text)',
            opacity: 0.6, marginBottom: 12,
          }}>
            如何检查
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20, borderRadius: '50%',
                background: 'var(--adm-color-primary)', color: '#fff',
                fontSize: 11, fontWeight: 600, flexShrink: 0,
              }}>1</span>
              <span style={{ fontSize: 14, color: 'var(--adm-color-text)' }}>
                找到 Pocket 3 上对应的位置或设置
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20, borderRadius: '50%',
                background: 'var(--adm-color-primary)', color: '#fff',
                fontSize: 11, fontWeight: 600, flexShrink: 0,
              }}>2</span>
              <span style={{ fontSize: 14, color: 'var(--adm-color-text)' }}>
                按照说明确认状态是否正常
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20, borderRadius: '50%',
                background: 'var(--adm-color-primary)', color: '#fff',
                fontSize: 11, fontWeight: 600, flexShrink: 0,
              }}>3</span>
              <span style={{ fontSize: 14, color: 'var(--adm-color-text)' }}>
                确认无误后返回清单标记完成
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        padding: '16px', borderTop: '1px solid var(--adm-border-color)',
      }}>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => {
            Toast.show({ content: '已标记完成', icon: 'success' })
            navigate(-1)
          }}
        >
          确认已检查，返回清单
        </Button>
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}

{/* → User taps "确认已检查" → SCREEN 1: Checklist Overview (item marked) */}

/* ================================================
   FLOW: Pre-shoot Checklist
   SCREEN 3 of 3: Completion Summary
   PLATFORM: H5 (Ant Design Mobile)
   ------------------------------------------------
   ENTRY:  Screen 1 所有必检项完成，"出发拍摄" tapped
   EXIT:   "选择场景开始拍摄" → Flow 2 Screen 1 / 首页
   BRANCH: "返回清单" → Screen 1
   ================================================ */
export function Screen3_CompletionSummary() {
  const navigate = useNavigate()

  const summaryStats = [
    { label: '必检项', value: checkItems.filter((i) => i.required).length, unit: '项' },
    { label: '建议项', value: checkItems.filter((i) => !i.required).length, unit: '项' },
    { label: '分组', value: checkGroups.length, unit: '个' },
  ]

  // STATE: default — 完成状态展示
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      background: 'linear-gradient(180deg, var(--color-success-bg) 0%, var(--adm-color-background) 40%)',
    }}>
      <SafeArea position="top" />
      <NavBar onBack={() => navigate(-1)}>检查完毕</NavBar>

      <div style={{ flex: 1, padding: '24px 16px', overflowY: 'auto' }}>
        {/* 成功状态 */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--color-success-bg)', border: '2px solid var(--adm-color-success)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, marginBottom: 16,
          }}>
            ✓
          </div>
          <h2 style={{
            fontSize: 22, fontWeight: 600, color: 'var(--adm-color-text)',
            marginBottom: 8,
          }}>
            出发拍摄准备就绪！
          </h2>
          <p style={{
            fontSize: 15, color: 'var(--adm-color-text)', opacity: 0.6,
            lineHeight: 1.6,
          }}>
            所有必检项已完成，Pocket 3 已准备就绪
          </p>
        </div>

        {/* 统计卡片 */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
          marginBottom: 24,
        }}>
          {summaryStats.map((stat) => (
            <div key={stat.label} style={{
              padding: 16, borderRadius: 12, textAlign: 'center',
              background: 'var(--adm-color-fill-content)',
            }}>
              <div style={{
                fontSize: 24, fontWeight: 700, color: 'var(--adm-color-primary)',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.5,
                marginTop: 4,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 拍摄提醒 */}
        <div style={{
          padding: 16, borderRadius: 12, marginBottom: 16,
          background: 'var(--color-primary-bg)',
        }}>
          <div style={{
            fontSize: 14, fontWeight: 600, color: 'var(--adm-color-primary)',
            marginBottom: 8,
          }}>
            📸 拍摄小提醒
          </div>
          <div style={{
            fontSize: 13, color: 'var(--adm-color-text)', opacity: 0.7,
            lineHeight: 1.7,
          }}>
            <p style={{ margin: '0 0 4px' }}>• 到达拍摄地点后，先观察光线方向和环境</p>
            <p style={{ margin: '0 0 4px' }}>• 根据场景选择对应的参数预设（参考场景拍摄指导）</p>
            <p style={{ margin: '0 0 4px' }}>• 拍摄过程中如需查看参数，可随时回到清单页</p>
            <p style={{ margin: 0 }}>• 拍摄结束后记得关闭电源、收纳好云台臂</p>
          </div>
        </div>

        {/* 下一步建议 */}
        <div style={{
          padding: 16, borderRadius: 12,
          border: '1px solid var(--adm-border-color)',
        }}>
          <div style={{
            fontSize: 14, fontWeight: 600, color: 'var(--adm-color-text)',
            marginBottom: 12,
          }}>
            下一步
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div
              onClick={() => navigate('/')}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 12, borderRadius: 8,
                background: 'var(--adm-color-fill-content)',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 20 }}>🎬</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--adm-color-text)' }}>
                  选择场景开始拍摄
                </div>
                <div style={{ fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.5 }}>
                  查看场景推荐参数和分步指导
                </div>
              </div>
              <span style={{ fontSize: 16, opacity: 0.5 }}>›</span>
            </div>
            <div
              onClick={() => navigate('/')}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 12, borderRadius: 8,
                background: 'var(--adm-color-fill-content)',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 20 }}>💡</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--adm-color-text)' }}>
                  探索进阶技巧
                </div>
                <div style={{ fontSize: 12, color: 'var(--adm-color-text)', opacity: 0.5 }}>
                  ND 滤镜、延时摄影、全景拍摄等
                </div>
              </div>
              <span style={{ fontSize: 16, opacity: 0.5 }}>›</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid var(--adm-border-color)' }}>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => {
            Toast.show({ content: '开始拍摄吧！' })
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
{/* → User taps "选择场景" → Flow 2 Screen 1 */}
{/* → User taps "探索进阶技巧" → Flow 4 Screen 1 */}

// =============================================
// Exit States — Pre-shoot Checklist
// =============================================
// ✅ Success: 所有必检项完成 → 进入拍摄准备就绪页 → 选择场景出发拍摄
// ❌ Error: 清单项数据加载失败 → 全页错误提示 + "重试" CTA
// ↩ Abandon: 中途退出 → 已勾选状态不保留（下次重新检查）
