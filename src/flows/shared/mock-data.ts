// =============================================
// Mock Data — Pocket 3 新手拍摄教程
// =============================================

import type { SceneData, CheckItem, CheckGroupInfo, AdvancedTip } from './types'

// 三大拍摄场景
export const scenes: SceneData[] = [
  {
    id: 'outdoor-portrait',
    name: '户外人像',
    description: '阳光下的人像拍摄，注意曝光与肤色还原',
    thumbnail: '🧑',
    params: {
      resolution: '4K',
      frameRate: 30,
      fov: '广角（1x）',
      gimbalMode: 'follow',
      exposure: '+0.3',
      iso: '100-400',
      whiteBalance: '日光 5600K',
      shutterSpeed: '1/120',
    },
    steps: [
      { id: 1, title: '开机并解锁云台', description: '长按电源键 2 秒，等待云台自检完成（约 3 秒），确认云台臂完全展开并可自由转动。', paramHighlight: { label: '云台状态', value: '已解锁' } },
      { id: 2, title: '选择视频模式', description: '在主界面滑动切换到「视频」模式（默认即为视频模式）。', paramHighlight: { label: '模式', value: '视频' } },
      { id: 3, title: '设置分辨率与帧率', description: '点击顶部分辨率图标，选择 4K；再点击帧率图标，选择 30fps。4K/30fps 是人像拍摄的最佳平衡点——画质细腻且文件体积可控。', paramHighlight: { label: '分辨率', value: '4K / 30fps' } },
      { id: 4, title: '调整曝光补偿', description: '在预览界面点击屏幕中央出现曝光锁定框，上下滑动右侧曝光补偿条，设为 +0.3。人像拍摄略微过曝可让肤色更通透。', paramHighlight: { label: '曝光', value: '+0.3' } },
      { id: 5, title: '设置白平衡', description: '进入色彩设置（调色板图标），选择「日光」或手动设为 5600K。户外日光环境下固定白平衡可避免肤色忽冷忽暖。', paramHighlight: { label: '白平衡', value: '日光 5600K' } },
      { id: 6, title: '构图与拍摄', description: '将人物放在画面三分线位置（开启网格线辅助），保持 1-1.5 米距离。点击屏幕对焦人物面部，确认对焦框变绿后按下录制键。' },
    ],
    tips: [
      '避免正午顶光，选择上午 10 点前或下午 4 点后的柔和光线',
      '开启「美颜」模式（DJI Mimo App 内）可获得更讨喜的肤色',
      '使用云台跟随模式，人物移动时画面依然平稳',
    ],
  },
  {
    id: 'landscape',
    name: '风光',
    description: '壮阔风景拍摄，注重清晰度与色彩还原',
    thumbnail: '🏔️',
    params: {
      resolution: '4K',
      frameRate: 24,
      fov: '超广角（0.5x）',
      gimbalMode: 'lock',
      exposure: '0',
      iso: '100',
      whiteBalance: '日光 5600K',
      shutterSpeed: '1/60',
    },
    steps: [
      { id: 1, title: '切换至超广角', description: '点击镜头切换按钮，选择 0.5x 超广角模式。风光拍摄需要尽可能宽的视野来容纳壮阔场景。', paramHighlight: { label: '镜头', value: '0.5x 超广角' } },
      { id: 2, title: '设置电影级帧率', description: '选择 4K 分辨率 + 24fps。24fps 是电影标准帧率，风光画面会呈现自然的动态模糊感，更具电影质感。', paramHighlight: { label: '分辨率', value: '4K / 24fps' } },
      { id: 3, title: '锁定云台为 Lock 模式', description: '双击云台模式按钮切换至 Lock 模式。风光拍摄时通常固定机位拍摄，Lock 模式保持画面水平线绝对稳定。', paramHighlight: { label: '云台', value: 'Lock 锁定' } },
      { id: 4, title: '设置 ISO 为最低', description: '进入手动设置，将 ISO 固定为 100。最低 ISO 保证画面最纯净、噪点最少，风光拍摄对画质要求最高。', paramHighlight: { label: 'ISO', value: '100' } },
      { id: 5, title: '开启网格线构图', description: '在设置中开启「网格线」，利用三分法构图——将地平线放在上三分之一或下三分之一线上，避免居中切割画面。' },
      { id: 6, title: '录制与运镜', description: '按下录制键后，缓慢平移 Pocket 3（利用云台增稳）。运镜速度要慢且均匀，一段好的风光素材通常 5-10 秒即可。' },
    ],
    tips: [
      '黄金时段（日出后/日落前 1 小时）光线最美，色彩最丰富',
      '可加装 ND 滤镜实现慢快门效果（流水如丝、云层拉丝）',
      '使用全景模式拍摄超宽幅风景（内置自动拼接）',
    ],
  },
  {
    id: 'indoor-life',
    name: '室内生活',
    description: '室内日常记录，应对弱光环境',
    thumbnail: '🏠',
    params: {
      resolution: '2.7K',
      frameRate: 30,
      fov: '广角（1x）',
      gimbalMode: 'follow',
      exposure: '+0.7',
      iso: '100-1600',
      whiteBalance: '自动 AWB',
      shutterSpeed: '1/60',
    },
    steps: [
      { id: 1, title: '选择合适分辨率', description: '室内拍摄选择 2.7K / 30fps。室内光线有限，2.7K 比 4K 在高 ISO 下噪点更少，且文件更小便于分享。', paramHighlight: { label: '分辨率', value: '2.7K / 30fps' } },
      { id: 2, title: '提高曝光补偿', description: '室内环境光不足，将曝光补偿设为 +0.7 至 +1.0，让画面整体提亮。Pocket 3 会自动提高 ISO 来配合。', paramHighlight: { label: '曝光', value: '+0.7' } },
      { id: 3, title: '白平衡设为自动', description: '室内光源复杂（暖色灯 + 窗户自然光），设为 AWB 自动白平衡让相机自动适应混合光源。', paramHighlight: { label: '白平衡', value: 'AWB 自动' } },
      { id: 4, title: '云台设为跟随模式', description: '室内拍摄通常需要边走边拍，Follow 跟随模式让云台平滑跟随你的手部动作，保持画面稳定。', paramHighlight: { label: '云台', value: 'Follow 跟随' } },
      { id: 5, title: '开启智能跟随（可选）', description: '在屏幕上框选拍摄主体（人物/宠物），Pocket 3 会自动跟踪并保持主体在画面中央。适合拍摄好动的孩子或宠物。' },
      { id: 6, title: '手持拍摄技巧', description: '双手持机，手肘贴紧身体两侧形成稳定支撑。移动时膝盖微曲、脚步放轻，配合云台增稳获得最平稳画面。' },
    ],
    tips: [
      '尽量靠近窗户利用自然光，避免头顶灯光造成的绿色偏色',
      'ISO 超过 800 时画面会有明显噪点，尽量保持环境明亮',
      '竖拍模式（云台旋转 90°）适合拍摄室内竖屏短视频',
    ],
  },
]

