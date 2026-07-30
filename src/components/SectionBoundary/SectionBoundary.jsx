import { Component } from 'react'

/* An error boundary scoped to a single section.
 *
 * React unmounts the entire tree when a render or effect throws anywhere
 * beneath it. That is how a failed WebGL context in LearningHero took the whole
 * homepage down to a blank cream screen. Wrapping a decorative section in this
 * means the worst case is a missing section, not a missing site.
 *
 * `fallback` should reserve roughly the space the real section occupies so the
 * rest of the page does not jump.
 */
export default class SectionBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    console.warn(`Section "${this.props.name || 'unnamed'}" failed to render.`, error, info)
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
