import { Component, type ReactNode } from 'react';

interface BoundaryProps {
  children: ReactNode;
}
interface BoundaryState {
  failed: boolean;
}

export function SceneFallback() {
  return (
    <div className="scene-fallback" role="status">
      <h2>A little room, in words.</h2>
      <p>
        The 3D view is unavailable. Explore all six objects and their stories
        using the controls below.
      </p>
      <button className="button" onClick={() => window.location.reload()}>
        Try loading again
      </button>
    </div>
  );
}
export class SceneBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };
  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children;
  }
}