// 检查清单项
export const checkItems: CheckItem[] = [
  // 电源组
  { id: 'battery-level', label: '电量充足', description: '电池电量 ≥ 80%，确保能完成本次拍摄。充电约 50 分钟可达 80%。', group: 'power', required: true, status: 'unchecked' },
  { id: 'battery-backup', label: '备用电池', description: '携带至少 1 块备用电池。Pocket 3 单块电池续航约 116 分钟（4K/30fps）。', group: 'power', required: false, status: 'unchecked' },
  { id: 'charging-cable', label: '充电线/充电宝', description: '携带 USB-C 充电线和充电宝，户外可随时补电。', group: 'power', required: false, status: 'unchecked' },

  // 存储组
  { id: 'sd-card-inserted', label: 'SD 卡已插入', description: '确认 microSD 卡已插入卡槽（位于电池仓内）。Pocket 3 使用 microSD / microSDHC / microSDXC。', group: 'storage', required: true, status: 'unchecked' },
  { id: 'sd-card-space', label: '存储空间充足', description: '剩余空间 ≥ 10GB。4K/30fps 约 170MB/分钟，10GB 可录制约 60 分钟。', group: 'storage', required: true, status: 'unchecked' },
  { id: 'sd-card-speed', label: 'SD 卡速度达标', description: '建议使用 UHS-I U3 / V30 及以上速度等级的卡。低速卡可能导致 4K 录制中断。', group: 'storage', required: false, status: 'unchecked' },

  // 云台组
  { id: 'gimbal-unlocked', label: '云台已解锁', description: '开机后确认云台臂完全展开，云台可自由转动。如显示「云台受限」请检查是否有保护罩未取下。', group: 'gimbal', required: true, status: 'unchecked' },
  { id: 'gimbal-calibrated', label: '云台已校准', description: '如提示「云台需要校准」，将 Pocket 3 放在平稳表面，按提示完成校准。', group: 'gimbal', required: false, status: 'unchecked' },

  // 画质组
  { id: 'resolution-set', label: '分辨率已设置', description: '根据拍摄场景设置好分辨率和帧率（参考场景拍摄指导）。', group: 'quality', required: true, status: 'unchecked' },
  { id: 'grid-enabled', label: '网格线已开启', description: '在设置 → 显示 → 网格线中开启，辅助构图。', group: 'quality', required: false, status: 'unchecked' },

  // 配件组
  { id: 'protective-case', label: '保护壳/收纳包', description: '携带保护壳或收纳包，外出拍摄时保护镜头和云台。', group: 'accessories', required: false, status: 'unchecked' },
  { id: 'tripod-mount', label: '三脚架/延长杆', description: '如需固定机位或自拍，携带三脚架或延长杆。Pocket 3 底部有标准 1/4" 螺口。', group: 'accessories', required: false, status: 'unchecked' },
]

// 检查分组信息
export const checkGroups: CheckGroupInfo[] = [
  { id: 'power', name: '电源', icon: '🔋' },
  { id: 'storage', name: '存储', icon: '💾' },
  { id: 'gimbal', name: '云台', icon: '🎯' },
  { id: 'quality', name: '画质', icon: '🎬' },
  { id: 'accessories', name: '配件', icon: '🎒' },
]

