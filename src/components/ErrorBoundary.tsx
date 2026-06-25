import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl px-8 py-8 max-w-sm text-center">
              <p className="text-[15px] font-semibold text-gray-800 mb-2">
                Something went wrong
              </p>
              <p className="text-[13px] text-gray-500 mb-4">
                {this.state.error.message}
              </p>
              <button
                type="button"
                onClick={() => this.setState({ error: null })}
                className="px-5 py-2 rounded-full bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700"
              >
                Dismiss
              </button>
            </div>
          </div>
        )
      )
    }
    return this.props.children
  }
}
