import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Local error boundary for WebGL / three.js scenes.
 * Prevents a failed Canvas (no GPU, blocked WebGL, texture load failure)
 * from bubbling up to the router's global "Something went wrong" screen.
 */
export class WebGLBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.warn("[WebGLBoundary] 3D scene failed, showing fallback:", error);
  }

  render() {
    if (this.state.hasError) return <>{this.props.fallback}</>;
    return <>{this.props.children}</>;
  }
}

export default WebGLBoundary;
