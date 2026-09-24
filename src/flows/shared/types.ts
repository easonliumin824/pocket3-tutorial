// =============================================
// Shared Types — Pocket 3 新手拍摄教程
// =============================================

// 拍摄场景
export type SceneType = 'outdoor-portrait' | 'landscape' | 'indoor-life'

// 机型
export type DeviceModel = 'pocket-3' | 'pocket-3-creator'

// 检查清单项状态
export type CheckItemStatus = 'unchecked' | 'checked' | 'warning'

// 云台模式
export type GimbalMode = 'follow' | 'lock' | 'fpv' | 'portrait'

// 分辨率
export type Resolution = '4K' | '2.7K' | '1080p'

// 帧率
export type FrameRate = 24 | 25 | 30 | 50 | 60 | 100 | 120

// 场景参数推荐
export interface SceneParams {
  resolution: Resolution
  frameRate: FrameRate
  fov: string
  gimbalMode: GimbalMode
  exposure: string
  iso: string
  whiteBalance: string
  shutterSpeed: string
}

// 拍摄场景数据
export interface SceneData {
  id: SceneType
  name: string
  description: string
  thumbnail: string
  params: SceneParams
  steps: StepData[]
  tips: string[]
}

// 操作步骤
export interface StepData {
  id: number
  title: string
  description: string
  paramHighlight?: {
    label: string
    value: string
  }
}

// 检查清单项
export interface CheckItem {
  id: string
  label: string
  description: string
  group: CheckGroup
  required: boolean
  status: CheckItemStatus
}

// 检查分组
export type CheckGroup = 'power' | 'storage' | 'gimbal' | 'quality' | 'accessories'

// 检查分组信息
export interface CheckGroupInfo {
  id: CheckGroup
  name: string
  icon: string
}

// 进阶技巧
export interface AdvancedTip {
  id: string
  title: string
  category: TipCategory
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  steps: StepData[]
  applicableScenes: SceneType[]
}

// 技巧分类
export type TipCategory = 'nd-filter' | 'timelapse' | 'panorama' | 'slow-motion' | 'selfie-vlog'
