/**
 * ErrorBoundary — Three-level implementation extracted from EmptyState.tsx.
 * Generic user-facing messages only — no stack traces in DOM (SEC-7).
 */
import { Component } from 'react'
import type { ReactNode } from 'react'
import { Icon } from '../primitives/Icon'
import { Button } from '../primitives/Button'
import { GlassCard } from '../primitives/GlassCard'

interface ErrorBoundaryState { hasError: boolean }

interface ErrorBoundaryProps {
  children: ReactNode
  level?: 'root' | 'page' | 'widget'
  fallback?: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info.componentStack)
    }
  }

  reset = () => this.setState({ hasError: false })

  render() {
    if (!this.state.hasError) return this.props.children
    if (this.props.fallback) return this.props.fallback

    const { level = 'page' } = this.props

    if (level === 'widget') {
      return (
        <div className="glass" style={{
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderColor: 'rgba(248,113,113,0.2)',
        }}>
          <Icon name="error" size={16} color="var(--red)" />
          <span className="txt-2" style={{ fontSize: 12, flex: 1 }}>Widget failed to load.</span>
          <button className="btn-g btn-sm" onClick={this.reset} style={{ flexShrink: 0 }}>Retry</button>
        </div>
      )
    }

    return (
      <div style={{
        minHeight: level === 'root' ? '100vh' : '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}>
        <GlassCard style={{ padding: 32, textAlign: 'center', maxWidth: 440 } as React.CSSProperties}>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
            <Icon name="error" size={40} color="var(--red)" />
          </div>
          <div className="h-sm" style={{ marginBottom: 8 }}>Something went wrong</div>
          <p className="txt-2" style={{ fontSize: 13.5, lineHeight: 1.6, marginBottom: 20 }}>
            {level === 'root'
              ? 'The application encountered an unexpected error. Please refresh the page.'
              : 'This page encountered an unexpected error.'}
          </p>
          <Button variant="ghost" onClick={this.reset}>Try Again</Button>
        </GlassCard>
      </div>
    )
  }
}
