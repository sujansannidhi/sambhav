import { useEffect } from 'react'

/* Zero-dependency per-route <title> + <meta name="description"> manager.
 *
 * Sets document.title and the meta description whenever a route mounts or its
 * title/description change. This fixes titles for real users and browser
 * history, but NOT for crawlers that don't execute JS. That requires static
 * prerendering at build time (see README "Discoverability / prerendering").
 */
export default function useDocumentTitle(title, description) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
