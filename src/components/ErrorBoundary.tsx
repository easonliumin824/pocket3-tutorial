// =============================================
// ErrorBoundary — 全局错误边界
// Platform: H5 (Ant Design Mobile)
// =============================================
// 捕获子组件树中的 JS 错误，展示友好的降级 UI，
// 避免白屏。用户可点击"重新加载"恢复。
// =============================================

import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Button, Empty } from 'antd-mobile'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', padding: 24,
          background: 'var(--adm-color-background)',
        }}>
          <Empty
            description="页面出了点问题"
            style={{ marginBottom: 24 }}
          />
          <Button
            color="primary"
            size="large"
            onClick={this.handleReload}
            style={{ minWidth: 160, borderRadius: 12 }}
          >
            重新加载
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