// 进阶技巧
export const advancedTips: AdvancedTip[] = [
  {
    id: 'nd-filter',
    title: 'ND 滤镜使用',
    category: 'nd-filter',
    difficulty: 'intermediate',
    description: 'ND（中性密度）滤镜减少进光量，让你在强光下也能使用慢快门，拍出运动模糊效果（如流水如丝、人群拖影）。',
    steps: [
      { id: 1, title: '安装 ND 滤镜', description: '将 ND 滤镜磁吸安装到 Pocket 3 镜头前方（创作者套装含 ND4/8/16/32 四片）。' },
      { id: 2, title: '选择合适档位', description: '晴天户外选 ND16 或 ND32；多云选 ND8；室内通常不需要 ND 滤镜。' },
      { id: 3, title: '切换到手动快门', description: '在专业模式下，将快门速度设为帧率的倒数 2 倍（如 30fps → 1/60s）。' },
      { id: 4, title: '录制并观察效果', description: '开始录制，画面中的运动物体（水流、行人）会呈现自然的模糊拖影效果。' },
    ],
    applicableScenes: ['landscape'],
  },
  {
    id: 'timelapse',
    title: '延时摄影',
    category: 'timelapse',
    difficulty: 'intermediate',
    description: '将数小时的变化压缩为几秒的视频——适合拍摄日出日落、城市车流、云朵变幻。',
    steps: [
      { id: 1, title: '进入延时模式', description: '在拍摄模式中选择「延时摄影」模式。' },
      { id: 2, title: '设置间隔时间', description: '日出日落：5-8 秒间隔；城市车流：2-3 秒间隔；云朵移动：10-15 秒间隔。' },
      { id: 3, title: '设置持续时长', description: '建议至少录制 30 分钟以上，最终视频约 10-15 秒。' },
      { id: 4, title: '固定机位', description: '将 Pocket 3 固定在三脚架上，确保拍摄期间不会移动。' },
      { id: 5, title: '开始录制', description: '按下录制键后离开，Pocket 3 会自动按设定间隔拍摄并最终合成视频。' },
    ],
    applicableScenes: ['landscape'],
  },
  {
    id: 'panorama',
    title: '全景拍摄',
    category: 'panorama',
    difficulty: 'beginner',
    description: 'Pocket 3 内置全景模式，自动旋转拍摄多张照片并拼接为超宽幅全景图，适合壮阔风景。',
    steps: [
      { id: 1, title: '进入全景模式', description: '在拍摄模式中选择「全景」模式。' },
      { id: 2, title: '选择全景类型', description: '球形（360° 全方位）/ 180°（半圆）/ 广角（超宽横幅）。风景推荐 180° 或广角。' },
      { id: 3, title: '固定机位并开始', description: '将 Pocket 3 固定在三脚架上（推荐），按下快门后相机会自动旋转拍摄。' },
      { id: 4, title: '等待拼接完成', description: '拍摄完成后 Pocket 3 自动拼接，约需 10-20 秒。拼接完成后可在回放中查看。' },
    ],
    applicableScenes: ['landscape'],
  },
  {
    id: 'slow-motion',
    title: '慢动作',
    category: 'slow-motion',
    difficulty: 'beginner',
    description: '用高帧率拍摄后慢放，捕捉水花飞溅、宠物奔跑等精彩瞬间。',
    steps: [
      { id: 1, title: '设置高帧率', description: '选择 1080p / 120fps 或 2.7K / 60fps。帧率越高慢放效果越明显。' },
      { id: 2, title: '确保光线充足', description: '高帧率需要更多光线，尽量在户外或明亮环境中拍摄。' },
      { id: 3, title: '拍摄运动主体', description: '对准运动中的主体（水流、跑步的人/宠物）按下录制。' },
      { id: 4, title: '回放查看效果', description: '录制完成后回放，Pocket 3 会自动以慢速播放高帧率素材。' },
    ],
    applicableScenes: ['outdoor-portrait', 'indoor-life'],
  },
  {
    id: 'selfie-vlog',
    title: '自拍 Vlog',
    category: 'selfie-vlog',
    difficulty: 'beginner',
    description: '翻转屏幕 + 云台增稳，轻松拍摄稳定的自拍 Vlog。',
    steps: [
      { id: 1, title: '翻转屏幕', description: '将 Pocket 3 的触摸屏旋转 180° 朝向自己，进入自拍模式。' },
      { id: 2, title: '切换至竖屏模式', description: '双击屏幕或旋转相机至竖屏位置，适合拍摄短视频平台（抖音/小红书）内容。' },
      { id: 3, title: '开启智能跟随', description: '在屏幕上框选自己的面部，云台会自动跟踪你的面部保持居中。' },
      { id: 4, title: '设置美颜（可选）', description: '在 DJI Mimo App 中可开启美颜效果，调整磨皮/美白/瘦脸程度。' },
      { id: 5, title: '开始录制', description: '按下录制键，保持相机距离面部约 30-50cm，正常说话即可。' },
    ],
    applicableScenes: ['outdoor-portrait', 'indoor-life'],
  },
]
