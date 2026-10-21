import { Component, type ReactNode } from "react"

type Props = { children: ReactNode; fallback?: ReactNode }

/** Shows a friendly message if loading CV data (or rendering) fails. */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error(error)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      this.props.fallback ?? (
        <div className="flex min-h-svh flex-col items-center justify-center gap-2 px-4 text-center">
          <p className="text-lg font-bold text-star-200">Houston, we have a problem.</p>
          <p className="text-sm text-muted-foreground">Something went wrong loading this page. Please try again later.</p>
        </div>
      )
    )
  }
}
