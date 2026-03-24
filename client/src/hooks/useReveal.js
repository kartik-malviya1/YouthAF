import { useEffect } from 'react'

/**
 * useReveal
 * Observes elements with the `.reveal` class and adds `.visible` when they
 * enter the viewport. Automatically cleans up the observer on unmount.
 *
 * Usage: import useReveal from '../hooks/useReveal' and call useReveal() inside a component.
 */
export default function useReveal(options = { threshold: 0.1 }) {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal')
    if (!items || items.length === 0) return undefined

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      })
    }, options)

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [JSON.stringify(options)])
}
